<script lang="ts">
	import { Button, TimePickerDialog } from '#lib/index.js'

	let value = $state<string | undefined>('12:00')
	let picker = $state<ReturnType<typeof TimePickerDialog>>()
</script>

<Button variant="filled" onclick={() => picker?.show()}>Show</Button>
<Button variant="outlined" onclick={() => picker?.close()}>Close</Button>

<TimePickerDialog bind:this={picker} bind:value hour12 />

<p>Value: <code>{value ?? 'undefined'}</code></p>
