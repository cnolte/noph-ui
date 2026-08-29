<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let themed = $state<string | undefined>('2025-08-17')
</script>

<DockedDatePicker
	bind:value={themed}
	label="Date"
	--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
	--np-date-picker-date-today-outline-color="var(--np-color-tertiary)"
	--np-date-picker-date-today-label-color="var(--np-color-tertiary)"
	--np-date-picker-date-container-shape="var(--np-shape-corner-small)"
/>
