<script lang="ts">
	// A picker inside a form that validates itself, so the component tests can check what a submit
	// does without a documentation page around it.
	import DockedDatePicker from './DockedDatePicker.svelte'
	import type { DockedDatePickerProps } from './types.ts'

	let { value = $bindable(), ...rest }: DockedDatePickerProps = $props()

	let submitted = $state('')
	let issues = $state<{ message: string }[]>([])

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const next = data.get('deliveryDate')
		issues = next ? [] : [{ message: 'Pick a delivery date.' }]
		submitted = next ? `Submitted deliveryDate=${next}` : ''
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedDatePicker bind:value name="deliveryDate" {issues} {...rest} />
	<button type="submit">Submit</button>
</form>

<output data-testid="submitted">{submitted}</output>
