<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import { tick } from 'svelte'
	import Calendar from './Calendar.svelte'
	import { exitVisibility } from './exitVisibility.svelte.js'
	import {
		clampDate,
		compareDays,
		DEFAULT_YEAR_RANGE,
		formatDateMedium,
		getFirstDayOfWeek,
		getWeekdayLabels,
		isWithin,
		parseISODate,
		startOfDay,
		startOfMonth,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import type { DateRange, DateRangePickerProps } from './types.ts'

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

	let headlineStart = $derived(startDate ? formatDateMedium(startDate, locale) : startLabel)
	let headlineEnd = $derived(endDate ? formatDateMedium(endDate, locale) : endLabel)
</script>

<Dialog
	{...attributes}
	bind:element
	aria-label={title}
	class={['np-date-range-picker', attributes.class]}
	ontoggle={(event) => {
		const nowOpen = event.newState === 'open'
		open = nowOpen
		if (nowOpen) {
			exit.show()
			confirming = false
			pending = { ...value }
			focusedDay = undefined
			resetWindow()
			scrollToAnchor()
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
		<div class="np-date-range-picker-content">
			<div class="np-date-range-picker-header">
				<div class="np-date-range-picker-top-bar">
					<IconButton type="button" aria-label={cancelLabel} onclick={cancel}>
						<CloseIcon />
					</IconButton>
					<Button type="button" variant="text" disabled={!canConfirm} onclick={confirm}>
						{confirmLabel}
					</Button>
				</div>
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
			</div>
			<Divider />

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
		</div>
	{/if}

	{#snippet actions()}
		{#if exit.visible}
			<Button type="button" variant="text" onclick={cancel}>{cancelLabel}</Button>
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
			var(--np-color-surface)
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

	.np-date-range-picker-top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			--np-dialog-elevation: var(--np-elevation-3);
			--np-dialog-container-color: var(
				--np-date-range-picker-container-color,
				var(--np-color-surface-container-high)
			);
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
