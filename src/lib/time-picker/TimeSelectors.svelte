<script lang="ts">
	import { formatTwoDigits, MINUTES_IN_HOUR } from '#lib/date-picker/timeUtils.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { TimeSelectorsProps } from './types.ts'

	let {
		value,
		selection,
		hour12,
		locale,
		disabled = false,
		hourLabel,
		minuteLabel,
		onselect,
		...attributes
	}: TimeSelectorsProps = $props()

	let hour = $derived(Math.floor(value / MINUTES_IN_HOUR))
	let minute = $derived(value % MINUTES_IN_HOUR)
	let hourText = $derived(formatTwoDigits(hour12 ? hour % 12 || 12 : hour, locale))
	let minuteText = $derived(formatTwoDigits(minute, locale))

	const fields = $derived([
		{ key: 'hour' as const, text: hourText, label: hourLabel },
		{ key: 'minute' as const, text: minuteText, label: minuteLabel },
	])
</script>

<div
	{...attributes}
	role="radiogroup"
	class={['np-time-selectors', attributes.class]}
	aria-disabled={disabled || undefined}
>
	{#each fields as field, index (field.key)}
		{#if index > 0}
			<div class="np-time-selectors-separator" aria-hidden="true">:</div>
		{/if}
		<button
			type="button"
			role="radio"
			{disabled}
			aria-checked={selection === field.key}
			aria-label="{field.label}, {field.text}"
			class={['np-time-selector', selection === field.key && 'selected']}
			onclick={() => onselect?.(field.key)}
		>
			<span aria-hidden="true">{field.text}</span>
			{#if !disabled}
				<Ripple />
			{/if}
		</button>
	{/each}
</div>

<style>
	.np-time-selectors {
		display: flex;
		align-items: center;
	}

	.np-time-selectors-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		/* 24dp of air on either side of the colon. */
		width: 3rem;
		flex: none;
		font-size: 3.5rem;
		line-height: 4rem;
		font-weight: 400;
		color: var(--np-time-picker-time-selector-separator-color, var(--np-color-on-surface));
	}

	.np-time-selector {
		font: inherit;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: var(--np-time-picker-time-selector-container-width, 6rem);
		height: 5rem;
		flex: none;
		margin: 0;
		padding: 0;
		border: 0;
		cursor: pointer;
		overflow: hidden;
		-webkit-tap-highlight-color: transparent;
		border-radius: var(
			--np-time-picker-time-selector-container-shape,
			var(--np-shape-corner-small)
		);
		font-size: 3.5rem;
		line-height: 4rem;
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		background-color: var(
			--np-time-picker-time-selector-unselected-container-color,
			var(--np-color-surface-container-highest)
		);
		color: var(--np-time-picker-time-selector-unselected-label-color, var(--np-color-on-surface));
	}

	.np-time-selector.selected {
		background-color: var(
			--np-time-picker-time-selector-selected-container-color,
			var(--np-color-primary-container)
		);
		color: var(
			--np-time-picker-time-selector-selected-label-color,
			var(--np-color-on-primary-container)
		);
		--np-ripple-hover-color: var(
			--np-time-picker-time-selector-selected-label-color,
			var(--np-color-on-primary-container)
		);
		--np-ripple-pressed-color: var(
			--np-time-picker-time-selector-selected-label-color,
			var(--np-color-on-primary-container)
		);
	}

	.np-time-selector:disabled {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-time-selector:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-time-selector {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				color var(--np-motion-expressive-default-effects);
		}
	}

	@media (forced-colors: active) {
		.np-time-selector {
			border: 1px solid CanvasText;
		}

		.np-time-selector.selected {
			background-color: Highlight;
			color: HighlightText;
		}

		.np-time-selector:disabled {
			color: GrayText;
		}
	}
</style>
