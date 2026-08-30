<script lang="ts">
	import { DockedTimePicker } from '#lib/index.js'

	let value = $state<string | undefined>('14:30')
</script>

<DockedTimePicker bind:value label="Time" />
<p>Value: <code>{value ?? 'undefined'}</code></p>
