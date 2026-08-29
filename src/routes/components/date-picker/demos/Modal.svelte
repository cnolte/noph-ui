<script lang="ts">
	import { Button, DatePickerDialog } from '#lib/index.js'

	let dialogValue = $state<string | undefined>('2025-08-17')
</script>

<Button variant="filled" command="show-modal" commandfor="pick-a-date">Pick a date</Button>
<DatePickerDialog id="pick-a-date" bind:value={dialogValue} />
<p>Value: <code>{dialogValue ?? 'undefined'}</code></p>
