<script lang="ts">
	import { DockedDateTimePicker } from '#lib/index.js'

	let germanMoment = $state<string | undefined>('2025-08-17T14:30')
</script>

<DockedDateTimePicker bind:value={germanMoment} locale="de-DE" label="Beginnt am" />
