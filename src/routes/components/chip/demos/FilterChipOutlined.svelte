<script lang="ts">
	import { ChipSet, FilterChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<FilterChip label="Filter chip" />
	<FilterChip label="Selected" selected />
	<FilterChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>
