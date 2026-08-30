<script lang="ts">
	import { Button, DockedTimePicker } from '#lib/index.js'

	let value = $state<string | undefined>()
	let issues = $state<{ message: string }[]>([])
	let submitted = $state('')

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const next = data.get('pickupTime')
		issues = next ? [] : [{ message: 'Pick a pickup time.' }]
		submitted = next ? `pickupTime=${next}` : ''
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedTimePicker bind:value name="pickupTime" {issues} required label="Pickup time" />
	<Button type="submit" variant="filled">Submit</Button>
</form>

{#if submitted}
	<p>Submitted <code>{submitted}</code></p>
{/if}

<style>
	form {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}
</style>
