<script lang="ts">
	import { AssistChip, ChipSet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<AssistChip label="Assist chip" />
	<AssistChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>
