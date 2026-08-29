<script lang="ts">
	import { AssistChip, ChipSet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<AssistChip label="Visit website" href="https://noph.dev" target="_blank" rel="noopener">
		{#snippet icon()}<Icon>open_in_new</Icon>{/snippet}
	</AssistChip>
</ChipSet>
