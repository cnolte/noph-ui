<script lang="ts">
	import { afterTwoFrames, morphSize } from '#lib/animation.js'
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import DockedPickerField from '#lib/date-picker/DockedPickerField.svelte'
	import {
		formatMinutes,
		getTimePattern,
		isMinuteWithin,
		minutesOfDay,
		parseISOTime,
		parseTimeInput,
		toISOTime,
		uses12HourClock,
	} from '#lib/date-picker/timeUtils.js'
	import KeyboardIcon from '#lib/icons/KeyboardIcon.svelte'
	import ScheduleIcon from '#lib/icons/ScheduleIcon.svelte'
	import { flushSync, onMount, tick } from 'svelte'
	import TimePickerPanel from './TimePickerPanel.svelte'
	import { timePickerState } from './timePickerState.svelte.js'
	import type { DockedTimePickerProps, ISOTime, TimePickerMode } from './types.js'

	let {
		value = $bindable(),
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out of the rest props on purpose
		type,
		open = $bindable(false),
		element = $bindable(),
		mode = $bindable('dial'),
		modeToggle = true,
		min,
		max,
		minuteStep = 1,
		hour12,
		locale,
		isTimeEnabled,
		label = 'Time',
		variant = 'outlined',
		autocomplete = 'off',
		cancelLabel = 'Cancel',
		confirmLabel = 'OK',
		hourLabel = 'Hour',
		minuteLabel = 'Minute',
		dayPeriodLabel = 'AM or PM',
		amLabel,
		pmLabel,
		selectHourLabel = 'Select hour',
		selectMinuteLabel = 'Select minute',
		hourOptionLabel,
		minuteOptionLabel,
		dialModeLabel = 'Toggle dial picker',
		inputModeLabel = 'Toggle input picker',
		openPickerLabel = 'Show time picker',
		invalidTimeMessage = 'Enter a valid time.',
		...attributes
	}: DockedTimePickerProps = $props()

	const ISO_PATTERN = 'HH:mm'

	let field = $state<DockedPickerField>()
	let menuElement = $state<HTMLDivElement>()
	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})

	let localeKnown = $derived(locale !== undefined || mounted)
	let clock12 = $derived(hour12 ?? (localeKnown ? uses12HourClock(locale) : false))

	let minMinutes = $derived(parseISOTime(min))
	let maxMinutes = $derived(parseISOTime(max))

	let committed = $derived(parseISOTime(value ?? defaultValue))
	let current = $derived<ISOTime | undefined>(
		committed === undefined ? undefined : toISOTime(committed),
	)
	let fallback = $derived(parseISOTime(defaultValue))

	const pending = timePickerState({
		minuteStep: () => minuteStep,
		min: () => minMinutes,
		max: () => maxMinutes,
		isTimeEnabled: () => isTimeEnabled,
	})

	const usableTime = (entry: string) => {
		const parsed = parseTimeInput(entry, locale, clock12)
		if (parsed === undefined || !isMinuteWithin(parsed, minMinutes, maxMinutes)) return undefined
		return (isTimeEnabled?.(parsed) ?? true) ? toISOTime(parsed) : undefined
	}

	export const show = () => field?.show()
	export const close = () => field?.close()

	const focusPanel = async () => {
		await tick()
		if (mode === 'input') {
			menuElement?.querySelector<HTMLInputElement>('.np-time-input input')?.focus()
			return
		}
		menuElement?.querySelector<HTMLElement>('.np-clock-dial-option[tabindex="0"]')?.focus()
	}

	// The dial comes in on a switch to it, not when the picker opens on it.
	let entering = $state(false)
	let cancelEntering: (() => void) | undefined

	const setMode = async (next: TimePickerMode) => {
		if (mode === next) return
		cancelEntering?.()
		morphSize(
			menuElement?.querySelector<HTMLElement>('.np-time-picker') ?? undefined,
			() =>
				flushSync(() => {
					mode = next
					entering = next === 'dial'
				}),
			'--np-motion-expressive-default-spatial',
		)
		cancelEntering = afterTwoFrames(() => (entering = false))
		await focusPanel()
	}
</script>

<DockedPickerField
	{...attributes}
	bind:this={field}
	kind="time-picker"
	bind:value
	bind:open
	bind:element
	bind:menuElement
	{current}
	resetValue={fallback === undefined ? undefined : toISOTime(fallback)}
	{label}
	{variant}
	{autocomplete}
	pattern={localeKnown ? getTimePattern(locale, clock12) : ISO_PATTERN}
	openLabel={openPickerLabel}
	invalidMessage={invalidTimeMessage}
	format={() =>
		committed === undefined
			? ''
			: localeKnown
				? formatMinutes(committed, locale, clock12)
				: toISOTime(committed)}
	parse={usableTime}
	onopen={() => {
		pending.reset(committed ?? minutesOfDay(new Date()))
		focusPanel()
	}}
>
	{#snippet icon()}
		<ScheduleIcon />
	{/snippet}
	<div class="np-docked-time-picker-container">
		<TimePickerPanel
			state={pending}
			{mode}
			{entering}
			hour12={clock12}
			{minuteStep}
			min={minMinutes}
			max={maxMinutes}
			{locale}
			{isTimeEnabled}
			{invalidTimeMessage}
			{hourLabel}
			{minuteLabel}
			{dayPeriodLabel}
			{amLabel}
			{pmLabel}
			{selectHourLabel}
			{selectMinuteLabel}
			{hourOptionLabel}
			{minuteOptionLabel}
		/>

		<div class="np-docked-time-picker-actions">
			{#if modeToggle}
				<IconButton
					type="button"
					aria-label={mode === 'dial' ? inputModeLabel : dialModeLabel}
					onclick={() => setMode(mode === 'dial' ? 'input' : 'dial')}
				>
					{#if mode === 'dial'}
						<KeyboardIcon />
					{:else}
						<ScheduleIcon />
					{/if}
				</IconButton>
			{:else}
				<span></span>
			{/if}
			<div class="np-docked-time-picker-confirm">
				<Button type="button" variant="text" onclick={() => field?.closePicker()}
					>{cancelLabel}</Button
				>
				<Button
					type="button"
					variant="text"
					disabled={!pending.usable}
					onclick={() => field?.confirm(toISOTime(pending.minutes))}
				>
					{confirmLabel}
				</Button>
			</div>
		</div>
	</div>
</DockedPickerField>

<style>
	.np-docked-time-picker-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		max-width: 100%;
		padding: 1.5rem;
		color: var(--np-color-on-surface);
	}

	.np-docked-time-picker-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.np-docked-time-picker-confirm {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.np-docked-time-picker-actions .np-button) {
		height: 2.25rem;
	}
</style>
