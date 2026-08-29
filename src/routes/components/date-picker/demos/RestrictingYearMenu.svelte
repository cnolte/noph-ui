<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`

	let birthday = $state<string | undefined>()
</script>

<DockedDatePicker
	bind:value={birthday}
	label="Date of birth"
	yearRange={[1920, today.getFullYear()]}
	max={isoToday}
/>
