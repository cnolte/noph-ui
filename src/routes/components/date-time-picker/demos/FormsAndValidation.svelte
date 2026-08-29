<script lang="ts">
	import { Button, DockedDateTimePicker } from '#lib/index.js'

	let formValue = $state<string | undefined>()
	let formIssues = $state<{ message: string }[]>([])
	let submitted = $state('')

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const value = data.get('startsAt')
		formIssues = value ? [] : [{ message: 'Pick a start time.' }]
		submitted = value ? `Submitted startsAt=${value}` : ''
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedDateTimePicker
		bind:value={formValue}
		label="Starts at"
		name="startsAt"
		issues={formIssues}
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
