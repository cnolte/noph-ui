<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import { onMount, tick } from 'svelte'
	import DockedPickerField from './DockedPickerField.svelte'
	import MonthPanel from './MonthPanel.svelte'
	import TimeColumn from './TimeColumn.svelte'
	import { clampMinutes, isHourReachable, isMinuteWithin, stepOf } from './timeUtils.js'
	import {
		DEFAULT_YEAR_RANGE,
		formatDateTime,
		formatTwoDigits,
		getDateTimePattern,
		getDayPeriodLabels,
		getFirstDayOfWeek,
		getHourLabels,
		HOURS_IN_DAY,
		isSameDay,
		isTimeWithin,
		MINUTES_IN_DAY,
		MINUTES_IN_HOUR,
		minutesOfDay,
		parseDateTimeInput,
		parseISODate,
		parseISODateTime,
		parseISOTime,
		startOfMonth,
		toISODate,
		toISODateTime,
		today as getToday,
		uses12HourClock,
		withMinutes,
	} from './dateUtils.js'
	import type { DockedDateTimePickerProps, ISODate } from './types.js'

	let {
		value = $bindable(),
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out of the rest props on purpose
		type,
		displayMonth = $bindable(),
		open = $bindable(false),
		element = $bindable(),
		locale,
		firstDayOfWeek,
		min,
		max,
		yearRange = DEFAULT_YEAR_RANGE,
		isDateEnabled,
		adjacentMonthDays = false,
		label = 'Date and time',
		variant = 'outlined',
		autocomplete = 'off',
		minuteStep = 5,
		hour12: hourCycle,
		defaultTime = '00:00',
		cancelLabel = 'Cancel',
		confirmLabel = 'OK',
		nextMonthLabel = 'Next month',
		previousMonthLabel = 'Previous month',
		nextYearLabel = 'Next year',
		previousYearLabel = 'Previous year',
		selectMonthLabel = 'Select month',
		selectYearLabel = 'Select year',
		openCalendarLabel = 'Show date and time picker',
		invalidDateMessage = 'Enter a valid date and time.',
		selectedDateLabel = 'selected',
		shortcutLabels,
		hourLabel = 'Hour',
		minuteLabel = 'Minute',
		dayPeriodLabel = 'AM or PM',
		...attributes
	}: DockedDateTimePickerProps = $props()

	const ISO_PATTERN = 'YYYY-MM-DDTHH:mm'
	const HALF_DAY = (HOURS_IN_DAY / 2) * MINUTES_IN_HOUR

	let field = $state<DockedPickerField>()
	let panel = $state<MonthPanel>()
	let pendingDay = $state<ISODate | undefined>(undefined)
	let pendingMinutes = $state(0)
	let monthBeforeOpen: ISODate | undefined

	let todayValue = $derived(getToday())
	let minDate = $derived(parseISODateTime(min))
	let maxDate = $derived(parseISODateTime(max, MINUTES_IN_DAY - 1))
	let current = $derived<string | undefined>(
		typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : undefined,
	)

	let committed = $derived(parseISODateTime(current))
	let pendingDayDate = $derived(open ? parseISODate(pendingDay) : undefined)
	let pendingDate = $derived(
		open ? (pendingDayDate ? withMinutes(pendingDayDate, pendingMinutes) : undefined) : committed,
	)
	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})

	let localeKnown = $derived(locale !== undefined || mounted)
	let hour12 = $derived(hourCycle ?? (localeKnown ? uses12HourClock(locale) : false))
	let pattern = $derived(localeKnown ? getDateTimePattern(locale, hour12) : ISO_PATTERN)
	let monthDate = $derived(
		parseISODate(displayMonth) ?? startOfMonth(pendingDate ?? committed ?? todayValue),
	)
	let defaultMinutes = $derived(parseISOTime(defaultTime) ?? 0)

	let pendingHour = $derived(Math.floor(pendingMinutes / MINUTES_IN_HOUR))
	let pendingPeriod = $derived(pendingMinutes < HALF_DAY ? 0 : 1)
	let periodLabels = $derived(getDayPeriodLabels(locale))
	let hourLabels = $derived(getHourLabels(locale, hour12))

	// The bounds hold the time only on their own days.
	const boundsOn = (day: Date | undefined) => ({
		min: day && minDate && isSameDay(day, minDate) ? minutesOfDay(minDate) : undefined,
		max: day && maxDate && isSameDay(day, maxDate) ? minutesOfDay(maxDate) : undefined,
	})
	let bounds = $derived(boundsOn(pendingDayDate))
	let step = $derived(stepOf(minuteStep))
	const usable = (minutes: number) => isMinuteWithin(minutes, bounds.min, bounds.max)
	const reachable = (hour: number) => isHourReachable(hour, step, usable)

	let hourOptions = $derived(
		hourLabels.map((hourText, index) => {
			const hour = hour12 ? pendingPeriod * 12 + index : index
			return { value: hour, label: hourText, disabled: !reachable(hour) }
		}),
	)

	let minuteOptions = $derived(
		Array.from({ length: Math.ceil(MINUTES_IN_HOUR / step) }, (_, index) => {
			const minute = index * step
			return {
				value: minute,
				label: formatTwoDigits(minute, locale),
				disabled: !usable(pendingHour * MINUTES_IN_HOUR + minute),
			}
		}),
	)

	let periodOptions = $derived(
		periodLabels.map((periodText, index) => ({
			value: index,
			label: periodText,
			disabled: !Array.from({ length: 12 }, (_, hour) => index * 12 + hour).some(reachable),
		})),
	)

	const setMonth = (date: Date) => {
		displayMonth = toISODate(startOfMonth(date))
	}

	const selectDay = (date: Date) => {
		const { min, max } = boundsOn(date)
		pendingDay = toISODate(date)
		pendingMinutes = clampMinutes(pendingMinutes, min, max)
		setMonth(date)
	}

	const setTime = (minutes: number) => {
		pendingMinutes = clampMinutes(minutes, bounds.min, bounds.max)
	}

	const usableDate = (text: string) => {
		const parsed = parseDateTimeInput(text, locale, hour12)
		if (!parsed || !isTimeWithin(parsed, minDate, maxDate)) return undefined
		return (isDateEnabled?.(parsed) ?? true) ? toISODateTime(parsed) : undefined
	}

	export const show = () => field?.show()
	export const close = () => field?.close()
</script>

<DockedPickerField
	{...attributes}
	bind:this={field}
	kind="date-time-picker"
	bind:value
	bind:open
	bind:element
	{current}
	resetValue={typeof defaultValue === 'string' ? defaultValue : undefined}
	{label}
	{variant}
	{autocomplete}
	{pattern}
	openLabel={openCalendarLabel}
	invalidMessage={invalidDateMessage}
	format={() =>
		committed
			? localeKnown
				? formatDateTime(committed, locale, hour12)
				: toISODateTime(committed)
			: ''}
	parse={usableDate}
	ontyped={(moment) => setMonth(parseISODateTime(moment)!)}
	onrestore={() => {
		pendingDay = undefined
		pendingMinutes = 0
	}}
	onmenukeydown={(event) => panel?.handleKeydown(event)}
	onopen={async () => {
		monthBeforeOpen = displayMonth
		pendingDay = committed ? toISODate(committed) : undefined
		pendingMinutes = committed ? minutesOfDay(committed) : defaultMinutes
		await tick()
		panel?.focus()
	}}
	onclosed={() => {
		panel?.reset()
		displayMonth = monthBeforeOpen
	}}
>
	{#snippet icon()}
		<CalendarToday />
	{/snippet}
	<div class="np-docked-date-time-picker-container" style:--np-time-columns={hour12 ? 3 : 2}>
		<div class="np-docked-date-time-picker-panels">
			<div class="np-docked-date-time-picker-date">
				<MonthPanel
					bind:this={panel}
					month={monthDate}
					selected={pendingDate}
					min={minDate}
					max={maxDate}
					{locale}
					firstDayOfWeek={firstDayOfWeek ?? getFirstDayOfWeek(locale)}
					{yearRange}
					{isDateEnabled}
					{adjacentMonthDays}
					today={todayValue}
					{previousMonthLabel}
					{nextMonthLabel}
					{previousYearLabel}
					{nextYearLabel}
					{selectMonthLabel}
					{selectYearLabel}
					{selectedDateLabel}
					{shortcutLabels}
					onmonth={setMonth}
					onselect={selectDay}
				/>
			</div>

			<div class="np-docked-date-time-picker-time">
				<div class="np-docked-date-time-picker-columns">
					<TimeColumn
						aria-label={hourLabel}
						options={hourOptions}
						value={pendingHour}
						onselect={(hour) =>
							setTime(hour * MINUTES_IN_HOUR + (pendingMinutes % MINUTES_IN_HOUR))}
					/>
					<TimeColumn
						aria-label={minuteLabel}
						options={minuteOptions}
						value={pendingMinutes % MINUTES_IN_HOUR}
						onselect={(minute) => setTime(pendingHour * MINUTES_IN_HOUR + minute)}
					/>
					{#if hour12}
						<TimeColumn
							aria-label={dayPeriodLabel}
							options={periodOptions}
							value={pendingPeriod}
							onselect={(period) => setTime((pendingMinutes % HALF_DAY) + period * HALF_DAY)}
						/>
					{/if}
				</div>
			</div>
		</div>

		<Divider --np-divider-color="var(--np-color-outline-variant)" />
		<div class="np-docked-date-time-picker-actions">
			<Button type="button" variant="text" onclick={() => field?.closePicker()}
				>{cancelLabel}</Button
			>
			<Button
				type="button"
				variant="text"
				onclick={() => field?.confirm(pendingDate ? toISODateTime(pendingDate) : undefined)}
				>{confirmLabel}</Button
			>
		</div>
	</div>
</DockedPickerField>

<style>
	.np-docked-date-time-picker-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		max-width: 100%;
		color: var(--np-color-on-surface);
	}

	.np-docked-date-time-picker-panels {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.np-docked-date-time-picker-date {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: var(--np-docked-date-time-picker-container-width, 22.5rem);
		max-width: 100%;
		padding-top: 1.25rem;
		padding-bottom: 0.75rem;
	}

	.np-docked-date-time-picker-time {
		position: relative;
		height: 12rem;
		border-block-start: 1px solid var(--np-color-outline-variant);
	}

	.np-docked-date-time-picker-columns {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: stretch;
	}

	:global(.np-docked-date-time-picker-columns .np-time-column) {
		flex: 1;
		width: auto;
	}

	:global(.np-docked-date-time-picker-columns .np-time-column + .np-time-column) {
		border-inline-start: 1px solid var(--np-color-outline-variant);
	}

	@media (min-width: 37.5rem) {
		.np-docked-date-time-picker-panels {
			flex-direction: row;
		}

		.np-docked-date-time-picker-time {
			height: auto;
			width: calc(var(--np-docked-date-time-picker-column-width, 4.5rem) * var(--np-time-columns));
			border-block-start: 0;
			border-inline-start: 1px solid var(--np-color-outline-variant);
		}

		:global(.np-docked-date-time-picker-columns .np-time-column) {
			flex: none;
			width: var(--np-docked-date-time-picker-column-width, 4.5rem);
		}
	}

	.np-docked-date-time-picker-actions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		margin-top: auto;
		margin-inline: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.75rem;
	}

	:global(.np-docked-date-time-picker-actions .np-button) {
		height: 2.25rem;
	}
</style>
