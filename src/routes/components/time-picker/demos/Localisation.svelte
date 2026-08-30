<script lang="ts">
	import { DockedTimePicker } from '#lib/index.js'

	let us = $state<string | undefined>('14:30')
	let de = $state<string | undefined>('14:30')
	let ja = $state<string | undefined>('14:30')
</script>

<DockedTimePicker bind:value={us} locale="en-US" label="en-US" />
<DockedTimePicker bind:value={de} locale="de-DE" label="de-DE" />
<DockedTimePicker bind:value={ja} locale="ja-JP" label="ja-JP" />
