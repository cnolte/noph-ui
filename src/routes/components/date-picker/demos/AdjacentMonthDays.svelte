<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let adjacent = $state<string | undefined>('2025-08-17')
</script>

<DockedDatePicker bind:value={adjacent} label="With adjacent days" adjacentMonthDays />
