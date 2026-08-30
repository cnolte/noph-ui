<script lang="ts">
	import { Button, TimePickerDialog } from '#lib/index.js'

	let value = $state<string | undefined>('07:00')
	let open = $state(false)
	let mode = $state<'dial' | 'input'>('dial')
</script>

<Button variant="filled" onclick={() => (open = true)}>Select time</Button>
<TimePickerDialog bind:value bind:open bind:mode hour12 />
<p>Value: <code>{value ?? 'undefined'}</code></p>
<p>Mode: <code>{mode}</code></p>
