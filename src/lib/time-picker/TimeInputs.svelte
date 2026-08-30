<script lang="ts">
	import { HOURS_IN_DAY, MINUTES_IN_HOUR } from '#lib/date-picker/timeUtils.js'
	import { customValidity } from '#lib/validity.js'
	import type { TimeInputsProps } from './types.ts'

	let {
		value,
		hour12,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out of the rest props on purpose
		locale,
		disabled = false,
		hourLabel,
		minuteLabel,
		invalidTimeMessage,
		onselect,
		...attributes
	}: TimeInputsProps = $props()

	let minuteElement = $state<HTMLInputElement>()

	// What the user has typed, while they are typing it. The fields fall back to the value otherwise,
	// so an entry that is not yet a time (an empty field, a lone "1") is not thrown away mid-keystroke.
	let hourTyped = $state<string | undefined>()
	let minuteTyped = $state<string | undefined>()

	// These two fields are typed into digit by digit, so they stay on ASCII digits rather than the
	// locale's own numerals, which would not round trip through a number keyboard.
	const pad = (input: number) => `${input}`.padStart(2, '0')

	let hour = $derived(Math.floor(value / MINUTES_IN_HOUR))
	let minute = $derived(value % MINUTES_IN_HOUR)
	let isPm = $derived(hour >= 12)
	let hourText = $derived(hourTyped ?? pad(hour12 ? hour % 12 || 12 : hour))
	let minuteText = $derived(minuteTyped ?? pad(minute))

	const readHour = (text: string) => {
		if (!/^\d{1,2}$/.test(text)) return undefined
		const entered = Number(text)
		if (hour12) {
			if (entered < 1 || entered > 12) return undefined
			return (entered % 12) + (isPm ? 12 : 0)
		}
		return entered < HOURS_IN_DAY ? entered : undefined
	}

	const readMinute = (text: string) => {
		if (!/^\d{1,2}$/.test(text)) return undefined
		const entered = Number(text)
		return entered < MINUTES_IN_HOUR ? entered : undefined
	}

	let hourInvalid = $derived(hourTyped !== undefined && readHour(hourTyped) === undefined)
	let minuteInvalid = $derived(minuteTyped !== undefined && readMinute(minuteTyped) === undefined)

	const digits = (event: Event) => (event.currentTarget as HTMLInputElement).value.slice(0, 2)

	const handleHourInput = (event: Event) => {
		const text = digits(event)
		hourTyped = text
		const entered = readHour(text)
		if (entered === undefined) return
		onselect?.(entered * MINUTES_IN_HOUR + minute)
		// Two digits is a whole hour, so move on the way a time field is expected to.
		if (text.length === 2) minuteElement?.focus()
	}

	const handleMinuteInput = (event: Event) => {
		const text = digits(event)
		minuteTyped = text
		const entered = readMinute(text)
		if (entered === undefined) return
		onselect?.(hour * MINUTES_IN_HOUR + entered)
	}
</script>

<div {...attributes} class={['np-time-inputs', attributes.class]}>
	<div class="np-time-input-field">
		<div class={['np-time-input', hourInvalid && 'np-invalid']}>
			<input
				{@attach customValidity(hourInvalid ? invalidTimeMessage : '')}
				type="text"
				inputmode="numeric"
				autocomplete="off"
				maxlength="2"
				{disabled}
				aria-label={hourLabel}
				aria-invalid={hourInvalid ? 'true' : undefined}
				value={hourText}
				oninput={handleHourInput}
				onfocus={(event) => event.currentTarget.select()}
				onblur={() => (hourTyped = undefined)}
			/>
		</div>
		<div class="np-time-input-support">{hourLabel}</div>
	</div>

	<div class="np-time-inputs-separator" aria-hidden="true">:</div>

	<div class="np-time-input-field">
		<div class={['np-time-input', minuteInvalid && 'np-invalid']}>
			<input
				bind:this={minuteElement}
				{@attach customValidity(minuteInvalid ? invalidTimeMessage : '')}
				type="text"
				inputmode="numeric"
				autocomplete="off"
				maxlength="2"
				{disabled}
				aria-label={minuteLabel}
				aria-invalid={minuteInvalid ? 'true' : undefined}
				value={minuteText}
				oninput={handleMinuteInput}
				onfocus={(event) => event.currentTarget.select()}
				onblur={() => (minuteTyped = undefined)}
			/>
		</div>
		<div class="np-time-input-support">{minuteLabel}</div>
	</div>
</div>

<style>
	.np-time-inputs {
		display: flex;
		align-items: flex-start;
	}

	.np-time-inputs-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 3rem;
		height: 4.5rem;
		flex: none;
		font-size: 3.5rem;
		line-height: 4rem;
		color: var(--np-time-picker-time-selector-separator-color, var(--np-color-on-surface));
	}

	.np-time-input-field {
		display: flex;
		flex-direction: column;
		flex: none;
	}

	.np-time-input {
		box-sizing: border-box;
		width: var(--np-time-picker-time-selector-container-width, 6rem);
		height: 4.5rem;
		overflow: hidden;
		border: 1px solid transparent;
		border-radius: var(
			--np-time-picker-time-selector-container-shape,
			var(--np-shape-corner-small)
		);
		background-color: var(
			--np-time-picker-time-selector-unselected-container-color,
			var(--np-color-surface-container-highest)
		);
	}

	.np-time-input:focus-within {
		border-color: var(--np-color-primary);
		background-color: var(
			--np-time-picker-time-selector-selected-container-color,
			var(--np-color-primary-container)
		);
	}

	.np-time-input.np-invalid {
		border-color: var(--np-color-error);
	}

	.np-time-input input {
		font: inherit;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		outline: none;
		text-align: center;
		background: none;
		font-size: 3.5rem;
		line-height: 4rem;
		font-variant-numeric: tabular-nums;
		caret-color: var(--np-color-primary);
		color: var(--np-time-picker-time-selector-unselected-label-color, var(--np-color-on-surface));
	}

	.np-time-input:focus-within input {
		color: var(
			--np-time-picker-time-selector-selected-label-color,
			var(--np-color-on-primary-container)
		);
	}

	.np-time-input input:disabled {
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-time-input-support {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--np-color-on-surface-variant);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-time-input,
		.np-time-input input {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				border-color var(--np-motion-expressive-fast-effects),
				color var(--np-motion-expressive-default-effects);
		}
	}

	@media (forced-colors: active) {
		.np-time-input {
			border-color: CanvasText;
		}

		.np-time-input:focus-within {
			border-color: Highlight;
		}

		.np-time-input input:disabled {
			color: GrayText;
		}
	}
</style>
