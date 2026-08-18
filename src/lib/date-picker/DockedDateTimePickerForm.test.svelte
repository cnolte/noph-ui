<script lang="ts">
	import DockedDateTimePicker from './DockedDateTimePicker.svelte'
	import type { DockedDateTimePickerProps } from './types.ts'

	let { value = $bindable(), ...rest }: DockedDateTimePickerProps = $props()

	let submitted = $state('')

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		submitted = `Submitted startsAt=${data.get('startsAt')}`
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<DockedDateTimePicker bind:value name="startsAt" {...rest} />
	<button type="submit">Submit</button>
</form>

<output data-testid="submitted">{submitted}</output>
