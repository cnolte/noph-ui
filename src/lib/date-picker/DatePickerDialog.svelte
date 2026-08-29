<script lang="ts">
	import { afterTwoFrames } from '#lib/animation.js'
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import Divider from '#lib/divider/Divider.svelte'
	import { exitVisibility } from './exitVisibility.svelte.js'
	import ArrowDropDownIcon from '#lib/icons/ArrowDropDownIcon.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import ChevronLeftIcon from '#lib/icons/ChevronLeftIcon.svelte'
	import ChevronRightIcon from '#lib/icons/ChevronRightIcon.svelte'
	import EditCalendarIcon from '#lib/icons/EditCalendarIcon.svelte'
	import TextField from '#lib/text-field/TextField.svelte'
	import { tick } from 'svelte'
	import Calendar from './Calendar.svelte'
	import YearGrid from './YearGrid.svelte'
	import {
		addMonths,
		clampMonthInYear,
		compareDays,
		DEFAULT_YEAR_RANGE,
		formatDate,
		formatDateMedium,
		formatMonthYear,
		getDatePattern,
		getFirstDayOfWeek,
		isWithin,
		parseDateInput,
		parseISODate,
		startOfMonth,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import type { DatePickerDialogProps, ISODate } from './types.ts'

	let {
		value = $bindable(),
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
		title = 'Select date',
		headline,
		label = 'Date',
		supportingText,
		issues,
		name,
		form,
		modeToggle = false,
		cancelLabel = 'Cancel',
		confirmLabel = 'OK',
		nextMonthLabel = 'Next month',
		previousMonthLabel = 'Previous month',
		selectYearLabel = 'Select year',
		calendarModeLabel = 'Switch to calendar mode',
		inputModeLabel = 'Switch to text input mode',
		selectedDateLabel = 'selected',
		onchange,
		onconfirm,
		oncancel,
		...attributes
	}: DatePickerDialogProps = $props()

	const uid = $props.id()

	let mode = $state<'calendar' | 'input'>('calendar')
	let yearPickerVisible = $state(false)
	let pending = $state<ISODate | undefined>(undefined)
	let focusedDay = $state<Date | undefined>(undefined)
	let text = $state('')
	let inputInvalid = $state(false)

	let confirming = false
	let monthBeforeOpen: ISODate | undefined

	const exit = exitVisibility()

	let todayValue = $derived(getToday())
	let week = $derived(firstDayOfWeek ?? getFirstDayOfWeek(locale))
	let minDate = $derived(parseISODate(min))
	let maxDate = $derived(parseISODate(max))
	let pendingDate = $derived(parseISODate(pending))
	let pattern = $derived(getDatePattern(locale))
	let monthDate = $derived(
		parseISODate(displayMonth) ?? startOfMonth(pendingDate ?? parseISODate(value) ?? todayValue),
	)
	let headlineText = $derived(
		headline ?? (pendingDate ? formatDateMedium(pendingDate, locale) : title),
	)

	let canPreviousMonth = $derived(
		!minDate ||
			compareDays(new Date(monthDate.getFullYear(), monthDate.getMonth(), 0), minDate) >= 0,
	)
	let canNextMonth = $derived(
		!maxDate ||
			compareDays(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1), maxDate) <= 0,
	)

	let canConfirm = $derived(
		!pendingDate ||
			(isWithin(pendingDate, minDate, maxDate) && (isDateEnabled?.(pendingDate) ?? true)),
	)

	let modeEnter = $state<'' | 'to-input' | 'to-calendar'>('')
	let yearEnter = $state(false)
	let cancelModeEnter: (() => void) | undefined
	let cancelYearEnter: (() => void) | undefined

	const setMode = (next: 'calendar' | 'input') => {
		if (mode === next) return
		mode = next
		cancelModeEnter?.()
		modeEnter = next === 'input' ? 'to-input' : 'to-calendar'
		cancelModeEnter = afterTwoFrames(() => (modeEnter = ''))
	}

	const showYearPicker = (next: boolean) => {
		yearPickerVisible = next
		if (!next) return
		cancelYearEnter?.()
		yearEnter = true
		cancelYearEnter = afterTwoFrames(() => (yearEnter = false))
	}

	export const show = () => {
		if (element && !element.open) element.showModal()
	}

	export const close = () => {
		if (element?.open) element.close()
	}

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)

	const setMonth = (date: Date) => {
		displayMonth = toISODate(startOfMonth(date))
	}

	const cancel = () => {
		open = false
	}

	const confirm = () => {
		confirming = true
		value = pending
		onchange?.(pending)
		onconfirm?.(pending)
		open = false
	}

	const focusCalendarWhenReady = async () => {
		await tick()
		element?.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')?.focus()
	}

	const syncText = () => {
		text = pendingDate ? formatDate(pendingDate, locale) : ''
		inputInvalid = false
	}

	const usableDate = (typed: string) => {
		const parsed = parseDateInput(typed, locale)
		if (!parsed || !isWithin(parsed, minDate, maxDate)) return undefined
		return (isDateEnabled?.(parsed) ?? true) ? parsed : undefined
	}

	const handleInput = (event: Event) => {
		text = (event.currentTarget as HTMLInputElement).value
		inputInvalid = false
		const parsed = usableDate(text)
		pending = parsed ? toISODate(parsed) : undefined
		if (parsed) setMonth(parsed)
	}

	const handleBlur = () => {
		if (!text.trim()) {
			inputInvalid = false
			return
		}
		const parsed = usableDate(text)
		inputInvalid = !parsed
		if (parsed) text = formatDate(parsed, locale)
	}
</script>

<Dialog
	{...attributes}
	bind:element
	aria-label={title}
	class={['np-date-picker-dialog', attributes.class]}
	--np-dialog-container-width="fit-content"
	--np-dialog-container-min-width="0"
	--np-dialog-padding="0"
	--np-dialog-container-color="var(--np-date-picker-dialog-container-color, var(--np-color-surface-container-high))"
	--np-dialog-container-shape="var(--np-date-picker-dialog-container-shape, var(--np-shape-corner-extra-large))"
	ontoggle={(event) => {
		const nowOpen = event.newState === 'open'
		open = nowOpen
		if (nowOpen) {
			exit.show()
			monthBeforeOpen = displayMonth
			confirming = false
			pending = value ?? undefined
			setMode('calendar')
			showYearPicker(false)
			focusedDay = undefined
			syncText()
			focusCalendarWhenReady()
		} else {
			if (!confirming) oncancel?.()
			confirming = false
			exit.scheduleExit(element, () => (displayMonth = monthBeforeOpen))
		}
	}}
>
	<input class="np-date-picker-dialog-value" type="hidden" value={value ?? ''} {name} {form} />
	{#if exit.visible}
		<div class="np-date-picker-dialog-content">
			<div class="np-date-picker-dialog-header">
				<div class="np-date-picker-dialog-header-text">
					<span class="np-date-picker-dialog-title">{title}</span>
					<h2 class="np-date-picker-dialog-headline">{headlineText}</h2>
				</div>
				{#if modeToggle}
					<IconButton
						type="button"
						aria-label={mode === 'calendar' ? inputModeLabel : calendarModeLabel}
						onclick={() => {
							if (mode === 'calendar') syncText()
							setMode(mode === 'calendar' ? 'input' : 'calendar')
							showYearPicker(false)
						}}
					>
						{#if mode === 'calendar'}
							<EditCalendarIcon />
						{:else}
							<CalendarToday />
						{/if}
					</IconButton>
				{/if}
			</div>
			<Divider />

			{#if mode === 'input'}
				<div class={['np-date-picker-dialog-input', modeEnter && modeEnter]}>
					<TextField
						{label}
						{issues}
						supportingText={supportingText ?? pattern}
						value={text}
						aria-invalid={inputInvalid ? 'true' : undefined}
						oninput={handleInput}
						onblur={handleBlur}
					/>
				</div>
			{:else}
				<div class="np-date-picker-dialog-navigation">
					<button
						type="button"
						class="np-date-picker-dialog-year-button"
						aria-label="{selectYearLabel}, {formatMonthYear(monthDate, locale)}"
						aria-expanded={yearPickerVisible}
						aria-controls={yearPickerVisible ? `${uid}-years` : undefined}
						onclick={() => showYearPicker(!yearPickerVisible)}
					>
						<span aria-live="polite">{formatMonthYear(monthDate, locale)}</span>
						<span class={['np-date-picker-dialog-caret', yearPickerVisible && 'expanded']}>
							<ArrowDropDownIcon />
						</span>
					</button>
					{#if !yearPickerVisible}
						<div class="np-date-picker-dialog-arrows">
							<IconButton
								type="button"
								aria-label={previousMonthLabel}
								disabled={!canPreviousMonth}
								onclick={() => setMonth(addMonths(monthDate, -1))}
							>
								<ChevronLeftIcon />
							</IconButton>
							<IconButton
								type="button"
								aria-label={nextMonthLabel}
								disabled={!canNextMonth}
								onclick={() => setMonth(addMonths(monthDate, 1))}
							>
								<ChevronRightIcon />
							</IconButton>
						</div>
					{/if}
				</div>

				{#if yearPickerVisible}
					<YearGrid
						class={yearEnter ? 'entering' : undefined}
						id="{uid}-years"
						aria-label={selectYearLabel}
						{yearRange}
						{minDate}
						{maxDate}
						value={monthDate.getFullYear()}
						onselect={(year) => {
							setMonth(
								new Date(year, clampMonthInYear(year, monthDate.getMonth(), minDate, maxDate), 1),
							)
							showYearPicker(false)
						}}
					/>
					<Divider />
				{:else}
					<div class={['np-date-picker-dialog-calendar', modeEnter && modeEnter]}>
						<Calendar
							month={monthDate}
							selected={pendingDate}
							min={minDate}
							max={maxDate}
							{locale}
							firstDayOfWeek={week}
							{isDateEnabled}
							{adjacentMonthDays}
							todayDate={todayValue}
							focusedDate={focusedDay}
							selectedLabel={selectedDateLabel}
							onmonthstep={(delta) => setMonth(addMonths(monthDate, delta))}
							onselect={(date) => {
								pending = toISODate(date)
								focusedDay = date
							}}
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
				{/if}
			{/if}
		</div>
	{/if}

	{#snippet actions()}
		<Button type="button" variant="text" onclick={cancel}>{cancelLabel}</Button>
		<Button type="button" variant="text" disabled={!canConfirm} onclick={confirm}>
			{confirmLabel}
		</Button>
	{/snippet}
</Dialog>

<style>
	.np-date-picker-dialog-content {
		width: var(--np-date-picker-dialog-container-width, 22.5rem);
		max-width: 100%;
	}

	:global(.np-date-picker-dialog .np-dialog-actions) {
		margin-top: 0;
		padding: 0.5rem 0.75rem 0.75rem;
	}

	.np-date-picker-dialog-header {
		box-sizing: border-box;
		height: 7.5rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 1rem 0.75rem 0.75rem 1.5rem;
		color: var(--np-color-on-surface-variant);
	}

	.np-date-picker-dialog-header-text {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: 0;
	}

	.np-date-picker-dialog-title {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
	}

	.np-date-picker-dialog-headline {
		margin: 0;
		font-size: 2rem;
		line-height: 2.5rem;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.np-date-picker-dialog-navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 3.5rem;
		padding-inline: 0.75rem;
		color: var(--np-color-on-surface-variant);
	}

	.np-date-picker-dialog-arrows {
		display: flex;
	}

	.np-date-picker-dialog-year-button {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		color: inherit;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		height: 2.25rem;
		padding-inline: 0.75rem;
		border-radius: var(--np-shape-corner-full);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.np-date-picker-dialog-year-button:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}

	.np-date-picker-dialog-caret {
		display: flex;
		transition: rotate var(--np-motion-standard-fast-effects);
	}

	.np-date-picker-dialog-caret.expanded {
		rotate: 180deg;
	}

	:global(.np-date-picker-dialog-caret svg) {
		width: 1.25rem;
		height: 1.25rem;
		fill: currentColor;
	}

	.np-date-picker-dialog-calendar {
		padding-inline: 0.75rem;
	}

	.np-date-picker-dialog-input {
		padding: 1rem 1.5rem 0;
	}

	.np-date-picker-dialog-content {
		overflow: hidden;
	}

	.np-date-picker-dialog-input.to-input {
		transform: translateY(100%);
		opacity: 0;
		transition: none;
	}

	.np-date-picker-dialog-calendar.to-calendar {
		transform: translateY(-3rem);
		opacity: 0;
		transition: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-date-picker-dialog-input,
		.np-date-picker-dialog-calendar {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-default-effects);
		}
	}
</style>
