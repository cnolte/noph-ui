<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	const thisYear = new Date().getFullYear()

	let bounded = $state<string | undefined>()
</script>

<DockedDatePicker
	bind:value={bounded}
	label="Within {thisYear}"
	min="{thisYear}-01-01"
	max="{thisYear}-12-31"
/>
