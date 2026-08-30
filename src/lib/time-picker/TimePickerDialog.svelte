<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import { exitVisibility } from '#lib/date-picker/exitVisibility.svelte.js'
	import {
		minutesOfDay,
		parseISOTime,
		toISOTime,
		uses12HourClock,
	} from '#lib/date-picker/timeUtils.js'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import KeyboardIcon from '#lib/icons/KeyboardIcon.svelte'
	import ScheduleIcon from '#lib/icons/ScheduleIcon.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import { onMount, tick } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'
	import TimePickerPanel from './TimePickerPanel.svelte'
	import { timePickerState } from './timePickerState.svelte.js'
	import type { ISOTime, TimePickerDialogProps, TimePickerMode } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		element = $bindable(),
		mode = $bindable('dial'),
		layout = 'auto',
		modeToggle = true,
		min,
		max,
		minuteStep = 1,
		hour12,
		locale,
		isTimeEnabled,
		title = 'Select time',
		inputTitle = 'Enter time',
		name,
		form,
		issues,
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
		dialModeLabel = 'Switch to dial mode',
		inputModeLabel = 'Switch to text input mode',
		invalidTimeMessage = 'Enter a valid time.',
		onchange,
		onconfirm,
		oncancel,
		ontoggle,
		...attributes
	}: TimePickerDialogProps = $props()

	const uid = $props.id()

	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})

	const exit = exitVisibility()

	// The dial only fits above the fold in a tall window, so a short landscape one gets the wide layout.
	const landscape = new MediaQuery('(orientation: landscape) and (max-height: 30rem)', false)

	let localeKnown = $derived(locale !== undefined || mounted)
	let clock12 = $derived(hour12 ?? (localeKnown ? uses12HourClock(locale) : false))

	let resolvedLayout = $derived(
		layout === 'auto' ? (landscape.current ? 'horizontal' : 'vertical') : layout,
	)
	let horizontal = $derived(resolvedLayout === 'horizontal')

	let minMinutes = $derived(parseISOTime(min))
	let maxMinutes = $derived(parseISOTime(max))

	const pending = timePickerState({
		minuteStep: () => minuteStep,
		min: () => minMinutes,
		max: () => maxMinutes,
		isTimeEnabled: () => isTimeEnabled,
	})

	let committed = $derived(parseISOTime(value))
	let headline = $derived(mode === 'input' ? inputTitle : title)

	export const show = () => {
		if (element && !element.open) element.showModal()
	}

	export const close = () => {
		element?.close()
	}

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)

	const focusFirst = async () => {
		await tick()
		if (mode === 'input') {
			element?.querySelector<HTMLInputElement>('.np-time-input input')?.focus()
			return
		}
		element?.querySelector<HTMLElement>('.np-clock-dial-option[tabindex="0"]')?.focus()
	}

	const setMode = async (next: TimePickerMode) => {
		if (mode === next) return
		mode = next
		await focusFirst()
	}

	const confirm = () => {
		const next: ISOTime = toISOTime(pending.minutes)
		value = next
		onconfirm?.(next)
		close()
	}

	const cancel = () => {
		oncancel?.()
		close()
	}
</script>

<Dialog
	{...attributes}
	bind:element
	bind:open
	aria-labelledby="{uid}-headline"
	class={['np-time-picker-dialog', attributes.class]}
	--np-dialog-container-width="fit-content"
	--np-dialog-container-min-width="0"
	ontoggle={(event) => {
		if (event.newState === 'open') {
			exit.show()
			pending.reset(committed ?? minutesOfDay(new Date()))
			focusFirst()
		}
		if (event.newState === 'closed') {
			exit.scheduleExit(element)
		}
		ontoggle?.(event)
	}}
>
	{#if open || exit.visible}
		<TimePickerPanel
			state={pending}
			{mode}
			{horizontal}
			hour12={clock12}
			{minuteStep}
			min={minMinutes}
			max={maxMinutes}
			{locale}
			{isTimeEnabled}
			{headline}
			headlineId="{uid}-headline"
			{issues}
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
			onchange={() => onchange?.(toISOTime(pending.minutes))}
		/>
	{/if}

	{#snippet actions()}
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
		<div class="np-time-picker-confirm">
			<Button type="button" variant="text" onclick={cancel}>{cancelLabel}</Button>
			<Button type="button" variant="text" disabled={!pending.usable} onclick={confirm}>
				{confirmLabel}
			</Button>
		</div>
	{/snippet}
</Dialog>

<input
	class="np-time-picker-value"
	type="hidden"
	value={committed === undefined ? '' : toISOTime(committed)}
	{name}
	{form}
/>

<style>
	:global(.np-time-picker-dialog .np-dialog-actions) {
		justify-content: space-between;
		align-items: center;
	}

	.np-time-picker-confirm {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
