<script lang="ts">
	import { getDayPeriodLabels } from '#lib/date-picker/timeUtils.js'
	import ClockDial from './ClockDial.svelte'
	import PeriodSelector from './PeriodSelector.svelte'
	import TimeInputs from './TimeInputs.svelte'
	import TimeSelectors from './TimeSelectors.svelte'
	import type { TimePickerPanelProps } from './types.ts'

	let {
		state,
		mode,
		horizontal = false,
		hour12,
		minuteStep = 1,
		min,
		max,
		locale,
		isTimeEnabled,
		headline,
		headlineId,
		disabled = false,
		invalidTimeMessage,
		issues,
		hourLabel = 'Hour',
		minuteLabel = 'Minute',
		dayPeriodLabel = 'AM or PM',
		amLabel,
		pmLabel,
		selectHourLabel = 'Select hour',
		selectMinuteLabel = 'Select minute',
		hourOptionLabel,
		minuteOptionLabel,
		onchange,
		...attributes
	}: TimePickerPanelProps = $props()

	let periods = $derived(getDayPeriodLabels(locale))
	let am = $derived(amLabel ?? periods[0])
	let pm = $derived(pmLabel ?? periods[1])

	// A 24-hour dial has no period selector, so its fields take the room that frees up.
	let fieldWidth = $derived(!hour12 && !horizontal ? '7.125rem' : '6rem')

	// Bounds can put a whole half of the day out of reach, and then that half cannot be chosen.
	let amReachable = $derived([...Array(12).keys()].some((hour) => state.hourReachable(hour)))
	let pmReachable = $derived([...Array(12).keys()].some((hour) => state.hourReachable(hour + 12)))

	const select = (minutes: number) => {
		state.set(minutes)
		onchange?.()
	}
</script>

<div
	{...attributes}
	class={['np-time-picker', horizontal && 'np-horizontal', attributes.class]}
	style="--np-time-picker-time-selector-container-width: {fieldWidth}"
>
	{#if headline}
		<div id={headlineId} class="np-time-picker-headline">{headline}</div>
	{/if}

	<div class="np-time-picker-body">
		<div class="np-time-picker-fields">
			{#if mode === 'input'}
				<TimeInputs
					value={state.minutes}
					{hour12}
					{locale}
					{disabled}
					{hourLabel}
					{minuteLabel}
					{invalidTimeMessage}
					onselect={select}
				/>
			{:else}
				<TimeSelectors
					value={state.minutes}
					selection={state.selection}
					{hour12}
					{locale}
					{disabled}
					{hourLabel}
					{minuteLabel}
					onselect={(next) => (state.selection = next)}
				/>
			{/if}

			{#if hour12}
				<PeriodSelector
					isPm={state.isPm}
					orientation={horizontal ? 'horizontal' : 'vertical'}
					{disabled}
					amDisabled={!amReachable}
					pmDisabled={!pmReachable}
					label={dayPeriodLabel}
					amLabel={am}
					pmLabel={pm}
					onselect={(isPm) => {
						state.setPm(isPm)
						onchange?.()
					}}
				/>
			{/if}
		</div>

		{#if mode === 'dial'}
			<ClockDial
				class="np-time-picker-dial"
				value={state.minutes}
				selection={state.selection}
				{hour12}
				{minuteStep}
				{min}
				{max}
				{locale}
				{disabled}
				{isTimeEnabled}
				{selectHourLabel}
				{selectMinuteLabel}
				{hourOptionLabel}
				{minuteOptionLabel}
				onselect={select}
				onselectionend={(source) => {
					// A pointer gesture on the hour ring moves on to the minute, the way the dial is meant
					// to flow. A keyboard user stays put so they can keep adjusting the hour.
					if (source === 'pointer' && state.selection === 'hour') state.selection = 'minute'
				}}
			/>
		{/if}
	</div>

	{#if issues?.length}
		<div class="np-time-picker-issues" role="alert">
			{#each issues as issue (issue.message)}
				<p>{issue.message}</p>
			{/each}
		</div>
	{/if}
</div>

<style>
	.np-time-picker {
		display: flex;
		flex-direction: column;
		color: var(--np-color-on-surface);
	}

	.np-time-picker-headline {
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 500;
		letter-spacing: 0.03125rem;
		color: var(--np-time-picker-headline-color, var(--np-color-on-surface-variant));
	}

	.np-time-picker-body {
		display: flex;
		flex-direction: column;
		/* 20dp under the headline, then 36dp between the fields and the dial. */
		margin-top: 1.25rem;
		gap: 2.25rem;
	}

	.np-time-picker-body:first-child {
		margin-top: 0;
	}

	.np-time-picker-fields {
		display: flex;
		align-items: flex-start;
		/* 12dp between the minute field and the vertical period selector. */
		gap: 0.75rem;
	}

	.np-time-picker :global(.np-time-picker-dial) {
		align-self: center;
	}

	.np-time-picker-issues {
		margin-top: 0.75rem;
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--np-color-error);
	}

	.np-time-picker-issues p {
		margin: 0;
	}

	/* The wide layout stacks the fields and the period selector beside the dial. */
	.np-time-picker.np-horizontal .np-time-picker-body {
		flex-direction: row;
		align-items: flex-start;
		gap: 3.25rem;
	}

	.np-time-picker.np-horizontal .np-time-picker-fields {
		flex-direction: column;
		/* 16dp under the time fields. */
		gap: 1rem;
	}
</style>
