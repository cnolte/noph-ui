<script lang="ts">
	import { DockedTimePicker } from '#lib/index.js'

	let twelve = $state<string | undefined>('20:00')
	let twentyFour = $state<string | undefined>('20:00')
</script>

<DockedTimePicker bind:value={twelve} hour12 label="12 hour" />
<DockedTimePicker bind:value={twentyFour} hour12={false} label="24 hour" />
