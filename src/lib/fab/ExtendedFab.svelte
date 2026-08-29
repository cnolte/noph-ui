<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { pressMorph } from '#lib/press.svelte.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { ExtendedFabProps } from './types.ts'

	let {
		variant = 'primary-container',
		size = 's',
		shape = 'round',
		lowered = false,
		disabled = false,
		collapsed = false,
		icon,
		label,
		element = $bindable(),
		...attributes
	}: ExtendedFabProps = $props()

	const uid = $props.id()

	const isLink = $derived(attributes.href != null && !disabled)
	// Collapsed, the text is hidden, so the label has to be announced some other way.
	const tooltipId = $derived(collapsed && label && !disabled ? uid : undefined)

	const morph = pressMorph()
	morph.supersededBy(() => shape)

	const handlePress = () => {
		if (disabled) return
		morph.press()
	}

	const classes = $derived([
		'np-extended-fab',
		'np-focus-ring',
		`np-fab-${variant}`,
		size,
		shape,
		lowered && 'np-fab-lowered',
		collapsed && 'np-fab-collapsed',
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
	{#if label}
		<span class="np-fab-label">{label}</span>
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
		aria-label={collapsed ? label || attributes['aria-label'] : attributes['aria-label']}
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
		aria-label={collapsed ? label || attributes['aria-label'] : attributes['aria-label']}
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
	/*
	 * `interpolate-size` lets the intrinsic width animate, so collapsing is a plain CSS
	 * transition on `width` rather than a measured pixel value.
	 */
	.np-extended-fab {
		interpolate-size: allow-keywords;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		border-width: 0;
		cursor: pointer;
		font: inherit;
		font-weight: 500;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		-webkit-tap-highlight-color: transparent;
		box-shadow: var(--np-fab-elevation, var(--np-elevation-3));
		background-color: var(--np-fab-container-color, var(--_container-color));
		color: var(--np-fab-icon-color, var(--_icon-color));
		--np-ripple-hover-color: var(--np-fab-icon-color, var(--_icon-color));
		--np-ripple-pressed-color: var(--np-fab-icon-color, var(--_icon-color));
		width: auto;
		min-width: var(--_height);
		height: var(--_height);
		gap: var(--_gap);
		padding-inline: var(--_padding);
	}

	/*
	 * `calc(var(--_height) / 2)` renders identically to `--np-shape-corner-full` (9999px) at
	 * rest, since border-radius clamps an oversized radius down to exactly half the height
	 * anyway. It matters for the pressed transition: animating from a huge fixed value spends
	 * nearly the whole transition on radii that still render as fully round, so the morph never
	 * becomes visible during a normal, brief click. `50%` isn't a substitute here, since the box
	 * isn't square, it would resolve to an elliptical corner rather than a round pill end.
	 */
	.round {
		border-radius: var(--np-fab-shape, calc(var(--_height) / 2));
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
			border-radius: var(--np-fab-pressed-shape, calc(var(--_height) / 2));
		}
	}

	/* The same three sizes as `Fab`, which is what M3 Expressive aligned the two on. */
	.s {
		--_height: 3.5rem;
		--_square-radius: 1rem;
		--_gap: 0.75rem;
		--_padding: 1rem;
		font-size: 1rem;
		--np-icon-size: 1.5rem;
	}
	.m {
		--_height: 5rem;
		--_square-radius: 1.25rem;
		--_gap: 1rem;
		--_padding: 1.5rem;
		font-size: 1.375rem;
		--np-icon-size: 1.75rem;
	}
	.l {
		--_height: 6rem;
		--_square-radius: 1.75rem;
		--_gap: 1rem;
		--_padding: 2rem;
		font-size: 1.5rem;
		--np-icon-size: 2.25rem;
	}

	/* Collapsed is the icon-only FAB: square box, no text, no padding around the label. */
	.np-fab-collapsed {
		width: var(--_height);
		padding-inline: 0;
		justify-content: center;
		gap: 0;
	}
	.np-fab-collapsed .np-fab-label {
		opacity: 0;
		max-width: 0;
	}

	.np-fab-label {
		max-width: 20rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-extended-fab {
			transition:
				width var(--np-motion-expressive-default-spatial),
				gap var(--np-motion-expressive-default-spatial),
				padding-inline var(--np-motion-expressive-default-spatial),
				border-radius var(--np-motion-expressive-default-spatial),
				box-shadow var(--np-motion-expressive-fast-effects),
				background-color var(--np-motion-expressive-fast-effects);
		}
		.np-fab-label {
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				max-width var(--np-motion-expressive-default-spatial);
		}
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
		.np-extended-fab:not(:disabled):hover {
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

	.np-extended-fab:disabled {
		cursor: default;
		box-shadow: none;
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-fab-icon {
		display: flex;
		flex: none;
		fill: currentColor;
		pointer-events: none;
	}
</style>
