<script lang="ts">
	import { Button, TimePickerDialog } from '#lib/index.js'

	let value = $state<string | undefined>('07:00')
	let open = $state(false)
</script>

<Button variant="filled" onclick={() => (open = true)}>Select time</Button>
<TimePickerDialog
	bind:value
	bind:open
	hour12
	--np-time-picker-clock-dial-container-color="var(--np-color-tertiary-container)"
	--np-time-picker-clock-dial-selector-color="var(--np-color-tertiary)"
	--np-time-picker-clock-dial-selected-label-color="var(--np-color-on-tertiary)"
	--np-time-picker-time-selector-selected-container-color="var(--np-color-tertiary-container)"
	--np-time-picker-time-selector-selected-label-color="var(--np-color-on-tertiary-container)"
	--np-time-picker-clock-dial-size="14rem"
/>

<p>Value: <code>{value ?? 'undefined'}</code></p>
