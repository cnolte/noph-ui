<script lang="ts">
	import { DockedDateTimePicker } from '#lib/index.js'

	let shift = $state<string | undefined>()
</script>

<DockedDateTimePicker
	bind:value={shift}
	label="Shift start"
	minuteStep={15}
	defaultTime="09:00"
	hour12={false}
/>
<p>Value: <code>{shift ?? 'undefined'}</code></p>
