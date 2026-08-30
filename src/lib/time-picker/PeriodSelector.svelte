<script lang="ts">
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { PeriodSelectorProps } from './types.ts'

	let {
		isPm,
		orientation = 'vertical',
		disabled = false,
		amDisabled = false,
		pmDisabled = false,
		label,
		amLabel,
		pmLabel,
		onselect,
		...attributes
	}: PeriodSelectorProps = $props()

	const periods = $derived([
		{ pm: false, text: amLabel, unreachable: amDisabled },
		{ pm: true, text: pmLabel, unreachable: pmDisabled },
	])
</script>

<div
	{...attributes}
	role="radiogroup"
	aria-label={label}
	aria-disabled={disabled || undefined}
	class={['np-period-selector', orientation, attributes.class]}
>
	{#each periods as period (period.pm)}
		<button
			type="button"
			role="radio"
			disabled={disabled || period.unreachable}
			aria-checked={isPm === period.pm}
			class={['np-period-option', isPm === period.pm && 'selected']}
			onclick={() => onselect?.(period.pm)}
		>
			{period.text}
			{#if !disabled && !period.unreachable}
				<Ripple />
			{/if}
		</button>
	{/each}
</div>

<style>
	.np-period-selector {
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: var(
			--np-time-picker-period-selector-container-shape,
			var(--np-shape-corner-small)
		);
		border: 1px solid var(--np-time-picker-period-selector-outline-color, var(--np-color-outline));
	}

	.np-period-selector.vertical {
		flex-direction: column;
		width: 3.25rem;
		height: 5rem;
		flex: none;
	}

	.np-period-selector.horizontal {
		flex-direction: row;
		width: 13.5rem;
		height: 2.375rem;
		flex: none;
	}

	/* One shared hairline between the two halves rather than a border on each. */
	.np-period-selector.vertical .np-period-option + .np-period-option {
		border-block-start: 1px solid
			var(--np-time-picker-period-selector-outline-color, var(--np-color-outline));
	}

	.np-period-selector.horizontal .np-period-option + .np-period-option {
		border-inline-start: 1px solid
			var(--np-time-picker-period-selector-outline-color, var(--np-color-outline));
	}

	.np-period-option {
		font: inherit;
		position: relative;
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
		min-width: 0;
		cursor: pointer;
		background: none;
		-webkit-tap-highlight-color: transparent;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 500;
		color: var(
			--np-time-picker-period-selector-unselected-label-color,
			var(--np-color-on-surface-variant)
		);
	}

	.np-period-option.selected {
		background-color: var(
			--np-time-picker-period-selector-selected-container-color,
			var(--np-color-tertiary-container)
		);
		color: var(
			--np-time-picker-period-selector-selected-label-color,
			var(--np-color-on-tertiary-container)
		);
		--np-ripple-hover-color: var(
			--np-time-picker-period-selector-selected-label-color,
			var(--np-color-on-tertiary-container)
		);
		--np-ripple-pressed-color: var(
			--np-time-picker-period-selector-selected-label-color,
			var(--np-color-on-tertiary-container)
		);
	}

	.np-period-option:disabled {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-period-option:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: -3px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-period-option {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				color var(--np-motion-expressive-default-effects);
		}
	}

	@media (forced-colors: active) {
		.np-period-option.selected {
			background-color: Highlight;
			color: HighlightText;
		}

		.np-period-option:disabled {
			color: GrayText;
		}
	}
</style>
