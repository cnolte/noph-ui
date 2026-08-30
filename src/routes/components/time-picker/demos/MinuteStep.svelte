<script lang="ts">
	import { DockedTimePicker } from '#lib/index.js'

	let quarter = $state<string | undefined>('09:15')
	let exact = $state<string | undefined>('09:07')
</script>

<DockedTimePicker bind:value={quarter} minuteStep={15} label="Every 15 minutes" />
<DockedTimePicker bind:value={exact} minuteStep={1} label="Every minute" />
