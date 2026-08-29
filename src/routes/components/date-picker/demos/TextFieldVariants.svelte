<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let basic = $state<string | undefined>('2025-08-17')
	let filled = $state<string | undefined>()
</script>

<DockedDatePicker bind:value={basic} label="Outlined" />
<DockedDatePicker bind:value={filled} label="Filled" variant="filled" />
