<script lang="ts">
	import { Button, DockedDatePicker } from '#lib/index.js'

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`

	let formValue = $state<string | undefined>()
	let formIssues = $state<{ message: string }[]>([])
	let submitted = $state('')

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const value = data.get('deliveryDate')
		formIssues = value ? [] : [{ message: 'Pick a delivery date.' }]
		submitted = value ? `Submitted deliveryDate=${value}` : ''
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedDatePicker
		bind:value={formValue}
		label="Delivery date"
		name="deliveryDate"
		issues={formIssues}
		min={isoToday}
		required
	/>
	<Button type="submit" variant="filled">Submit</Button>
</form>
<p>{submitted || 'Nothing submitted yet.'}</p>

<style>
	form {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
