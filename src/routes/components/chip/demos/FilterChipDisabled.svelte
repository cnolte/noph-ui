<script lang="ts">
	import { ChipSet, FilterChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<FilterChip disabled label="Outlined" />
	<FilterChip disabled label="Outlined selected" selected />
	<FilterChip disabled variant="elevated" label="Elevated" />
	<FilterChip disabled variant="elevated" label="Elevated selected" selected />
	<FilterChip disabled label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>
