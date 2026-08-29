<script lang="ts">
	import { DockedDateTimePicker } from '#lib/index.js'

	let meeting = $state<string | undefined>('2025-08-17T14:30')
</script>

<DockedDateTimePicker bind:value={meeting} label="Starts at" />
<p>Value: <code>{meeting ?? 'undefined'}</code></p>
