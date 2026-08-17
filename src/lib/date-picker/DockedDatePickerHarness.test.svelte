<script lang="ts">
	// Wraps the picker so a component test can bind to it and read the bound state back out of the
	// DOM, the way the documentation page does.
	import DockedDatePicker from './DockedDatePicker.svelte'
	import type { DockedDatePickerProps } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		displayMonth = $bindable(),
		...rest
	}: DockedDatePickerProps = $props()
</script>

<DockedDatePicker bind:value bind:open bind:displayMonth {...rest} />

<button type="button" onclick={() => (open = true)}>Open the calendar</button>

<output data-testid="bound-value">{value ?? 'undefined'}</output>
<output data-testid="bound-open">{open}</output>
<output data-testid="bound-month">{displayMonth ?? 'undefined'}</output>
