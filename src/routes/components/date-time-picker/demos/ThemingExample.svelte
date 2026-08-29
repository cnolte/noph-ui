<script lang="ts">
	import { DockedDateTimePicker } from '#lib/index.js'

	let themed = $state<string | undefined>('2025-08-17T14:30')
</script>

<DockedDateTimePicker
	bind:value={themed}
	label="Starts at"
	--np-date-picker-time-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-time-selected-label-color="var(--np-color-on-tertiary)"
	--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
	--np-docked-date-time-picker-column-width="5rem"
/>
