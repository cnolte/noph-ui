<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`

	const weekdaysOnly = (date: Date) => date.getDay() !== 0 && date.getDay() !== 6

	let booking = $state<string | undefined>()
</script>

<DockedDatePicker
	bind:value={booking}
	label="Appointment"
	min={isoToday}
	isDateEnabled={weekdaysOnly}
/>
