<script lang="ts">
	import { afterTwoFrames, morphSize } from '#lib/animation.js'
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
	import { flushSync, onMount, tick } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'
	import TimePickerPanel from './TimePickerPanel.svelte'
	import { timePickerState } from './timePickerState.svelte.js'
	import type { ISOTime, TimePickerDialogProps, TimePickerMode } from './types.js'

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
		dialModeLabel = 'Toggle dial picker',
		inputModeLabel = 'Toggle input picker',
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

	let dialog = $state<Dialog>()
	// Any way of closing other than the confirm action cancels.
	let confirming = false

	export const show = () => dialog?.show()
	export const close = () => dialog?.close()

	const focusFirst = async () => {
		await tick()
		if (mode === 'input') {
			element?.querySelector<HTMLInputElement>('.np-time-input input')?.focus()
			return
		}
		element?.querySelector<HTMLElement>('.np-clock-dial-option[tabindex="0"]')?.focus()
	}

	// The dial comes in on a switch to it, not when the picker opens on it.
	let entering = $state(false)
	let cancelEntering: (() => void) | undefined

	const setMode = async (next: TimePickerMode) => {
		if (mode === next) return
		cancelEntering?.()
		morphSize(
			element?.querySelector<HTMLElement>('.np-time-picker') ?? undefined,
			() =>
				flushSync(() => {
					mode = next
					entering = next === 'dial'
				}),
			'--np-motion-expressive-default-spatial',
		)
		cancelEntering = afterTwoFrames(() => (entering = false))
		await focusFirst()
	}

	const confirm = () => {
		const next: ISOTime = toISOTime(pending.minutes)
		confirming = true
		value = next
		onconfirm?.(next)
		close()
	}
</script>

<Dialog
	role="dialog"
	{...attributes}
	bind:this={dialog}
	bind:element
	bind:open
	aria-labelledby="{uid}-headline"
	class={['np-time-picker-dialog', attributes.class]}
	--np-dialog-container-width="fit-content"
	--np-dialog-container-min-width="0"
	--np-dialog-elevation="none"
	ontoggle={(event) => {
		if (event.newState === 'open') {
			confirming = false
			exit.show()
			pending.reset(committed ?? minutesOfDay(new Date()))
			focusFirst()
		} else {
			if (!confirming) oncancel?.()
			exit.scheduleExit(element)
		}
		ontoggle?.(event)
	}}
>
	{#if open || exit.visible}
		<TimePickerPanel
			state={pending}
			{mode}
			{entering}
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
			<Button type="button" variant="text" onclick={close}>{cancelLabel}</Button>
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
