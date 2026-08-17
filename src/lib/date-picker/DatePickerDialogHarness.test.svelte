<script lang="ts">
	// Wraps the modal picker so a component test can open it the way a page does and read the bound
	// state back out of the DOM.
	import DatePickerDialog from './DatePickerDialog.svelte'
	import type { DatePickerDialogProps } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		displayMonth = $bindable(),
		...rest
	}: DatePickerDialogProps = $props()
</script>

<button type="button" onclick={() => (open = true)}>Open the dialog</button>

<DatePickerDialog bind:value bind:open bind:displayMonth {...rest} />

<output data-testid="bound-value">{value ?? 'undefined'}</output>
<output data-testid="bound-open">{open}</output>
