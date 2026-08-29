<script lang="ts">
	import DateRangePicker from './DateRangePicker.svelte'
	import type { DateRangePickerProps } from './types.ts'

	let { value = $bindable({}), open = $bindable(false), ...rest }: DateRangePickerProps = $props()
</script>

<button type="button" onclick={() => (open = true)}>Open the range picker</button>

<DateRangePicker bind:value bind:open {...rest} />

<output data-testid="bound-value">{value.start ?? 'undefined'} to {value.end ?? 'undefined'}</output
>
<output data-testid="bound-open">{open}</output>
