<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let basic = $state<string | undefined>('2025-08-17')
</script>

<DockedDatePicker bind:value={basic} label="Date" />
<p>Value: <code>{basic ?? 'undefined'}</code></p>
