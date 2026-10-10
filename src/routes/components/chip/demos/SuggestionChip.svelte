<script lang="ts">
	import { ChipSet, SuggestionChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<SuggestionChip label="Sounds good" />
	<SuggestionChip label="On my way" />
	<SuggestionChip label="Coffee nearby">
		{#snippet icon()}<Icon>coffee</Icon>{/snippet}
	</SuggestionChip>
	<SuggestionChip variant="elevated" label="Elevated" />
	<SuggestionChip disabled label="Disabled" />
</ChipSet>
