<script lang="ts">
	import DatePickerDialog from './DatePickerDialog.svelte'
	import DateRangePicker from './DateRangePicker.svelte'
	import DockedDatePicker from './DockedDatePicker.svelte'
	import DockedDateTimePicker from './DockedDateTimePicker.svelte'
	import DockedTimePicker from '#lib/time-picker/DockedTimePicker.svelte'
	import TimePickerDialog from '#lib/time-picker/TimePickerDialog.svelte'

	type Which = 'dialog' | 'range' | 'docked' | 'dockedTime' | 'timeDialog' | 'dockedTimeOnly'

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
{:else if which === 'timeDialog'}
	<TimePickerDialog bind:this={picker} bind:open />
{:else if which === 'dockedTimeOnly'}
	<DockedTimePicker bind:this={picker} bind:open {disabled} label="Time" />
{:else}
	<DockedDateTimePicker bind:this={picker} bind:open {disabled} label="When" />
{/if}

<output data-testid="bound-open">{open}</output>
