<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import { onFormReset } from '#lib/form-reset.js'
	import TextField from '#lib/text-field/TextField.svelte'
	import { onMount, tick } from 'svelte'
	import Calendar from './Calendar.svelte'
	import CalendarHeader from './CalendarHeader.svelte'
	import SelectionList from './SelectionList.svelte'
	import {
		addMonths,
		clampMonthInYear,
		compareDays,
		DEFAULT_YEAR_RANGE,
		formatDate,
		getDatePattern,
		getFirstDayOfWeek,
		getMonthNames,
		getWeekRowCount,
		isMonthWithin,
		isWithin,
		isYearWithin,
		parseDateInput,
		parseISODate,
		startOfMonth,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import type { DockedDatePickerProps, ISODate } from './types.ts'

	let {
		value = $bindable(),
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- absorbed on purpose
		type,
		'aria-invalid': ariaInvalid,
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
		label = 'Date',
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
		cancelLabel = 'Cancel',
		confirmLabel = 'OK',
		nextMonthLabel = 'Next month',
		previousMonthLabel = 'Previous month',
		nextYearLabel = 'Next year',
		previousYearLabel = 'Previous year',
		selectMonthLabel = 'Select month',
		selectYearLabel = 'Select year',
		openCalendarLabel = 'Show date picker',
		invalidDateMessage = 'Enter a valid date.',
		selectedDateLabel = 'selected',
		onchange,
		...attributes
	}: DockedDatePickerProps = $props()

	const ISO_PATTERN = 'YYYY-MM-DD'

	const uid = $props.id()

	let anchorElement = $state<HTMLDivElement>()
	let menuElement = $state<HTMLDivElement>()
	let mode = $state<'days' | 'months' | 'years'>('days')
	let listMode = $state<'months' | 'years' | undefined>(undefined)
	let pending = $state<ISODate | undefined>(undefined)
	let focusedDay = $state<Date | undefined>(undefined)
	let inputElement = $state<HTMLInputElement | HTMLTextAreaElement>()
	let valueInput = $state<HTMLInputElement>()

	let typed = $state.raw<{ source: ISODate | null | undefined; text: string } | undefined>()
	let invalidText = $state<string | undefined>()
	let monthBeforeOpen: ISODate | undefined

	let current = $derived<ISODate | undefined>(
		typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : undefined,
	)

	let todayValue = $derived(getToday())
	let week = $derived(firstDayOfWeek ?? getFirstDayOfWeek(locale))
	let minDate = $derived(parseISODate(min))
	let maxDate = $derived(parseISODate(max))
	let committed = $derived(parseISODate(current))
	let pendingDate = $derived(open ? parseISODate(pending) : committed)
	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})

	let localeKnown = $derived(locale !== undefined || mounted)
	let pattern = $derived(localeKnown ? getDatePattern(locale) : ISO_PATTERN)
	let monthDate = $derived(
		parseISODate(displayMonth) ?? startOfMonth(pendingDate ?? committed ?? todayValue),
	)
	let monthNames = $derived(getMonthNames(locale, 'long'))
	let shortMonthNames = $derived(getMonthNames(locale, 'short'))
	let rowCount = $derived(getWeekRowCount(monthDate, week))

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
		return localeKnown ? formatDate(committed, locale) : toISODate(committed)
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

	const setMonth = (date: Date) => {
		displayMonth = toISODate(startOfMonth(date))
	}

	const commit = (next: ISODate | undefined) => {
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
			pending = undefined
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

	$effect(() => {
		if (open) openPicker()
		else if (isShowing()) menuElement?.hidePopover()
	})

	const focusCalendar = () => {
		menuElement?.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')?.focus()
	}

	const closePicker = (restoreFocus = true) => {
		menuElement?.hidePopover()
		if (restoreFocus) {
			anchorElement?.querySelector<HTMLElement>('input')?.focus()
		}
	}

	const selectDay = (date: Date) => {
		pending = toISODate(date)
		setMonth(date)
		focusedDay = date
	}

	const confirm = () => {
		typed = undefined
		invalidText = undefined
		commit(pending)
		closePicker()
	}

	const usableDate = (typed: string) => {
		const parsed = parseDateInput(typed, locale)
		if (!parsed) return undefined
		if (!isWithin(parsed, minDate, maxDate)) return undefined
		return (isDateEnabled?.(parsed) ?? true) ? parsed : undefined
	}

	const handleInput = (event: Event) => {
		const next = (event.currentTarget as HTMLInputElement).value
		const parsed = usableDate(next)
		commit(parsed ? toISODate(parsed) : undefined)
		if (parsed) setMonth(parsed)
		// Recorded after the commit, so that it is remembered against the value it just produced.
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
		// Leaving the field tidies a loose entry: dropping what was typed falls back to the
		// canonical formatting of the value it produced.
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
		// A year is offered as soon as any of its days is in range, so keeping the month the list was
		// opened from can land on a month where nothing at all is selectable.
		setMonth(new Date(year, clampMonthInYear(year, monthDate.getMonth(), minDate, maxDate), 1))
		leaveList()
	}
</script>

<div {...attributes} bind:this={element} class={['np-docked-date-picker', attributes.class]}>
	<div class="np-docked-date-picker-anchor" bind:this={anchorElement} style:anchor-name="--{uid}">
		<TextField
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
			bind:inputElement
			aria-invalid={inputInvalid || issues?.length || ariaInvalid === true || ariaInvalid === 'true'
				? 'true'
				: undefined}
			oninput={handleInput}
			onblur={handleBlur}
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
			class="np-docked-date-picker-value"
			type="hidden"
			value={current ?? ''}
			{name}
			{form}
			{disabled}
		/>
	</div>

	<Menu
		id="{uid}-calendar"
		role="dialog"
		aria-label={label}
		aria-modal="false"
		class="np-docked-date-picker-menu"
		style={`position-anchor:--${uid};`}
		--np-menu-justify-self="none"
		--np-menu-position-area="bottom span-right"
		--np-menu-over-anchor-position-area="span-all span-right"
		--np-menu-margin="0"
		--np-menu-container-color="var(--np-docked-date-picker-container-color, var(--np-color-surface-container-high))"
		--np-menu-container-shape="var(--np-docked-date-picker-container-shape, var(--np-shape-corner-large))"
		anchor={anchorElement}
		bind:element={menuElement}
		bind:open
		ontoggle={({ newState }) => {
			if (newState === 'open') {
				monthBeforeOpen = displayMonth
				pending = current
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
			<div class="np-docked-date-picker-container" style:--np-calendar-rows={rowCount}>
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

				<div class="np-docked-date-picker-views">
					<div class="np-docked-date-picker-body" inert={mode !== 'days'}>
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
						<div class={['np-docked-date-picker-menu-view', mode !== 'days' && 'open']}>
							<div class="np-docked-date-picker-menu-shade">
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

				<div class="np-docked-date-picker-actions">
					<Button type="button" variant="text" onclick={() => closePicker()}>{cancelLabel}</Button>
					<Button type="button" variant="text" onclick={confirm}>{confirmLabel}</Button>
				</div>
			</div>
		{/if}
	</Menu>
</div>

<style>
	.np-docked-date-picker {
		display: inline-flex;
		flex-direction: column;
	}

	.np-docked-date-picker-anchor {
		display: inline-flex;
		position: relative;
	}

	:global(.np-docked-date-picker-menu .np-menu) {
		padding: 0;
	}

	.np-docked-date-picker-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: var(--np-docked-date-picker-container-width, 22.5rem);
		max-width: 100%;
		padding-top: 1.25rem;
		color: var(--np-color-on-surface);
	}

	.np-docked-date-picker-container :global(.np-date-picker-header) {
		margin-inline: 0.75rem;
	}

	.np-docked-date-picker-views {
		position: relative;
		margin-top: 1.875rem;
	}

	.np-docked-date-picker-body {
		padding-inline: 0.75rem;
	}

	.np-docked-date-picker-actions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		margin-top: auto;
		margin-inline: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.75rem;
	}

	:global(.np-docked-date-picker-actions .np-button) {
		height: 2.25rem;
	}

	.np-docked-date-picker-menu-view {
		position: absolute;
		inset: 0;
		overflow: hidden;
		visibility: hidden;
	}

	.np-docked-date-picker-menu-view.open {
		visibility: visible;
	}

	.np-docked-date-picker-menu-shade {
		display: flex;
		flex-direction: column;
		height: 100%;
		translate: 0 -100%;
		opacity: 0.6;
		background-color: var(
			--np-docked-date-picker-container-color,
			var(--np-color-surface-container-high)
		);
	}

	.np-docked-date-picker-menu-view.open .np-docked-date-picker-menu-shade {
		translate: 0 0;
		opacity: 1;
	}

	.np-docked-date-picker-menu-view :global(.np-date-picker-selection-list) {
		flex: 1;
		min-height: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-docked-date-picker-menu-view {
			transition: visibility var(--np-motion-expressive-default-effects);
		}

		.np-docked-date-picker-menu-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-fast-effects);
		}

		.np-docked-date-picker-menu-view.open .np-docked-date-picker-menu-shade {
			transition:
				translate var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-default-effects);
		}

		@starting-style {
			.np-docked-date-picker-menu-view.open .np-docked-date-picker-menu-shade {
				translate: 0 -100%;
				opacity: 0.6;
			}
		}
	}

	.np-docked-date-picker-container :global(.np-divider) {
		flex: none;
	}
</style>
