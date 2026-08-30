<script lang="ts">
	import DockedTimePicker from './DockedTimePicker.svelte'
	import type { DockedTimePickerProps, TimePickerMode } from './types.ts'

	let {
		value = $bindable(),
		open = $bindable(false),
		mode = $bindable<TimePickerMode>('dial'),
		...rest
	}: DockedTimePickerProps = $props()
</script>

<DockedTimePicker bind:value bind:open bind:mode {...rest} />

<button type="button" onclick={() => (open = true)}>Open the picker</button>

<output data-testid="bound-value">{value ?? 'undefined'}</output>
<output data-testid="bound-open">{open}</output>
