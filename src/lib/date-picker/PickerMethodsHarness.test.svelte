<script lang="ts">
	// Wraps each picker behind buttons that reach it through `show()` and `close()` rather than
	// through `open`, which is how a page drives a picker that has no trigger to point at.
	import DatePickerDialog from './DatePickerDialog.svelte'
	import DateRangePicker from './DateRangePicker.svelte'
	import DockedDatePicker from './DockedDatePicker.svelte'
	import DockedDateTimePicker from './DockedDateTimePicker.svelte'

	type Which = 'dialog' | 'range' | 'docked' | 'dockedTime'

	let {
		which,
		open = $bindable(false),
		disabled = false,
	}: { which: Which; open?: boolean; disabled?: boolean } = $props()

	let picker = $state<{ show: () => void; close: () => void }>()
</script>

<button type="button" data-testid="show" onclick={() => picker?.show()}>Show</button>
<button type="button" data-testid="close" onclick={() => picker?.close()}>Close</button>

{#if which === 'dialog'}
	<DatePickerDialog bind:this={picker} bind:open />
{:else if which === 'range'}
	<DateRangePicker bind:this={picker} bind:open />
{:else if which === 'docked'}
	<DockedDatePicker bind:this={picker} bind:open {disabled} label="Date" />
{:else}
	<DockedDateTimePicker bind:this={picker} bind:open {disabled} label="When" />
{/if}

<output data-testid="bound-open">{open}</output>
