<script lang="ts">
	import { AssistChip, ChipSet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<AssistChip disabled label="Outlined" />
	<AssistChip disabled label="Outlined with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
	<AssistChip disabled variant="elevated" label="Elevated" />
	<AssistChip disabled variant="elevated" label="Elevated with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>
