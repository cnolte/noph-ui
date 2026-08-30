<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
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
	import { formReset } from '#lib/form-reset.js'
	import KeyboardIcon from '#lib/icons/KeyboardIcon.svelte'
	import ScheduleIcon from '#lib/icons/ScheduleIcon.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import TextField from '#lib/text-field/TextField.svelte'
	import { onMount, tick } from 'svelte'
	import TimePickerPanel from './TimePickerPanel.svelte'
	import { timePickerState } from './timePickerState.svelte.js'
	import type { DockedTimePickerProps, ISOTime, TimePickerMode } from './types.ts'

	let {
		value = $bindable(),
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out of the rest props on purpose
		type,
		'aria-invalid': ariaInvalid,
		style,
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
		openPickerLabel = 'Show time picker',
		invalidTimeMessage = 'Enter a valid time.',
		onchange,
		oninput,
		onblur,
		...attributes
	}: DockedTimePickerProps = $props()

	const ISO_PATTERN = 'HH:mm'

	const uid = $props.id()

	let menuElement = $state<HTMLDivElement>()
	let inputElement = $state<HTMLInputElement | HTMLTextAreaElement>()
	let valueInput = $state<HTMLInputElement>()
	let mounted = $state(false)

	let typed = $state.raw<{ source: ISOTime | undefined; text: string } | undefined>()
	let invalidText = $state<string | undefined>()

	onMount(() => {
		mounted = true
	})

	let localeKnown = $derived(locale !== undefined || mounted)
	let clock12 = $derived(hour12 ?? (localeKnown ? uses12HourClock(locale) : false))
	let pattern = $derived(localeKnown ? getTimePattern(locale, clock12) : ISO_PATTERN)

	let minMinutes = $derived(parseISOTime(min))
	let maxMinutes = $derived(parseISOTime(max))

	let committed = $derived(parseISOTime(value ?? defaultValue))
	let current = $derived<ISOTime | undefined>(
		committed === undefined ? undefined : toISOTime(committed),
	)

	const pending = timePickerState({
		minuteStep: () => minuteStep,
		min: () => minMinutes,
		max: () => maxMinutes,
		isTimeEnabled: () => isTimeEnabled,
	})

	const formatValue = () => {
		if (committed === undefined) return ''
		return localeKnown ? formatMinutes(committed, locale, clock12) : toISOTime(committed)
	}

	let text = $derived(typed && typed.source === current ? typed.text : formatValue())
	let inputInvalid = $derived(invalidText !== undefined && invalidText === text)

	const usableTime = (entry: string) => {
		const parsed = parseTimeInput(entry, locale, clock12)
		if (parsed === undefined) return undefined
		if (!isMinuteWithin(parsed, minMinutes, maxMinutes)) return undefined
		return (isTimeEnabled?.(parsed) ?? true) ? parsed : undefined
	}

	const commit = (next: ISOTime | undefined) => {
		if (current === next) return
		value = next
		onchange?.(next)
	}

	const restoreDefault = () => {
		const fallback = parseISOTime(defaultValue)
		const next = fallback === undefined ? undefined : toISOTime(fallback)
		if (valueInput) valueInput.value = next ?? ''
		queueMicrotask(() => {
			typed = undefined
			invalidText = undefined
			value = next
		})
	}

	const isShowing = () => !!menuElement?.matches(':popover-open')

	const openPicker = () => {
		if (isShowing()) return
		if (disabled || readonly) {
			open = false
			return
		}
		menuElement?.showPopover()
	}

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

	const focusPanel = async () => {
		await tick()
		if (mode === 'input') {
			menuElement?.querySelector<HTMLInputElement>('.np-time-input input')?.focus()
			return
		}
		menuElement?.querySelector<HTMLElement>('.np-clock-dial-option[tabindex="0"]')?.focus()
	}

	const closePicker = (restoreFocus = true) => {
		menuElement?.hidePopover()
		if (restoreFocus) element?.querySelector<HTMLElement>('input')?.focus()
	}

	const setMode = async (next: TimePickerMode) => {
		if (mode === next) return
		mode = next
		await focusPanel()
	}

	const confirm = () => {
		typed = undefined
		invalidText = undefined
		commit(toISOTime(pending.minutes))
		closePicker()
	}

	const handleInput = (event: Event) => {
		const next = (event.currentTarget as HTMLInputElement).value
		const parsed = usableTime(next)
		commit(parsed === undefined ? undefined : toISOTime(parsed))
		typed = { source: current, text: next }
		invalidText = undefined
	}

	const handleBlur = () => {
		if (!text.trim()) {
			invalidText = undefined
			return
		}
		const parsed = usableTime(text)
		invalidText = parsed === undefined ? text : undefined
		if (parsed !== undefined) typed = undefined
	}

	$effect(() => {
		const input = inputElement
		if (!input) return
		const unusable = text.trim() !== '' && usableTime(text) === undefined
		input.setCustomValidity(unusable ? invalidTimeMessage : '')
	})
</script>

<TextField
	{...attributes}
	class={['np-docked-time-picker', attributes.class]}
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
			aria-label={openPickerLabel}
			aria-expanded={open}
			aria-haspopup="dialog"
			aria-controls={open ? `${uid}-picker` : undefined}
			{disabled}
			onclick={() => {
				if (open) closePicker()
				else openPicker()
			}}
		>
			<ScheduleIcon />
		</IconButton>
	{/snippet}
</TextField>
<input
	bind:this={valueInput}
	{@attach formReset(restoreDefault)}
	class="np-docked-time-picker-value"
	type="hidden"
	value={current ?? ''}
	{name}
	{form}
	{disabled}
/>

<Menu
	id="{uid}-picker"
	role="dialog"
	aria-label={label}
	aria-modal="false"
	class="np-docked-time-picker-menu"
	style={`position-anchor:--${uid};`}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-over-anchor-position-area="span-all span-right"
	--np-menu-margin="0"
	--np-menu-container-color="var(--np-docked-time-picker-container-color, var(--np-color-surface-container-high))"
	--np-menu-container-shape="var(--np-docked-time-picker-container-shape, var(--np-shape-corner-large))"
	anchor={element}
	bind:element={menuElement}
	bind:open
	ontoggle={({ newState }) => {
		if (newState === 'open') {
			pending.reset(committed ?? minutesOfDay(new Date()))
			focusPanel()
		}
	}}
>
	{#if open}
		<div class="np-docked-time-picker-container">
			<TimePickerPanel
				state={pending}
				{mode}
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
					<Button type="button" variant="text" onclick={() => closePicker()}>{cancelLabel}</Button>
					<Button type="button" variant="text" disabled={!pending.usable} onclick={confirm}>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</div>
	{/if}
</Menu>

<style>
	:global(.np-docked-time-picker-menu .np-menu) {
		padding: 0;
	}

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
