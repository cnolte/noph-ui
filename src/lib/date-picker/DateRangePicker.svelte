<script lang="ts">
	import { afterTwoFrames, morphSize } from '#lib/animation.js'
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import EditCalendarIcon from '#lib/icons/EditCalendarIcon.svelte'
	import TextField from '#lib/text-field/TextField.svelte'
	import { flushSync, tick } from 'svelte'
	import Calendar from './Calendar.svelte'
	import { exitVisibility } from './exitVisibility.svelte.js'
	import {
		clampDate,
		compareDays,
		DEFAULT_YEAR_RANGE,
		formatDate,
		formatMonthDay,
		getDatePattern,
		getFirstDayOfWeek,
		getWeekdayLabels,
		isWithin,
		parseDateInput,
		parseISODate,
		startOfDay,
		startOfMonth,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import type { DateRange, DatePickerMode, DateRangePickerProps } from './types.js'

	let {
		value = $bindable({}),
		open = $bindable(false),
		element = $bindable(),
		locale,
		firstDayOfWeek,
		min,
		max,
		yearRange = DEFAULT_YEAR_RANGE,
		isDateEnabled,
		adjacentMonthDays = false,
		title = 'Select range',
		headline,
		name,
		endName,
		form,
		startLabel = 'Start date',
		endLabel = 'End date',
		mode = $bindable<DatePickerMode>('calendar'),
		modeToggle = true,
		calendarModeLabel = 'Switch to calendar mode',
		inputModeLabel = 'Switch to text input mode',
		cancelLabel = 'Cancel',
		confirmLabel = 'Save',
		selectedDateLabel = 'selected',
		onchange,
		onconfirm,
		oncancel,
		...attributes
	}: DateRangePickerProps = $props()

	const MONTHS_PER_PAGE = 4

	let scroller = $state<HTMLDivElement>()
	let pending = $state.raw<DateRange>({})
	let focusedDay = $state<Date | undefined>(undefined)
	let confirming = false

	const exit = exitVisibility()

	let todayValue = $derived(getToday())
	let week = $derived(firstDayOfWeek ?? getFirstDayOfWeek(locale))
	let minDate = $derived(parseISODate(min))
	let maxDate = $derived(parseISODate(max))
	let startDate = $derived(parseISODate(pending.start))
	let endDate = $derived(parseISODate(pending.end))
	let weekdayLabels = $derived(getWeekdayLabels(locale, week))

	const monthIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth()
	const monthFromIndex = (index: number) => new Date(Math.floor(index / 12), index % 12, 1)

	let lowerDate = $derived(minDate ?? new Date(yearRange[0], 0, 1))
	let upperDate = $derived(maxDate ?? new Date(yearRange[1], 11, 31))
	let lowerBound = $derived(monthIndex(lowerDate))
	let upperBound = $derived(monthIndex(upperDate))

	const isSelectable = (date: Date) =>
		isWithin(date, minDate, maxDate) && (isDateEnabled?.(date) ?? true)

	let canConfirm = $derived(
		!!startDate && isSelectable(startDate) && (!endDate || isSelectable(endDate)),
	)

	let firstMonth = $state(0)
	let lastMonth = $state(-1)

	let months = $derived(
		Array.from({ length: Math.max(0, lastMonth - firstMonth + 1) }, (_, index) =>
			monthFromIndex(firstMonth + index),
		),
	)

	let tabStopDate = $derived.by(() => {
		const preferred = focusedDay ?? startDate ?? todayValue
		const index = monthIndex(preferred)
		if (index >= firstMonth && index <= lastMonth) return preferred
		return monthFromIndex(Math.min(Math.max(index, firstMonth), lastMonth))
	})

	const anchorMonth = () => {
		const anchor = monthIndex(startOfMonth(startDate ?? todayValue))
		return Math.min(Math.max(anchor, lowerBound), upperBound)
	}

	const resetWindow = () => {
		const anchor = anchorMonth()
		firstMonth = Math.max(lowerBound, anchor - MONTHS_PER_PAGE)
		lastMonth = Math.min(upperBound, anchor + MONTHS_PER_PAGE)
	}

	const scrollToAnchor = async () => {
		await tick()
		const target = scroller?.querySelector<HTMLElement>(`[data-month="${anchorMonth()}"]`)
		if (target && scroller) scroller.scrollTop = target.offsetTop
	}

	let dialog = $state<Dialog>()

	export const show = () => dialog?.show()
	export const close = () => dialog?.close()

	let prepending = false

	const handleScroll = () => {
		if (!scroller || prepending) return
		const { scrollTop, scrollHeight, clientHeight } = scroller
		if (scrollTop < clientHeight && firstMonth > lowerBound) {
			prepending = true
			const previousHeight = scrollHeight
			firstMonth = Math.max(lowerBound, firstMonth - MONTHS_PER_PAGE)
			requestAnimationFrame(() => {
				if (scroller) scroller.scrollTop += scroller.scrollHeight - previousHeight
				prepending = false
			})
		} else if (scrollHeight - scrollTop - clientHeight < clientHeight && lastMonth < upperBound) {
			lastMonth = Math.min(upperBound, lastMonth + MONTHS_PER_PAGE)
		}
	}

	const selectDay = (date: Date) => {
		const iso = toISODate(date)
		if (!startDate || endDate || compareDays(date, startDate) < 0) {
			pending = { start: iso }
		} else {
			pending = { start: pending.start, end: iso }
		}
		focusedDay = date
	}

	const focusDay = (date: Date) => {
		const target = startOfDay(clampDate(date, lowerDate, upperDate))
		focusedDay = target
		const index = monthIndex(target)
		if (index < firstMonth) firstMonth = index
		if (index > lastMonth) lastMonth = index
	}

	const confirm = () => {
		confirming = true
		value = pending
		onchange?.(pending)
		onconfirm?.(pending)
		open = false
	}

	// The input mode types the range into two fields, read as they are typed and formatted once
	// left or entered. An end before the start does not count.
	let startText = $state('')
	let endText = $state('')
	let startInvalid = $state(false)
	let endInvalid = $state(false)
	let pattern = $derived(getDatePattern(locale))

	const usableDate = (typed: string) => {
		const parsed = parseDateInput(typed, locale)
		return parsed && isSelectable(parsed) ? parsed : undefined
	}

	const syncText = () => {
		startText = startDate ? formatDate(startDate, locale) : ''
		endText = endDate ? formatDate(endDate, locale) : ''
		startInvalid = false
		endInvalid = false
	}

	const readTyped = () => {
		const start = usableDate(startText)
		const end = usableDate(endText)
		pending = {
			start: start && toISODate(start),
			end: start && end && compareDays(end, start) >= 0 ? toISODate(end) : undefined,
		}
	}

	const settleTyped = () => {
		startInvalid = startText.trim() !== '' && !startDate
		endInvalid = endText.trim() !== '' && !endDate
		if (startDate) startText = formatDate(startDate, locale)
		if (endDate) endText = formatDate(endDate, locale)
	}

	// The fields slide in on a switch to input mode, not when the picker opens in it.
	let inputEnter = $state(false)
	let cancelInputEnter: (() => void) | undefined

	let content = $state<HTMLElement>()

	const setMode = (next: DatePickerMode) => {
		cancelInputEnter?.()
		morphSize(
			content,
			() =>
				flushSync(() => {
					mode = next
					inputEnter = next === 'input'
					if (next === 'input') syncText()
					else resetWindow()
				}),
			'--np-motion-expressive-default-spatial',
		)
		if (next === 'input') cancelInputEnter = afterTwoFrames(() => (inputEnter = false))
		else scrollToAnchor()
	}

	let headlineStart = $derived(startDate ? formatMonthDay(startDate, locale) : startLabel)
	let headlineEnd = $derived(endDate ? formatMonthDay(endDate, locale) : endLabel)
</script>

<Dialog
	role="dialog"
	{...attributes}
	bind:this={dialog}
	bind:element
	bind:open
	aria-label={title}
	class={['np-date-range-picker', attributes.class]}
	ontoggle={(event) => {
		if (event.newState === 'open') {
			exit.show()
			confirming = false
			pending = { ...value }
			focusedDay = undefined
			if (mode === 'input') {
				syncText()
				tick().then(() =>
					element?.querySelector<HTMLInputElement>('.np-date-range-picker-inputs input')?.focus(),
				)
			} else {
				resetWindow()
				scrollToAnchor()
			}
		} else {
			if (!confirming) oncancel?.()
			confirming = false
			exit.scheduleExit(element)
		}
	}}
>
	<input class="np-date-range-picker-value" type="hidden" value={value.start ?? ''} {name} {form} />
	<input
		class="np-date-range-picker-value"
		type="hidden"
		value={value.end ?? ''}
		name={endName}
		{form}
	/>
	{#if exit.visible}
		<div class="np-date-range-picker-content" bind:this={content}>
			<div class="np-date-range-picker-header">
				<div class="np-date-range-picker-top-bar">
					<IconButton type="button" aria-label={cancelLabel} onclick={close}>
						<CloseIcon />
					</IconButton>
					<Button type="button" variant="text" disabled={!canConfirm} onclick={confirm}>
						{confirmLabel}
					</Button>
				</div>
				<div class="np-date-range-picker-header-row">
					<div class="np-date-range-picker-header-text">
						<span class="np-date-range-picker-title">{title}</span>
						<h2 class="np-date-range-picker-headline">
							{#if headline}
								<span>{headline}</span>
							{:else}
								<span class={[!startDate && 'placeholder']}>{headlineStart}</span>
								<span aria-hidden="true">–</span>
								<span class={[!endDate && 'placeholder']}>{headlineEnd}</span>
							{/if}
						</h2>
					</div>
					{#if modeToggle}
						<IconButton
							type="button"
							aria-label={mode === 'calendar' ? inputModeLabel : calendarModeLabel}
							onclick={() => setMode(mode === 'calendar' ? 'input' : 'calendar')}
						>
							{#if mode === 'calendar'}
								<EditCalendarIcon />
							{:else}
								<CalendarToday />
							{/if}
						</IconButton>
					{/if}
				</div>
			</div>
			<Divider />

			{#if mode === 'input'}
				<div class={['np-date-range-picker-inputs', inputEnter && 'entering']}>
					{#snippet field(label: string, text: string, invalid: boolean, start: boolean)}
						<TextField
							{label}
							supportingText={pattern}
							value={text}
							aria-invalid={invalid ? 'true' : undefined}
							oninput={(event) => {
								const typed = (event.currentTarget as HTMLInputElement).value
								if (start) {
									startText = typed
									startInvalid = false
								} else {
									endText = typed
									endInvalid = false
								}
								readTyped()
							}}
							onblur={settleTyped}
							onkeydown={(event) => {
								if (event.key === 'Enter') settleTyped()
							}}
						/>
					{/snippet}
					{@render field(startLabel, startText, startInvalid, true)}
					{@render field(endLabel, endText, endInvalid, false)}
				</div>
			{:else}
				<div class="np-date-range-picker-weekdays" aria-hidden="true">
					{#each weekdayLabels as weekday (weekday.long)}
						<span>{weekday.narrow}</span>
					{/each}
				</div>

				<div class="np-date-range-picker-months" bind:this={scroller} onscroll={handleScroll}>
					{#each months as month (month.getTime())}
						<Calendar
							{month}
							data-month={monthIndex(month)}
							rangeStart={startDate}
							rangeEnd={endDate}
							min={minDate}
							max={maxDate}
							{locale}
							firstDayOfWeek={week}
							{isDateEnabled}
							{adjacentMonthDays}
							weekdays={false}
							dynamicRows
							todayDate={todayValue}
							focusedDate={focusedDay}
							selectedLabel={selectedDateLabel}
							{tabStopDate}
							focusRoot={scroller}
							onselect={selectDay}
							onfocusday={focusDay}
						>
							{#snippet monthSubhead(monthName)}
								<div class="np-date-range-picker-subhead">{monthName}</div>
							{/snippet}
						</Calendar>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#snippet actions()}
		{#if exit.visible}
			<Button type="button" variant="text" onclick={close}>{cancelLabel}</Button>
			<Button type="button" variant="text" disabled={!canConfirm} onclick={confirm}>
				{confirmLabel}
			</Button>
		{/if}
	{/snippet}
</Dialog>

<style>
	:global(.np-date-range-picker) {
		--np-dialog-container-width: 100%;
		--np-dialog-container-min-width: 0;
		--np-dialog-inset: 0;
		--np-dialog-padding: 0;
		--np-dialog-max-height: 100dvh;
		--np-dialog-elevation: none;
		--np-dialog-container-color: var(
			--np-date-range-picker-container-color,
			var(--np-color-surface-container-high)
		);
		--np-dialog-container-shape: var(
			--np-date-range-picker-container-shape,
			var(--np-shape-corner-none)
		);
	}

	:global(.np-date-range-picker .np-dialog) {
		height: 100dvh;
	}

	:global(.np-date-range-picker .np-dialog-scroller) {
		overflow: hidden;
	}

	:global(.np-date-range-picker .np-dialog .np-dialog-actions) {
		display: none;
	}

	.np-date-range-picker-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
	}

	.np-date-range-picker-header,
	.np-date-range-picker-weekdays,
	.np-date-range-picker-months {
		box-sizing: border-box;
		max-width: var(--np-date-range-picker-content-width, 25.5rem);
		margin-inline: auto;
		width: 100%;
	}

	.np-date-range-picker-header,
	.np-date-range-picker-weekdays {
		flex: none;
	}

	.np-date-range-picker-header {
		min-height: 8rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.75rem 0.75rem 0.75rem 1rem;
		color: var(--np-color-on-surface-variant);
	}

	.np-date-range-picker-top-bar,
	.np-date-range-picker-header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.np-date-range-picker-header-row {
		align-items: flex-end;
		gap: 0.5rem;
	}

	.np-date-range-picker-inputs {
		box-sizing: border-box;
		display: flex;
		gap: 1rem;
		max-width: var(--np-date-range-picker-content-width, 25.5rem);
		width: 100%;
		margin-inline: auto;
		padding: 1rem 1rem 0;
	}

	.np-date-range-picker-inputs > :global(.np-text-field) {
		flex: 1;
		min-width: 0;
	}

	.np-date-range-picker-inputs.entering {
		transform: translateY(1.5rem);
		opacity: 0;
		transition: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-date-range-picker-inputs {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-default-effects);
		}
	}

	.np-date-range-picker-header-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.np-date-range-picker-title {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
	}

	.np-date-range-picker-headline {
		margin: 0;
		color: var(--np-color-on-surface);
		display: flex;
		gap: 0.5rem;
		font-size: 1.375rem;
		line-height: 1.75rem;
		font-weight: 400;
	}

	.np-date-range-picker-headline .placeholder {
		color: var(--np-color-on-surface-variant);
	}

	.np-date-range-picker-weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		justify-items: center;
		align-items: center;
		height: 3rem;
		padding-inline: 0.75rem;
		font-size: 1rem;
		line-height: 1.5rem;
		color: var(--np-color-on-surface);
	}

	.np-date-range-picker-months {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		/* Months added above are made up for in script, in every browser alike. Scroll anchoring
		   would make up for them a second time. */
		overflow-anchor: none;
		padding-inline: 0.75rem;
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
	}

	.np-date-range-picker-subhead {
		display: flex;
		align-items: center;
		height: 3rem;
		padding-inline: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--np-date-picker-range-month-subhead-color, var(--np-color-on-surface-variant));
	}

	@media (min-width: 37.5rem) {
		:global(.np-date-range-picker) {
			--np-dialog-container-width: fit-content;
			--np-dialog-inset: 2rem 1rem;
			--np-dialog-max-height: calc(100dvh - 3rem);
			--np-dialog-container-shape: var(
				--np-date-range-picker-container-shape,
				var(--np-shape-corner-extra-large)
			);
		}

		:global(.np-date-range-picker .np-dialog) {
			height: auto;
		}

		:global(.np-date-range-picker .np-dialog .np-dialog-actions) {
			display: flex;
			margin-top: 0;
			padding: 0.5rem 0.75rem 0.75rem;
		}

		.np-date-range-picker-content {
			width: var(--np-date-range-picker-content-width, 22.5rem);
			max-width: 100%;
		}

		.np-date-range-picker-top-bar {
			display: none;
		}

		.np-date-range-picker-inputs {
			padding-inline: 1.5rem;
		}

		.np-date-range-picker-header {
			min-height: 7.5rem;
			justify-content: flex-end;
			padding: 1rem 0.75rem 0.75rem 1.5rem;
		}

		.np-date-range-picker-months {
			max-height: var(--np-date-range-picker-months-max-height, 20rem);
		}
	}
</style>
