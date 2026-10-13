<script lang="ts">
	import Divider from '#lib/divider/Divider.svelte'
	import { flushSync } from 'svelte'
	import Calendar from './Calendar.svelte'
	import CalendarHeader from './CalendarHeader.svelte'
	import SelectionList from './SelectionList.svelte'
	import {
		addMonths,
		clampMonthInYear,
		getMonthNames,
		isMonthWithin,
		isSameMonth,
		isYearWithin,
	} from './dateUtils.js'
	import type { MonthPanelProps } from './internalTypes.js'
	import { pickerShortcut } from './shortcuts.js'

	// The month of a docked picker: its header, its days and the month and year lists that slide
	// over them.
	let {
		month,
		selected,
		min,
		max,
		locale,
		firstDayOfWeek,
		yearRange,
		isDateEnabled,
		adjacentMonthDays = false,
		today,
		previousMonthLabel,
		nextMonthLabel,
		previousYearLabel,
		nextYearLabel,
		selectMonthLabel,
		selectYearLabel,
		selectedDateLabel,
		shortcutLabels,
		onmonth,
		onselect,
		onconfirm,
	}: MonthPanelProps = $props()

	const uid = $props.id()
	let panel = $state<HTMLElement>()
	let mode = $state<'days' | 'months' | 'years'>('days')
	// The list stays while it slides away.
	let listMode = $state<'months' | 'years' | undefined>(undefined)
	let focusedDay = $state<Date | undefined>(undefined)

	let year = $derived(month.getFullYear())
	// How far each arrow steps, 0 where the step would leave the bounds.
	let steps = $derived({
		previousMonth: isMonthWithin(year, month.getMonth() - 1, min, max) ? -1 : 0,
		nextMonth: isMonthWithin(year, month.getMonth() + 1, min, max) ? 1 : 0,
		previousYear:
			year > yearRange[0] && isMonthWithin(year - 1, month.getMonth(), min, max) ? -12 : 0,
		nextYear: year < yearRange[1] && isMonthWithin(year + 1, month.getMonth(), min, max) ? 12 : 0,
	})
	let monthNames = $derived(getMonthNames(locale, 'long'))
	let shortMonthNames = $derived(getMonthNames(locale, 'short'))

	let monthOptions = $derived(
		monthNames.map((label, index) => ({
			value: index,
			label,
			disabled: !isMonthWithin(year, index, min, max),
		})),
	)
	let yearOptions = $derived(
		Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, index) => {
			const option = yearRange[0] + index
			return { value: option, label: `${option}`, disabled: !isYearWithin(option, min, max) }
		}),
	)

	const setMode = (next: 'days' | 'months' | 'years') => {
		mode = next
		if (next !== 'days') listMode = next
	}

	/** Focuses the day that takes focus. */
	export const focus = () =>
		panel?.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')?.focus()

	/** Back to the days, for the next time the picker opens. */
	export const reset = () => {
		mode = 'days'
		listMode = undefined
		focusedDay = undefined
	}

	// The view changes and focus moves in one step. A focused part that turns inert drops focus to the
	// page, where the next key, such as Escape, would close the picker.
	const backToDays = () => {
		flushSync(() => (mode = 'days'))
		focus()
	}

	// Shift+M and Shift+Y toggle a list as its button does: open on its chosen entry, also from the
	// other list, or back to the days.
	const toggleList = (next: 'months' | 'years') => {
		if (mode === next) return backToDays()
		flushSync(() => setMode(next))
		panel?.querySelector<HTMLElement>(`#${uid}-${next} [role="option"][tabindex="0"]`)?.focus()
	}

	/**
	 * The keys of the picker, for its whole menu: Shift+M and Shift+Y from anywhere in it, Page up
	 * and Page down from the header, as the arrows they stand for. Escape with a list open goes back
	 * to the days, before a second one closes the picker.
	 */
	export const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && mode !== 'days' && !event.defaultPrevented) {
			event.preventDefault()
			backToDays()
			return
		}
		// The menu itself holds focus after a click on a bare part of it.
		const target = event.target as Node
		const onDate = target === event.currentTarget || !!panel?.contains(target)
		const shortcut = pickerShortcut(event)
		if (shortcut === 'monthList' || shortcut === 'yearList') {
			event.preventDefault()
			toggleList(shortcut === 'monthList' ? 'months' : 'years')
		} else if (shortcut && mode === 'days' && onDate) {
			event.preventDefault()
			if (steps[shortcut]) onmonth(addMonths(month, steps[shortcut]))
		}
	}

	const leaveList = (date: Date) => {
		onmonth(date)
		backToDays()
	}
</script>

<div class="np-month-panel" bind:this={panel}>
	<CalendarHeader
		{mode}
		monthLabel={shortMonthNames[month.getMonth()]}
		yearLabel={`${year}`}
		canPreviousMonth={steps.previousMonth !== 0}
		canNextMonth={steps.nextMonth !== 0}
		canPreviousYear={steps.previousYear !== 0}
		canNextYear={steps.nextYear !== 0}
		{previousMonthLabel}
		{nextMonthLabel}
		{previousYearLabel}
		{nextYearLabel}
		{selectMonthLabel}
		{selectYearLabel}
		{shortcutLabels}
		monthListId="{uid}-months"
		yearListId="{uid}-years"
		onpreviousmonth={() => onmonth(addMonths(month, -1))}
		onnextmonth={() => onmonth(addMonths(month, 1))}
		onpreviousyear={() => onmonth(addMonths(month, -12))}
		onnextyear={() => onmonth(addMonths(month, 12))}
		ontogglemonths={() => setMode(mode === 'months' ? 'days' : 'months')}
		ontoggleyears={() => setMode(mode === 'years' ? 'days' : 'years')}
	/>

	<div class="np-month-panel-views">
		<div class="np-month-panel-days" inert={mode !== 'days'}>
			<Calendar
				{month}
				{selected}
				{min}
				{max}
				{locale}
				{firstDayOfWeek}
				{isDateEnabled}
				{adjacentMonthDays}
				dynamicRows
				todayDate={today}
				focusedDate={focusedDay}
				selectedLabel={selectedDateLabel}
				onselect={(date) => {
					focusedDay = date
					onselect(date)
				}}
				{onconfirm}
				onmonthstep={(delta) => onmonth(addMonths(month, delta))}
				onfocusday={(date) => {
					focusedDay = date
					if (!isSameMonth(date, month)) onmonth(date)
				}}
			/>
		</div>

		{#if listMode}
			<div class={['np-month-panel-list', mode !== 'days' && 'open']}>
				<div class="np-month-panel-shade">
					<Divider --np-divider-color="var(--np-color-outline-variant)" />
					{#if listMode === 'months'}
						<SelectionList
							id="{uid}-months"
							aria-label={selectMonthLabel}
							options={monthOptions}
							value={month.getMonth()}
							onselect={(index) => leaveList(new Date(year, index, 1))}
						/>
					{:else}
						<SelectionList
							id="{uid}-years"
							aria-label={selectYearLabel}
							options={yearOptions}
							value={year}
							onselect={(next) =>
								leaveList(new Date(next, clampMonthInYear(next, month.getMonth(), min, max), 1))}
						/>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.np-month-panel {
		display: contents;
	}

	.np-month-panel :global(.np-date-picker-header) {
		margin-inline: 0.75rem;
	}

	.np-month-panel-views {
		position: relative;
		margin-top: 1.875rem;
	}

	.np-month-panel-days {
		padding-inline: 0.75rem;
	}

	.np-month-panel-list {
		position: absolute;
		inset: 0;
		overflow: hidden;
		visibility: hidden;
	}

	.np-month-panel-list.open {
		visibility: visible;
	}

	.np-month-panel-shade {
		display: flex;
		flex-direction: column;
		height: 100%;
		translate: 0 -100%;
		opacity: 0.6;
		background-color: var(--np-menu-container-color, var(--np-color-surface-container-high));
	}

	.open .np-month-panel-shade {
		translate: 0 0;
		opacity: 1;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Hidden only once the list has slid away. It shows at once, as a list still hidden while it
		   starts to slide in cannot take focus. */
		.np-month-panel-list {
			transition: visibility var(--np-motion-expressive-default-effects);
		}

		.np-month-panel-list.open {
			transition: none;
		}

		.np-month-panel-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-fast-effects);
		}

		.open .np-month-panel-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-default-effects);

			@starting-style {
				translate: 0 -100%;
				opacity: 0.6;
			}
		}
	}
</style>
