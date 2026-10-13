<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import CalendarToday from '#lib/icons/CalendarToday.svelte'
	import { onMount, tick } from 'svelte'
	import DockedPickerField from './DockedPickerField.svelte'
	import MonthPanel from './MonthPanel.svelte'
	import {
		DEFAULT_YEAR_RANGE,
		formatDate,
		getDatePattern,
		getFirstDayOfWeek,
		isWithin,
		parseDateInput,
		parseISODate,
		startOfMonth,
		toISODate,
		today as getToday,
	} from './dateUtils.js'
	import type { DockedDatePickerProps, ISODate } from './types.js'

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
		label = 'Date',
		variant = 'outlined',
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
		shortcutLabels,
		...attributes
	}: DockedDatePickerProps = $props()

	const ISO_PATTERN = 'YYYY-MM-DD'

	let field = $state<DockedPickerField>()
	let panel = $state<MonthPanel>()
	let pending = $state<ISODate | undefined>(undefined)
	let monthBeforeOpen: ISODate | undefined

	let current = $derived<ISODate | undefined>(
		typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : undefined,
	)

	let todayValue = $derived(getToday())
	let minDate = $derived(parseISODate(min))
	let maxDate = $derived(parseISODate(max))
	let committed = $derived(parseISODate(current))
	let pendingDate = $derived(open ? parseISODate(pending) : committed)
	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})

	let localeKnown = $derived(locale !== undefined || mounted)
	let monthDate = $derived(
		parseISODate(displayMonth) ?? startOfMonth(pendingDate ?? committed ?? todayValue),
	)

	const setMonth = (date: Date) => {
		displayMonth = toISODate(startOfMonth(date))
	}

	const usableDate = (text: string) => {
		const parsed = parseDateInput(text, locale)
		if (!parsed || !isWithin(parsed, minDate, maxDate)) return undefined
		return (isDateEnabled?.(parsed) ?? true) ? toISODate(parsed) : undefined
	}

	export const show = () => field?.show()
	export const close = () => field?.close()
</script>

<DockedPickerField
	{...attributes}
	bind:this={field}
	kind="date-picker"
	bind:value
	bind:open
	bind:element
	{current}
	resetValue={typeof defaultValue === 'string' ? defaultValue : undefined}
	{label}
	{variant}
	{autocomplete}
	pattern={localeKnown ? getDatePattern(locale) : ISO_PATTERN}
	openLabel={openCalendarLabel}
	invalidMessage={invalidDateMessage}
	format={() =>
		committed ? (localeKnown ? formatDate(committed, locale) : toISODate(committed)) : ''}
	parse={usableDate}
	ontyped={(date) => setMonth(parseISODate(date)!)}
	onrestore={() => (pending = undefined)}
	onmenukeydown={(event) => panel?.handleKeydown(event)}
	onopen={async () => {
		monthBeforeOpen = displayMonth
		pending = current
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
	<div class="np-docked-date-picker-container">
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
			onselect={(date) => {
				pending = toISODate(date)
				setMonth(date)
			}}
			onconfirm={(date) => field?.confirm(toISODate(date))}
		/>

		<div class="np-docked-date-picker-actions">
			<Button type="button" variant="text" onclick={() => field?.closePicker()}
				>{cancelLabel}</Button
			>
			<Button type="button" variant="text" onclick={() => field?.confirm(pending)}
				>{confirmLabel}</Button
			>
		</div>
	</div>
</DockedPickerField>

<style>
	.np-docked-date-picker-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: var(--np-docked-date-picker-container-width, 22.5rem);
		max-width: 100%;
		padding-top: 1.25rem;
		color: var(--np-color-on-surface);
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
</style>
