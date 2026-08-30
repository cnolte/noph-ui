<script lang="ts">
	import DockedTimePicker from './DockedTimePicker.svelte'
	import type { DockedTimePickerProps } from './types.ts'

	let { value = $bindable(), ...rest }: DockedTimePickerProps = $props()

	let submitted = $state('')
	let issues = $state<{ message: string }[]>([])

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const next = data.get('pickupTime')
		issues = next ? [] : [{ message: 'Pick a pickup time.' }]
		submitted = next ? `Submitted pickupTime=${next}` : ''
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedTimePicker bind:value name="pickupTime" {issues} {...rest} />
	<button type="submit">Submit</button>
	<button type="reset">Reset</button>
</form>

<output data-testid="submitted">{submitted}</output>
