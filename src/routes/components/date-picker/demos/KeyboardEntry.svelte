<script lang="ts">
	import { Button, DatePickerDialog } from '#lib/index.js'

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`

	let entryOpen = $state(false)
	let entryValue = $state<string | undefined>()
	let submitted = $state('')
</script>

<Button variant="filled" onclick={() => (entryOpen = true)}>Choose arrival</Button>
<DatePickerDialog
	bind:open={entryOpen}
	bind:value={entryValue}
	title="Arrival date"
	modeToggle
	min={isoToday}
	onconfirm={(next) => (submitted = next ? `Arriving ${next}` : '')}
/>
{#if submitted}
	<p>{submitted}</p>
{/if}
