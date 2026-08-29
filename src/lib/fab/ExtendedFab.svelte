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

	.round {
		border-radius: var(--np-fab-shape, calc(var(--_height) / 2));
	}
	.square {
		border-radius: var(--np-fab-shape, var(--_square-radius));
	}
	@media (prefers-reduced-motion: no-preference) {
		.round:not(:disabled):is(:active, .pressed) {
			border-radius: var(--np-fab-pressed-shape, var(--_square-radius));
		}
		.square:not(:disabled):is(:active, .pressed) {
			border-radius: var(--np-fab-pressed-shape, calc(var(--_height) / 2));
		}
	}

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
