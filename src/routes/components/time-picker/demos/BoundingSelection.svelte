<script lang="ts">
	import { DockedTimePicker } from '#lib/index.js'

	let value = $state<string | undefined>('10:00')
	let onTheHalfHour = $state<string | undefined>('10:00')
</script>

<DockedTimePicker bind:value min="09:00" max="17:00" label="Opening hours" />
<DockedTimePicker
	bind:value={onTheHalfHour}
	isTimeEnabled={(minutes) => minutes % 30 === 0}
	label="On the half hour"
/>
