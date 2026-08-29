<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let mondayFirst = $state<string | undefined>('2025-08-17')
</script>

<DockedDatePicker bind:value={mondayFirst} label="Week starts Monday" firstDayOfWeek={1} />
