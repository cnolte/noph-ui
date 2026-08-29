<script lang="ts">
	import { AssistChip, ChipSet, FilterChip } from '#lib/index.js'
</script>

<ChipSet>
	<FilterChip
		label="Tertiary"
		--np-filter-chip-container-shape="var(--np-shape-corner-full)"
		--np-filter-chip-outline-color="var(--np-color-tertiary)"
	/>
	<AssistChip
		label="Tertiary"
		--np-assist-chip-outline-color="var(--np-color-tertiary)"
		--np-assist-chip-label-text-color="var(--np-color-tertiary)"
	/>
</ChipSet>
