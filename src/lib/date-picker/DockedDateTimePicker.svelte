<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import { onFormReset } from '#lib/form-reset.js'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import TextField from '#lib/text-field/TextField.svelte'
	import { onMount, tick } from 'svelte'
	import Calendar from './Calendar.svelte'
	import CalendarHeader from './CalendarHeader.svelte'
	import SelectionList from './SelectionList.svelte'
	import TimeColumn from './TimeColumn.svelte'
	import {
		addMonths,
		clampMonthInYear,
		compareDays,
		compareTimes,
		DEFAULT_YEAR_RANGE,
		formatDateTime,
		formatTwoDigits,
		getDateTimePattern,
		getDayPeriodLabels,
		getFirstDayOfWeek,
		getHourLabels,
		getMonthNames,
		getWeekRowCount,
		HOURS_IN_DAY,
		isMonthWithin,
		isSameDay,
		isTimeWithin,
		isYearWithin,
		MINUTES_IN_DAY,
		MINUTES_IN_HOUR,
		minutesOfDay,
		parseDateTimeInput,
		parseISODate,
		parseISODateTime,
		startOfMonth,
		toISODate,
		toISODateTime,
		today as getToday,
		uses12HourClock,
		withMinutes,
	} from './dateUtils.js'
	import type { DockedDateTimePickerProps, ISODate } from './types.ts'

	let {
		value = $bindable(),
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- absorbed on purpose
		type,
		'aria-invalid': ariaInvalid,
		style,
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
		supportingText,
		issues,
		variant = 'outlined',
		name,
		form,
		required,
		disabled,
		readonly,
		noAsterisk,
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
		hourLabel = 'Hour',
		minuteLabel = 'Minute',
		dayPeriodLabel = 'AM or PM',
		onchange,
		oninput,
		onblur,
		...attributes
	}: DockedDateTimePickerProps = $props()

	const ISO_PATTERN = 'YYYY-MM-DDTHH:mm'
	const HALF_DAY = (HOURS_IN_DAY / 2) * MINUTES_IN_HOUR

	const uid = $props.id()

	let menuElement = $state<HTMLDivElement>()
	let mode = $state<'days' | 'months' | 'years'>('days')
	let listMode = $state<'months' | 'years' | undefined>(undefined)
	let pendingDay = $state<ISODate | undefined>(undefined)
	let pendingMinutes = $state(0)
	let focusedDay = $state<Date | undefined>(undefined)
	let inputElement = $state<HTMLInputElement | HTMLTextAreaElement>()
	let valueInput = $state<HTMLInputElement>()

	let typed = $state.raw<{ source: string | null | undefined; text: string } | undefined>()
	let invalidText = $state<string | undefined>()
	let monthBeforeOpen: ISODate | undefined

	let todayValue = $derived(getToday())
	let week = $derived(firstDayOfWeek ?? getFirstDayOfWeek(locale))
	let minDate = $derived(parseISODateTime(min))
	let maxDate = $derived(parseISODateTime(max, MINUTES_IN_DAY - 1))
	// `as('datetime-local')` types its value as `string | number` and carries the last submission in
	// `defaultValue`, so both are funnelled into one ISO string the rest of the component reads.
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
	let monthNames = $derived(getMonthNames(locale, 'long'))
	let shortMonthNames = $derived(getMonthNames(locale, 'short'))
	let rowCount = $derived(getWeekRowCount(monthDate, week))

	let defaultMinutes = $derived.by(() => {
		const parsed = parseISODateTime(`2000-01-01T${defaultTime}`)
		return parsed ? minutesOfDay(parsed) : 0
	})

	const setMode = (next: 'days' | 'months' | 'years') => {
		if (mode === next) return
		mode = next
		if (next !== 'days') listMode = next
	}

	const leaveList = async () => {
		setMode('days')
		await tick()
		focusCalendar()
	}

	const formatValue = () => {
		if (!committed) return ''
		return localeKnown ? formatDateTime(committed, locale, hour12) : toISODateTime(committed)
	}

	let text = $derived(typed && typed.source === current ? typed.text : formatValue())

	let inputInvalid = $derived(invalidText !== undefined && invalidText === text)

	let monthOptions = $derived(
		monthNames.map((monthName, index) => ({
			value: index,
			label: monthName,
			disabled: !isMonthWithin(monthDate.getFullYear(), index, minDate, maxDate),
		})),
	)

	let yearOptions = $derived(
		Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, index) => {
			const year = yearRange[0] + index
			return {
				value: year,
				label: `${year}`,
				disabled: !isYearWithin(year, minDate, maxDate),
			}
		}),
	)

	let canPreviousMonth = $derived(
		!minDate ||
			compareDays(new Date(monthDate.getFullYear(), monthDate.getMonth(), 0), minDate) >= 0,
	)
	let canNextMonth = $derived(
		!maxDate ||
			compareDays(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1), maxDate) <= 0,
	)
	let canPreviousYear = $derived(
		monthDate.getFullYear() > yearRange[0] &&
			(!minDate || compareDays(addMonths(monthDate, -12), startOfMonth(minDate)) >= 0),
	)
	let canNextYear = $derived(
		monthDate.getFullYear() < yearRange[1] &&
			(!maxDate || compareDays(addMonths(monthDate, 12), startOfMonth(maxDate)) <= 0),
	)

	let pendingHour = $derived(Math.floor(pendingMinutes / MINUTES_IN_HOUR))
	let pendingPeriod = $derived(pendingMinutes < HALF_DAY ? 0 : 1)
	let periodLabels = $derived(getDayPeriodLabels(locale))
	let hourLabels = $derived(getHourLabels(locale, hour12))

	const spanOffered = (from: number, to: number) => {
		if (!pendingDayDate) return true
		const start = withMinutes(pendingDayDate, from)
		const end = withMinutes(pendingDayDate, to)
		return (
			(!minDate || compareTimes(end, minDate) >= 0) &&
			(!maxDate || compareTimes(start, maxDate) <= 0)
		)
	}

	let hourOptions = $derived(
		hourLabels.map((hourText, index) => {
			const hour = hour12 ? pendingPeriod * 12 + index : index
			return {
				value: hour,
				label: hourText,
				disabled: !spanOffered(
					hour * MINUTES_IN_HOUR,
					hour * MINUTES_IN_HOUR + MINUTES_IN_HOUR - 1,
				),
			}
		}),
	)

	let minuteOptions = $derived(
		Array.from({ length: Math.ceil(MINUTES_IN_HOUR / minuteStep) }, (_, index) => {
			const minute = index * minuteStep
			const at = pendingHour * MINUTES_IN_HOUR + minute
			return {
				value: minute,
				label: formatTwoDigits(minute, locale),
				disabled: !spanOffered(at, at),
			}
		}),
	)

	let periodOptions = $derived(
		periodLabels.map((periodText, index) => ({
			value: index,
			label: periodText,
			disabled: !spanOffered(index * HALF_DAY, index * HALF_DAY + HALF_DAY - 1),
		})),
	)

	const setMonth = (date: Date) => {
		displayMonth = toISODate(startOfMonth(date))
	}

	const commit = (next: string | undefined) => {
		if (current === next) return
		value = next
		onchange?.(next)
	}

	const restoreDefault = () => {
		const next = typeof defaultValue === 'string' ? defaultValue : undefined
		if (valueInput) valueInput.value = next ?? ''
		queueMicrotask(() => {
			typed = undefined
			invalidText = undefined
			pendingDay = undefined
			pendingMinutes = 0
			value = next
			text = formatValue()
		})
	}

	$effect(() => onFormReset(valueInput, restoreDefault))

	const isShowing = () => !!menuElement?.matches(':popover-open')

	const openPicker = () => {
		if (isShowing()) return
		if (disabled || readonly) {
			open = false
			return
		}
		menuElement?.showPopover()
	}

	const focusCalendarWhenReady = async () => {
		await tick()
		focusCalendar()
	}

	/*
	 * The same pair every overlay in the library exports, for the times there is no trigger to point
	 * at the picker. `close()` leaves focus where it is; only a close the user asked for, through the
	 * field or the cancel button, hands focus back to the input.
	 */
	export const show = () => openPicker()

	export const close = () => {
		if (isShowing()) menuElement?.hidePopover()
	}

	syncOpenEffect(
		() => menuElement,
		() => open,
		show,
		close,
	)

	const focusCalendar = () => {
		menuElement?.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')?.focus()
	}

	const closePicker = (restoreFocus = true) => {
		menuElement?.hidePopover()
		if (restoreFocus) {
			element?.querySelector<HTMLElement>('input')?.focus()
		}
	}

	const clampMinutesToDay = (day: Date, minutes: number) => {
		let next = minutes
		if (minDate && isSameDay(day, minDate)) next = Math.max(next, minutesOfDay(minDate))
		if (maxDate && isSameDay(day, maxDate)) next = Math.min(next, minutesOfDay(maxDate))
		return next
	}

	const selectDay = (date: Date) => {
		pendingDay = toISODate(date)
		pendingMinutes = clampMinutesToDay(date, pendingMinutes)
		setMonth(date)
		focusedDay = date
	}

	const setTime = (minutes: number) => {
		pendingMinutes = pendingDayDate ? clampMinutesToDay(pendingDayDate, minutes) : minutes
	}

	const confirm = () => {
		typed = undefined
		invalidText = undefined
		commit(pendingDate ? toISODateTime(pendingDate) : undefined)
		closePicker()
	}

	const usableDate = (typed: string) => {
		const parsed = parseDateTimeInput(typed, locale, hour12)
		if (!parsed) return undefined
		if (!isTimeWithin(parsed, minDate, maxDate)) return undefined
		return (isDateEnabled?.(parsed) ?? true) ? parsed : undefined
	}

	const handleInput = (event: Event) => {
		const next = (event.currentTarget as HTMLInputElement).value
		const parsed = usableDate(next)
		commit(parsed ? toISODateTime(parsed) : undefined)
		if (parsed) setMonth(parsed)
		typed = { source: current, text: next }
		invalidText = undefined
	}

	const handleBlur = () => {
		if (!text.trim()) {
			invalidText = undefined
			return
		}
		const parsed = usableDate(text)
		invalidText = parsed ? undefined : text
		if (parsed) typed = undefined
	}

	$effect(() => {
		const input = inputElement
		if (!input) return
		const unusable = text.trim() !== '' && !usableDate(text)
		input.setCustomValidity(unusable ? invalidDateMessage : '')
	})

	const chooseMonth = (month: number) => {
		setMonth(new Date(monthDate.getFullYear(), month, 1))
		leaveList()
	}

	const chooseYear = (year: number) => {
		setMonth(new Date(year, clampMonthInYear(year, monthDate.getMonth(), minDate, maxDate), 1))
		leaveList()
	}
</script>

<TextField
	{...attributes}
	class={['np-docked-date-time-picker', attributes.class]}
	style={`anchor-name:--${uid};${style ?? ''}`}
	{label}
	{variant}
	{issues}
	{disabled}
	{readonly}
	{required}
	{noAsterisk}
	{autocomplete}
	supportingText={supportingText ?? pattern}
	bind:value={text}
	bind:element
	bind:inputElement
	aria-invalid={inputInvalid || issues?.length || ariaInvalid === true || ariaInvalid === 'true'
		? 'true'
		: undefined}
	oninput={(event) => {
		handleInput(event)
		oninput?.(event)
	}}
	onblur={(event) => {
		handleBlur()
		onblur?.(event)
	}}
>
	{#snippet end()}
		<IconButton
			type="button"
			aria-label={openCalendarLabel}
			aria-expanded={open}
			aria-haspopup="dialog"
			aria-controls={open ? `${uid}-calendar` : undefined}
			{disabled}
			onclick={() => {
				if (open) closePicker()
				else openPicker()
			}}
		>
			<CalendarToday />
		</IconButton>
	{/snippet}
</TextField>
<input
	bind:this={valueInput}
	class="np-docked-date-time-picker-value"
	type="hidden"
	value={current ?? ''}
	{name}
	{form}
	{disabled}
/>

<Menu
	id="{uid}-calendar"
	role="dialog"
	aria-label={label}
	aria-modal="false"
	class="np-docked-date-time-picker-menu"
	style={`position-anchor:--${uid};`}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-over-anchor-position-area="span-all span-right"
	--np-menu-margin="0"
	--np-menu-container-color="var(--np-docked-date-time-picker-container-color, var(--np-color-surface-container-high))"
	--np-menu-container-shape="var(--np-docked-date-time-picker-container-shape, var(--np-shape-corner-large))"
	anchor={element}
	bind:element={menuElement}
	bind:open
	ontoggle={({ newState }) => {
		if (newState === 'open') {
			monthBeforeOpen = displayMonth
			pendingDay = committed ? toISODate(committed) : undefined
			pendingMinutes = committed ? minutesOfDay(committed) : defaultMinutes
			focusCalendarWhenReady()
		}
		if (newState === 'closed') {
			setMode('days')
			listMode = undefined
			focusedDay = undefined
			displayMonth = monthBeforeOpen
		}
	}}
>
	{#if open}
		<div
			class="np-docked-date-time-picker-container"
			style:--np-calendar-rows={rowCount}
			style:--np-time-columns={hour12 ? 3 : 2}
		>
			<div class="np-docked-date-time-picker-panels">
				<div class="np-docked-date-time-picker-date">
					<CalendarHeader
						{mode}
						monthLabel={shortMonthNames[monthDate.getMonth()]}
						yearLabel={`${monthDate.getFullYear()}`}
						{canPreviousMonth}
						{canNextMonth}
						{canPreviousYear}
						{canNextYear}
						{previousMonthLabel}
						{nextMonthLabel}
						{previousYearLabel}
						{nextYearLabel}
						{selectMonthLabel}
						{selectYearLabel}
						monthListId="{uid}-months"
						yearListId="{uid}-years"
						onpreviousmonth={() => setMonth(addMonths(monthDate, -1))}
						onnextmonth={() => setMonth(addMonths(monthDate, 1))}
						onpreviousyear={() => setMonth(addMonths(monthDate, -12))}
						onnextyear={() => setMonth(addMonths(monthDate, 12))}
						ontogglemonths={() => setMode(mode === 'months' ? 'days' : 'months')}
						ontoggleyears={() => setMode(mode === 'years' ? 'days' : 'years')}
					/>

					<div class="np-docked-date-time-picker-views">
						<div class="np-docked-date-time-picker-body" inert={mode !== 'days'}>
							<Calendar
								month={monthDate}
								selected={pendingDate}
								min={minDate}
								max={maxDate}
								{locale}
								firstDayOfWeek={week}
								{isDateEnabled}
								{adjacentMonthDays}
								dynamicRows
								todayDate={todayValue}
								focusedDate={focusedDay}
								selectedLabel={selectedDateLabel}
								onselect={selectDay}
								onmonthstep={(delta) => setMonth(addMonths(monthDate, delta))}
								onfocusday={(date) => {
									focusedDay = date
									if (
										date.getMonth() !== monthDate.getMonth() ||
										date.getFullYear() !== monthDate.getFullYear()
									) {
										setMonth(date)
									}
								}}
							/>
						</div>

						{#if listMode}
							<div class={['np-docked-date-time-picker-menu-view', mode !== 'days' && 'open']}>
								<div class="np-docked-date-time-picker-menu-shade">
									<Divider --np-divider-color="var(--np-color-outline-variant)" />
									{#if listMode === 'months'}
										<SelectionList
											id="{uid}-months"
											aria-label={selectMonthLabel}
											options={monthOptions}
											value={monthDate.getMonth()}
											onselect={chooseMonth}
										/>
									{:else}
										<SelectionList
											id="{uid}-years"
											aria-label={selectYearLabel}
											options={yearOptions}
											value={monthDate.getFullYear()}
											onselect={chooseYear}
										/>
									{/if}
								</div>
							</div>
						{/if}
					</div>
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
				<Button type="button" variant="text" onclick={() => closePicker()}>{cancelLabel}</Button>
				<Button type="button" variant="text" onclick={confirm}>{confirmLabel}</Button>
			</div>
		</div>
	{/if}
</Menu>

<style>
	:global(.np-docked-date-time-picker-menu .np-menu) {
		padding: 0;
	}

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

	.np-docked-date-time-picker-date :global(.np-date-picker-header) {
		margin-inline: 0.75rem;
	}

	.np-docked-date-time-picker-views {
		position: relative;
		margin-top: 1.875rem;
	}

	.np-docked-date-time-picker-body {
		padding-inline: 0.75rem;
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

	.np-docked-date-time-picker-menu-view {
		position: absolute;
		inset: 0;
		overflow: hidden;
		visibility: hidden;
	}

	.np-docked-date-time-picker-menu-view.open {
		visibility: visible;
	}

	.np-docked-date-time-picker-menu-shade {
		display: flex;
		flex-direction: column;
		height: 100%;
		translate: 0 -100%;
		opacity: 0.6;
		background-color: var(
			--np-docked-date-time-picker-container-color,
			var(--np-color-surface-container-high)
		);
	}

	.np-docked-date-time-picker-menu-view.open .np-docked-date-time-picker-menu-shade {
		translate: 0 0;
		opacity: 1;
	}

	.np-docked-date-time-picker-menu-view :global(.np-date-picker-selection-list) {
		flex: 1;
		min-height: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-docked-date-time-picker-menu-view {
			transition: visibility var(--np-motion-expressive-default-effects);
		}

		.np-docked-date-time-picker-menu-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-fast-effects);
		}

		.np-docked-date-time-picker-menu-view.open .np-docked-date-time-picker-menu-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-default-effects);
		}

		@starting-style {
			.np-docked-date-time-picker-menu-view.open .np-docked-date-time-picker-menu-shade {
				translate: 0 -100%;
				opacity: 0.6;
			}
		}
	}

	.np-docked-date-time-picker-container :global(.np-divider) {
		flex: none;
	}
</style>
