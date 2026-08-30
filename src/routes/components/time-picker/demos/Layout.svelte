<script lang="ts">
	import { Button, TimePickerDialog } from '#lib/index.js'

	let value = $state<string | undefined>('07:00')
	let vertical = $state(false)
	let horizontal = $state(false)
</script>

<Button variant="outlined" onclick={() => (vertical = true)}>Vertical</Button>
<Button variant="outlined" onclick={() => (horizontal = true)}>Horizontal</Button>

<TimePickerDialog bind:value bind:open={vertical} layout="vertical" hour12 />
<TimePickerDialog bind:value bind:open={horizontal} layout="horizontal" hour12 />

<p>Value: <code>{value ?? 'undefined'}</code></p>
