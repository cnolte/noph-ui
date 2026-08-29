<script lang="ts">
	import { ChipSet, FilterChip } from '#lib/index.js'

	let filterGroup = $state<string[]>([])
</script>

<ChipSet>
	<FilterChip label="Running" value="running" bind:group={filterGroup} />
	<FilterChip label="Walking" value="walking" bind:group={filterGroup} />
	<FilterChip label="Cycling" value="cycling" bind:group={filterGroup} />
	<FilterChip label="Swimming" value="swimming" bind:group={filterGroup} />
</ChipSet>
