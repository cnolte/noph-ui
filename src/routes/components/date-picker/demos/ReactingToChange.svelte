<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let watched = $state<string | undefined>('2025-08-17')
	let watchedLog = $state('')
</script>

<DockedDatePicker
	bind:value={watched}
	label="Date"
	onchange={(next) => (watchedLog = next ? `changed to ${next}` : 'cleared')}
/>
<p>Last event: <code>{watchedLog || 'none yet'}</code></p>
