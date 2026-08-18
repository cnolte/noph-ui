<script lang="ts">
	import ArrowDropDownIcon from '#lib/icons/ArrowDropDownIcon.svelte'
	import ChevronLeftIcon from '#lib/icons/ChevronLeftIcon.svelte'
	import ChevronRightIcon from '#lib/icons/ChevronRightIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface CalendarHeaderProps extends HTMLAttributes<HTMLDivElement> {
		monthLabel: string
		yearLabel: string
		mode: 'days' | 'months' | 'years'
		canPreviousMonth?: boolean
		canNextMonth?: boolean
		canPreviousYear?: boolean
		canNextYear?: boolean
		previousMonthLabel: string
		nextMonthLabel: string
		previousYearLabel: string
		nextYearLabel: string
		selectMonthLabel: string
		selectYearLabel: string
		monthListId: string
		yearListId: string
		onpreviousmonth?: () => void
		onnextmonth?: () => void
		onpreviousyear?: () => void
		onnextyear?: () => void
		ontogglemonths?: () => void
		ontoggleyears?: () => void
	}

	let {
		monthLabel,
		yearLabel,
		mode,
		canPreviousMonth = true,
		canNextMonth = true,
		canPreviousYear = true,
		canNextYear = true,
		previousMonthLabel,
		nextMonthLabel,
		previousYearLabel,
		nextYearLabel,
		selectMonthLabel,
		selectYearLabel,
		monthListId,
		yearListId,
		onpreviousmonth,
		onnextmonth,
		onpreviousyear,
		onnextyear,
		ontogglemonths,
		ontoggleyears,
		...attributes
	}: CalendarHeaderProps = $props()

	let showSteppers = $derived(mode === 'days')
</script>

{#snippet stepper(label: string, enabled: boolean, next: boolean, onclick?: () => void)}
	<button
		type="button"
		class={['np-date-picker-stepper', !showSteppers && 'hidden']}
		aria-label={label}
		disabled={!enabled}
		{onclick}
	>
		{#if next}
			<ChevronRightIcon />
		{:else}
			<ChevronLeftIcon />
		{/if}
		{#if enabled}
			<Ripple />
		{/if}
	</button>
{/snippet}

{#snippet menuButton(
	label: string,
	accessibleLabel: string,
	expanded: boolean,
	disabled: boolean,
	controls: string,
	onclick?: () => void,
)}
	<button
		type="button"
		class="np-date-picker-menu-button"
		aria-label="{accessibleLabel}, {label}"
		aria-haspopup="listbox"
		aria-expanded={expanded}
		aria-controls={expanded ? controls : undefined}
		{disabled}
		{onclick}
	>
		<span class="np-date-picker-menu-button-label">{label}</span>
		<span class={['np-date-picker-menu-button-caret', expanded && 'expanded']}>
			<ArrowDropDownIcon />
		</span>
		{#if !disabled}
			<Ripple />
		{/if}
	</button>
{/snippet}

<div {...attributes} class={['np-date-picker-header', attributes.class]}>
	<div class="np-date-picker-header-group">
		{@render stepper(previousMonthLabel, canPreviousMonth, false, onpreviousmonth)}
		{@render menuButton(
			monthLabel,
			selectMonthLabel,
			mode === 'months',
			mode === 'years',
			monthListId,
			ontogglemonths,
		)}
		{@render stepper(nextMonthLabel, canNextMonth, true, onnextmonth)}
	</div>
	<div class="np-date-picker-header-group">
		{@render stepper(previousYearLabel, canPreviousYear, false, onpreviousyear)}
		{@render menuButton(
			yearLabel,
			selectYearLabel,
			mode === 'years',
			mode === 'months',
			yearListId,
			ontoggleyears,
		)}
		{@render stepper(nextYearLabel, canNextYear, true, onnextyear)}
	</div>
</div>

<style>
	.np-date-picker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.5rem;
		color: var(--np-date-picker-header-color, var(--np-color-on-surface-variant));
	}

	.np-date-picker-header-group {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.np-date-picker-stepper,
	.np-date-picker-menu-button {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		padding: 0;
		margin: 0;
		color: inherit;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		height: 1.5rem;
		border-radius: var(--np-shape-corner-full);
	}

	.np-date-picker-stepper::before,
	.np-date-picker-menu-button::before {
		content: '';
		position: absolute;
		inset-block: -0.75rem;
		inset-inline: 0;
	}

	.np-date-picker-stepper.hidden {
		visibility: hidden;
		opacity: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-date-picker-stepper {
			transition:
				opacity var(--np-motion-expressive-default-effects),
				visibility var(--np-motion-expressive-default-effects);
		}
	}

	.np-date-picker-stepper {
		width: 1.5rem;
		justify-content: center;
		flex: none;
	}

	.np-date-picker-menu-button {
		gap: 0.25rem;
		padding-inline: 0.5rem;
	}

	.np-date-picker-menu-button-label {
		font-size: 0.875rem;
		line-height: 1.25rem;
		white-space: nowrap;
	}

	.np-date-picker-menu-button-caret {
		display: flex;
		width: 1.25rem;
		height: 1.25rem;
		transition: rotate var(--np-motion-standard-fast-effects);
	}

	.np-date-picker-menu-button-caret.expanded {
		rotate: 180deg;
	}

	:global(.np-date-picker-stepper svg) {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}

	:global(.np-date-picker-menu-button-caret svg) {
		width: 1.25rem;
		height: 1.25rem;
		fill: currentColor;
	}

	.np-date-picker-stepper:disabled,
	.np-date-picker-menu-button:disabled {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-date-picker-stepper:focus-visible,
	.np-date-picker-menu-button:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}
</style>
