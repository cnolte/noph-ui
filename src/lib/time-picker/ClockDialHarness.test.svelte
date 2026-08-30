<script lang="ts">
	import ClockDial from './ClockDial.svelte'
	import type { ClockDialProps, TimeSelection } from './types.ts'

	let {
		value = $bindable(0),
		selection = $bindable<TimeSelection>('hour'),
		...rest
	}: ClockDialProps = $props()

	let ends = $state(0)
	let lastSource = $state('none')
</script>

<ClockDial
	{...rest}
	{value}
	{selection}
	onselect={(next) => (value = next)}
	onselectionend={(source) => {
		ends += 1
		lastSource = source
	}}
/>

<output data-testid="bound-value">{value}</output>
<output data-testid="ends">{ends}</output>
<output data-testid="last-source">{lastSource}</output>
