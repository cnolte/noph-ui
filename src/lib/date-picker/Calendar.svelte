<script lang="ts">
	import Ripple from '#lib/ripple/Ripple.svelte'
	import { tick } from 'svelte'
	import type { Attachment } from 'svelte/attachments'
	import {
		addDays,
		addMonths,
		clampDate,
		compareDays,
		DAYS_IN_WEEK,
		formatDateLong,
		formatMonthYear,
		getCalendarDays,
		getWeekdayLabels,
		getWeekRowCount,
		isSameDay,
		isWithin,
		MAX_CALENDAR_ROWS,
		startOfDay,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import { afterTwoFrames } from './enterAnimation.js'
	import type { CalendarProps } from './types.ts'

	let {
		month,
		selected,
		rangeStart,
		rangeEnd,
		min,
		max,
		locale,
		firstDayOfWeek,
		isDateEnabled,
		weekdays = true,
		adjacentMonthDays = false,
		dynamicRows = false,
		todayDate,
		focusedDate,
		selectedLabel = 'selected',
		tabStopDate,
		focusRoot,
		onselect,
		onfocusday,
		onmonthstep,
		monthSubhead,
		...attributes
	}: CalendarProps = $props()

	const SWIPE_THRESHOLD = 48

	let todayValue = $derived(todayDate ?? getToday())
	let weekdayLabels = $derived(getWeekdayLabels(locale, firstDayOfWeek))
	let rowCount = $derived(dynamicRows ? getWeekRowCount(month, firstDayOfWeek) : MAX_CALENDAR_ROWS)
	let days = $derived(getCalendarDays(month, firstDayOfWeek, rowCount))
	let weeks = $derived(
		Array.from({ length: rowCount }, (_, index) =>
			days.slice(index * DAYS_IN_WEEK, index * DAYS_IN_WEEK + DAYS_IN_WEEK),
		),
	)
	let monthLabel = $derived(formatMonthYear(month, locale))
	let monthStep = $derived(month.getFullYear() * 12 + month.getMonth())

	let previousMonthStep: number | undefined

	const slideOnMonthChange =
		(step: number): Attachment<HTMLElement> =>
		(element) => {
			const previous = previousMonthStep
			previousMonthStep = step
			if (previous === undefined || step === previous) return
			const slide = `slide-from-${step > previous ? 'end' : 'start'}`
			element.classList.add(slide)
			const cancel = afterTwoFrames(() => element.classList.remove(slide))
			return () => {
				cancel()
				element.classList.remove(slide)
			}
		}

	const isEnabled = (date: Date) => isWithin(date, min, max) && (isDateEnabled?.(date) ?? true)

	let tabStop = $derived.by(() => {
		if (tabStopDate) return tabStopDate
		const candidates = [focusedDate, selected, rangeStart, todayValue].filter(
			(date): date is Date =>
				!!date &&
				date.getMonth() === month.getMonth() &&
				date.getFullYear() === month.getFullYear(),
		)
		return candidates[0] ?? new Date(month.getFullYear(), month.getMonth(), 1)
	})

	const findDay = (root: HTMLElement, date: Date) => {
		const selector = `.np-calendar-day[data-date="${toISODate(date)}"]`
		return (
			root.querySelector<HTMLElement>(`${selector}:not(.outside)`) ??
			root.querySelector<HTMLElement>(selector)
		)
	}

	const moveFocus = async (grid: HTMLElement, date: Date) => {
		const target = startOfDay(clampDate(date, min, max))
		onfocusday?.(target)
		await tick()
		findDay(focusRoot ?? grid, target)?.focus()
	}

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const grid = event.currentTarget
		const from = focusedDate ?? tabStop
		switch (event.key) {
			case 'ArrowLeft':
				moveFocus(grid, addDays(from, -1))
				break
			case 'ArrowRight':
				moveFocus(grid, addDays(from, 1))
				break
			case 'ArrowUp':
				moveFocus(grid, addDays(from, -DAYS_IN_WEEK))
				break
			case 'ArrowDown':
				moveFocus(grid, addDays(from, DAYS_IN_WEEK))
				break
			case 'Home':
				moveFocus(
					grid,
					addDays(from, -((from.getDay() - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK)),
				)
				break
			case 'End':
				moveFocus(
					grid,
					addDays(
						from,
						DAYS_IN_WEEK - 1 - ((from.getDay() - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK),
					),
				)
				break
			case 'PageUp':
				moveFocus(grid, addMonths(from, event.shiftKey ? -12 : -1))
				break
			case 'PageDown':
				moveFocus(grid, addMonths(from, event.shiftKey ? 12 : 1))
				break
			default:
				return
		}
		event.preventDefault()
	}

	let swipeStart: { x: number; y: number; id: number } | undefined

	const handlePointerdown = (event: PointerEvent) => {
		if (!onmonthstep || event.pointerType === 'mouse') return
		swipeStart = { x: event.clientX, y: event.clientY, id: event.pointerId }
	}

	const handlePointerup = (event: PointerEvent) => {
		if (!swipeStart || event.pointerId !== swipeStart.id) return
		const dx = event.clientX - swipeStart.x
		const dy = event.clientY - swipeStart.y
		swipeStart = undefined
		if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return
		onmonthstep?.(dx < 0 ? 1 : -1)
	}

	const inRange = (date: Date) =>
		!!rangeStart &&
		!!rangeEnd &&
		compareDays(date, rangeStart) > 0 &&
		compareDays(date, rangeEnd) < 0
</script>

<div
	{...attributes}
	class={['np-calendar', onmonthstep && 'swipeable', attributes.class]}
	onpointerdown={handlePointerdown}
	onpointerup={handlePointerup}
	onpointercancel={() => (swipeStart = undefined)}
>
	{#if monthSubhead}
		{@render monthSubhead(monthLabel)}
	{/if}
	<div
		class={['np-calendar-body', dynamicRows && 'dynamic']}
		style:--np-calendar-rows={rowCount}
		style:--np-calendar-head={weekdays ? '2.5rem' : '0rem'}
	>
		<table
			{@attach slideOnMonthChange(monthStep)}
			class="np-calendar-grid"
			role="grid"
			aria-label={monthLabel}
			onkeydown={handleKeydown}
		>
			<thead class={weekdays ? undefined : 'np-calendar-head-hidden'}>
				<tr>
					{#each weekdayLabels as weekday (weekday.long)}
						<th scope="col" abbr={weekday.long} class="np-calendar-weekday">
							<span aria-hidden="true">{weekday.narrow}</span>
							<span class="np-calendar-sr-only">{weekday.long}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each weeks as week (week[0].date.getTime())}
					<tr>
						{#each week as { date, inMonth } (date.getTime())}
							{#if !inMonth && !adjacentMonthDays}
								<td role="gridcell" class="np-calendar-cell"></td>
							{:else}
								{@const isSelected =
									isSameDay(date, selected) ||
									isSameDay(date, rangeStart) ||
									isSameDay(date, rangeEnd)}
								{@const isToday = isSameDay(date, todayValue)}
								{@const enabled = isEnabled(date)}
								{@const between = inRange(date)}
								<td
									role="gridcell"
									aria-selected={isSelected}
									class={[
										'np-calendar-cell',
										between && 'in-range',
										isSameDay(date, rangeStart) && rangeEnd && 'range-start',
										isSameDay(date, rangeEnd) && rangeStart && 'range-end',
									]}
								>
									<button
										type="button"
										data-date={toISODate(date)}
										class={[
											'np-calendar-day',
											isSelected && 'selected',
											isToday && !isSelected && 'today',
											!inMonth && 'outside',
											between && 'between',
										]}
										tabindex={inMonth && isSameDay(date, tabStop) ? 0 : -1}
										aria-disabled={!enabled}
										aria-current={isToday ? 'date' : undefined}
										aria-label={isSelected && selectedLabel
											? `${formatDateLong(date, locale)}, ${selectedLabel}`
											: formatDateLong(date, locale)}
										onclick={() => {
											if (!enabled) return
											onselect?.(date)
										}}
										onfocus={(event) => {
											if (event.currentTarget.matches(':focus-visible')) onfocusday?.(date)
										}}
									>
										<span class="np-calendar-day-container">
											{date.getDate()}
											{#if enabled}
												<Ripple />
											{/if}
										</span>
									</button>
								</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.np-calendar-body.dynamic {
		overflow: hidden;
		height: calc(var(--np-calendar-head, 2.5rem) + var(--np-calendar-rows) * 3rem);
	}

	.np-calendar.swipeable {
		touch-action: pan-y;
	}

	.np-calendar-sr-only,
	.np-calendar-head-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border-width: 0;
	}

	.np-calendar-grid {
		display: table;
		border-collapse: collapse;
		border-spacing: 0;
		table-layout: fixed;
		overflow: visible;
		box-sizing: border-box;
		width: 100%;
	}

	.np-calendar-grid thead {
		display: table-header-group;
	}

	.np-calendar-grid tbody {
		display: table-row-group;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-calendar-grid {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-default-effects);
		}

		.np-calendar-body.dynamic {
			transition: height var(--np-motion-expressive-default-spatial);
		}

		.np-calendar-grid.slide-from-start,
		.np-calendar-grid.slide-from-end {
			opacity: 0;
			transition: none;
		}

		.np-calendar-grid.slide-from-end {
			transform: translateX(6%);
		}

		.np-calendar-grid.slide-from-start {
			transform: translateX(-6%);
		}
	}

	.np-calendar-grid tr {
		display: table-row;
	}

	.np-calendar-weekday,
	.np-calendar-cell {
		display: table-cell;
		background: none;
		border: 0;
		border-radius: 0;
		text-align: center;
		vertical-align: middle;
	}

	.np-calendar-weekday {
		box-sizing: content-box;
		height: 1.5rem;
		padding: 0 0 1rem 0;
		width: 3rem;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 400;
		color: var(--np-date-picker-weekday-label-color, var(--np-color-on-surface));
	}

	.np-calendar-cell {
		padding: 0;
		width: 3rem;
		height: 3rem;
		position: relative;
	}

	.np-calendar-day {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		color: var(--np-color-on-surface);
	}

	.np-calendar-day-container {
		position: relative;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--np-date-picker-date-container-shape, var(--np-shape-corner-full));
		font-size: 1rem;
		line-height: 1.5rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-calendar-day:not(.between) {
			transition: color var(--np-motion-expressive-default-effects);
		}

		.np-calendar-day:not(.between) .np-calendar-day-container {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				outline-color var(--np-motion-expressive-default-effects);
		}
	}

	.np-calendar-day.outside {
		color: var(--np-color-on-surface-variant);
	}

	.np-calendar-day.today {
		color: var(--np-date-picker-date-today-label-color, var(--np-color-primary));
	}

	.np-calendar-day.today .np-calendar-day-container {
		outline: 1px solid var(--np-date-picker-date-today-outline-color, var(--np-color-primary));
		outline-offset: -1px;
	}

	.np-calendar-day.between:not([aria-disabled='true']) {
		color: var(--np-color-on-secondary-container);
		--np-ripple-hover-color: var(--np-color-on-secondary-container);
		--np-ripple-pressed-color: var(--np-color-on-secondary-container);
	}

	.np-calendar-day.selected {
		color: var(--np-date-picker-date-selected-label-color, var(--np-color-on-primary));
		--np-ripple-hover-color: var(
			--np-date-picker-date-selected-label-color,
			var(--np-color-on-primary)
		);
		--np-ripple-pressed-color: var(
			--np-date-picker-date-selected-label-color,
			var(--np-color-on-primary)
		);
	}

	.np-calendar-day.selected .np-calendar-day-container {
		background-color: var(--np-date-picker-date-selected-container-color, var(--np-color-primary));
	}

	.np-calendar-day[aria-disabled='true'] {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-calendar-day:focus-visible {
		outline: none;
	}

	.np-calendar-day:focus-visible .np-calendar-day-container {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}

	.np-calendar-cell.in-range::before,
	.np-calendar-cell.range-start::before,
	.np-calendar-cell.range-end::before {
		content: '';
		position: absolute;
		inset-block: 0.25rem;
		inset-inline: 0;
		background-color: var(
			--np-date-picker-range-active-indicator-color,
			var(--np-color-secondary-container)
		);
	}

	.np-calendar-cell.range-start::before {
		inset-inline-start: 50%;
		border-start-start-radius: var(--np-shape-corner-full);
		border-end-start-radius: var(--np-shape-corner-full);
	}

	.np-calendar-cell.range-end::before {
		inset-inline-end: 50%;
		border-start-end-radius: var(--np-shape-corner-full);
		border-end-end-radius: var(--np-shape-corner-full);
	}
</style>
