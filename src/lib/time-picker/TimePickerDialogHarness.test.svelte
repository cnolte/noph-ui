<script lang="ts">
	import TimePickerDialog from './TimePickerDialog.svelte'
	import type { TimePickerDialogProps, TimePickerMode } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		mode = $bindable<TimePickerMode>('dial'),
		...rest
	}: TimePickerDialogProps = $props()

	let changes = $state(0)
	let confirms = $state(0)
	let cancels = $state(0)
	let lastChange = $state('none')
</script>

<TimePickerDialog
	bind:value
	bind:open
	bind:mode
	{...rest}
	onchange={(next) => {
		changes += 1
		lastChange = next ?? 'undefined'
	}}
	onconfirm={() => (confirms += 1)}
	oncancel={() => (cancels += 1)}
/>

<button type="button" onclick={() => (open = true)}>Open the picker</button>

<output data-testid="bound-value">{value ?? 'undefined'}</output>
<output data-testid="bound-open">{open}</output>
<output data-testid="bound-mode">{mode}</output>
<output data-testid="changes">{changes}</output>
<output data-testid="confirms">{confirms}</output>
<output data-testid="cancels">{cancels}</output>
<output data-testid="last-change">{lastChange}</output>
