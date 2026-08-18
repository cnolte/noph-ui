<script lang="ts">
	import DockedDateTimePicker from './DockedDateTimePicker.svelte'
	import type { DockedDateTimePickerProps } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		displayMonth = $bindable(),
		...rest
	}: DockedDateTimePickerProps = $props()
</script>

<DockedDateTimePicker bind:value bind:open bind:displayMonth {...rest} />

<button type="button" onclick={() => (open = true)}>Open the calendar</button>

<output data-testid="bound-value">{value ?? 'undefined'}</output>
<output data-testid="bound-open">{open}</output>
<output data-testid="bound-month">{displayMonth ?? 'undefined'}</output>
