<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { pressMorph } from '#lib/press.svelte.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { FabProps } from './types.ts'

	let {
		variant = 'primary-container',
		size = 's',
		shape = 'round',
		lowered = false,
		disabled = false,
		icon,
		label,
		element = $bindable(),
		...attributes
	}: FabProps = $props()

	const uid = $props.id()

	const isLink = $derived(attributes.href != null && !disabled)
	const tooltipId = $derived(label && !disabled ? uid : undefined)

	const morph = pressMorph()
	morph.supersededBy(() => shape)

	const handlePress = () => {
		if (disabled) return
		morph.press()
	}

	const classes = $derived([
		'np-fab',
		'np-focus-ring',
		`np-fab-${variant}`,
		size,
		shape,
		lowered && 'np-fab-lowered',
		morph.pressed && 'pressed',
		attributes.class,
	])
</script>

{#snippet content()}
	{#if !disabled}
		<Ripple forElement={element} />
	{/if}
	{#if icon}
		<span class="np-fab-icon">{@render icon()}</span>
	{/if}
{/snippet}

{#if isLink}
	<a
		{...attributes}
		onclick={(event) => {
			handlePress()
			attributes.onclick?.(event)
		}}
		bind:this={element}
		aria-describedby={tooltipId ?? attributes['aria-describedby']}
		interestfor={tooltipId ?? attributes['interestfor']}
		aria-label={label || attributes['aria-label']}
		class={classes}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		onclick={(event) => {
			handlePress()
			attributes.onclick?.(event)
		}}
		bind:this={element}
		aria-describedby={tooltipId ?? attributes['aria-describedby']}
		interestfor={tooltipId ?? attributes['interestfor']}
		aria-label={label || attributes['aria-label']}
		type={(attributes['type'] as HTMLButtonAttributes['type']) ?? 'button'}
		{disabled}
		class={classes}
	>
		{@render content()}
	</button>
{/if}

{#if tooltipId}
	<Tooltip id={tooltipId}>{label}</Tooltip>
{/if}

<style>
	.np-fab {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-width: 0;
		cursor: pointer;
		font: inherit;
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
		box-shadow: var(--np-fab-elevation, var(--np-elevation-3));
		background-color: var(--np-fab-container-color, var(--_container-color));
		color: var(--np-fab-icon-color, var(--_icon-color));
		--np-ripple-hover-color: var(--np-fab-icon-color, var(--_icon-color));
		--np-ripple-pressed-color: var(--np-fab-icon-color, var(--_icon-color));
	}

	/*
	 * `round` is fully rounded and `square` is the smaller radius, the same way Button reads.
	 * The FAB box is always square, so `50%` renders identically to `--np-shape-corner-full`
	 * (9999px) at rest. It matters for the pressed transition below: animating `border-radius`
	 * from a huge fixed value spends nearly the whole transition on radii that still render as
	 * fully round, so the morph never becomes visible during a normal, brief click.
	 */
	.round {
		border-radius: var(--np-fab-shape, 50%);
	}
	.square {
		border-radius: var(--np-fab-shape, var(--_square-radius));
	}

	/*
	 * A press morphs the corner towards the other shape. `:active` alone drops the moment the
	 * pointer lifts, which on a normal click is long before the morph has played, so the short
	 * `pressed` class holds the shape until the whole round trip is visible, the way Button does
	 * it. Both are gated on the motion preference, since without the transition below this is
	 * only an instant snap.
	 */
	@media (prefers-reduced-motion: no-preference) {
		.round:not(:disabled):is(:active, .pressed) {
			border-radius: var(--np-fab-pressed-shape, var(--_square-radius));
		}
		.square:not(:disabled):is(:active, .pressed) {
			border-radius: var(--np-fab-pressed-shape, 50%);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-fab {
			transition:
				border-radius var(--np-motion-expressive-default-spatial),
				box-shadow var(--np-motion-expressive-fast-effects),
				background-color var(--np-motion-expressive-fast-effects);
		}
	}

	/*
	 * M3's three recommended sizes, matching the extended FAB's. The 40px FAB it used to also
	 * define is gone: M3 Expressive no longer recommends it. Each square radius is the shape token
	 * that goes with the size, large, large-increased and extra-large.
	 */
	.s {
		width: 3.5rem;
		height: 3.5rem;
		--_square-radius: 1rem;
		--np-icon-size: 1.5rem;
	}
	.m {
		width: 5rem;
		height: 5rem;
		--_square-radius: 1.25rem;
		--np-icon-size: 1.75rem;
	}
	.l {
		width: 6rem;
		height: 6rem;
		--_square-radius: 1.75rem;
		--np-icon-size: 2.25rem;
	}

	/*
	 * M3's colour styles, named after the tokens they map to. The tone styles are the stronger
	 * pair, the container styles the softer one. The surface style M3 Expressive dropped is gone.
	 */
	.np-fab-primary {
		--_container-color: var(--np-color-primary);
		--_icon-color: var(--np-color-on-primary);
	}
	.np-fab-secondary {
		--_container-color: var(--np-color-secondary);
		--_icon-color: var(--np-color-on-secondary);
	}
	.np-fab-tertiary {
		--_container-color: var(--np-color-tertiary);
		--_icon-color: var(--np-color-on-tertiary);
	}
	.np-fab-primary-container {
		--_container-color: var(--np-color-primary-container);
		--_icon-color: var(--np-color-on-primary-container);
	}
	.np-fab-secondary-container {
		--_container-color: var(--np-color-secondary-container);
		--_icon-color: var(--np-color-on-secondary-container);
	}
	.np-fab-tertiary-container {
		--_container-color: var(--np-color-tertiary-container);
		--_icon-color: var(--np-color-on-tertiary-container);
	}

	.np-fab-lowered {
		box-shadow: var(--np-fab-elevation, var(--np-elevation-1));
	}

	@media (hover: hover) {
		.np-fab:not(:disabled):hover {
			box-shadow: var(--np-fab-elevation, var(--np-elevation-3));
			background-color: color-mix(
				in srgb,
				var(--np-fab-icon-color, var(--_icon-color)) 8%,
				var(--np-fab-container-color, var(--_container-color))
			);
		}
		.np-fab-lowered:not(:disabled):hover {
			box-shadow: var(--np-fab-elevation, var(--np-elevation-2));
		}
	}

	.np-fab:disabled {
		cursor: default;
		box-shadow: none;
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	/*
	 * The icon is never a hit target, matching `Button`'s. Otherwise swapping it out from under
	 * the pointer, which `FabMenu`'s trigger does when it opens, moves the pointer to a different
	 * element; the browser hands the button fresh interest on the way and reopens its tooltip.
	 */
	.np-fab-icon {
		display: flex;
		fill: currentColor;
		pointer-events: none;
	}
</style>
