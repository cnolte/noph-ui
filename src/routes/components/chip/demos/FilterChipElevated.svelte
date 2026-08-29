<script lang="ts">
	import { ChipSet, FilterChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<FilterChip variant="elevated" label="Filter chip" />
	<FilterChip variant="elevated" label="Selected" selected />
	<FilterChip variant="elevated" label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip variant="elevated" label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>
