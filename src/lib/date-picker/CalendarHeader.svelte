<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import IconButton from '#lib/button/IconButton.svelte'
	import ArrowDropDownIcon from '#lib/icons/ArrowDropDownIcon.svelte'
	import ChevronLeftIcon from '#lib/icons/ChevronLeftIcon.svelte'
	import ChevronRightIcon from '#lib/icons/ChevronRightIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { DEFAULT_SHORTCUT_LABELS, withShortcut } from './shortcuts.js'
	import type { DatePickerShortcutLabels } from './types.js'

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
		shortcutLabels?: Partial<DatePickerShortcutLabels>
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
		shortcutLabels,
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

	const uid = $props.id()
	let showSteppers = $derived(mode === 'days')
	let keys = $derived({ ...DEFAULT_SHORTCUT_LABELS, ...shortcutLabels })
</script>

{#snippet stepper(
	label: string,
	key: string,
	enabled: boolean,
	next: boolean,
	onclick?: () => void,
)}
	<span class={['np-date-picker-stepper', !showSteppers && 'hidden']}>
		<IconButton
			type="button"
			class="np-focus-ring-inset"
			aria-label={label}
			title={withShortcut(label, key)}
			disabled={!enabled}
			{onclick}
		>
			{#if next}
				<ChevronRightIcon />
			{:else}
				<ChevronLeftIcon />
			{/if}
		</IconButton>
	</span>
{/snippet}

{#snippet menuButton(
	label: string,
	accessibleLabel: string,
	key: string,
	expanded: boolean,
	disabled: boolean,
	controls: string,
	tooltipId: string,
	onclick?: () => void,
)}
	<button
		type="button"
		class="np-date-picker-menu-button np-focus-ring"
		aria-label="{accessibleLabel}, {label}"
		aria-describedby={disabled ? undefined : tooltipId}
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
	{#if !disabled}
		<Tooltip id={tooltipId}>{withShortcut(accessibleLabel, key)}</Tooltip>
	{/if}
{/snippet}

<div {...attributes} class={['np-date-picker-header', attributes.class]}>
	<div class="np-date-picker-header-group">
		{@render stepper(
			previousMonthLabel,
			keys.previousMonth,
			canPreviousMonth,
			false,
			onpreviousmonth,
		)}
		{@render menuButton(
			monthLabel,
			selectMonthLabel,
			keys.monthList,
			mode === 'months',
			mode === 'years',
			monthListId,
			`${uid}-month-tip`,
			ontogglemonths,
		)}
		{@render stepper(nextMonthLabel, keys.nextMonth, canNextMonth, true, onnextmonth)}
	</div>
	<div class="np-date-picker-header-group">
		{@render stepper(previousYearLabel, keys.previousYear, canPreviousYear, false, onpreviousyear)}
		{@render menuButton(
			yearLabel,
			selectYearLabel,
			keys.yearList,
			mode === 'years',
			mode === 'months',
			yearListId,
			`${uid}-year-tip`,
			ontoggleyears,
		)}
		{@render stepper(nextYearLabel, keys.nextYear, canNextYear, true, onnextyear)}
	</div>
</div>

<style>
	.np-date-picker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.5rem;
		color: var(--np-date-picker-header-color, var(--np-color-on-surface-variant));
		--np-icon-button-icon-color: var(
			--np-date-picker-header-color,
			var(--np-color-on-surface-variant)
		);
	}

	.np-date-picker-header-group {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.np-date-picker-header-group:first-child {
		margin-inline-start: -0.5rem;
	}
	.np-date-picker-header-group:last-child {
		margin-inline-end: -0.5rem;
	}

	.np-date-picker-stepper {
		display: flex;
		flex: none;
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

	.np-date-picker-menu-button {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		margin: 0;
		color: inherit;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		height: 1.5rem;
		padding: 0 0.5rem;
		border-radius: var(--np-shape-corner-full);
	}

	.np-date-picker-menu-button::before {
		content: '';
		position: absolute;
		inset-block: -0.75rem;
		inset-inline: 0;
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

	:global(.np-date-picker-menu-button-caret svg) {
		width: 1.25rem;
		height: 1.25rem;
		fill: currentColor;
	}

	.np-date-picker-menu-button:disabled {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
</style>
