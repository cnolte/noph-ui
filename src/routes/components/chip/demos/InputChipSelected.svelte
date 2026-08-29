<script lang="ts">
	import { ChipSet, InputChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<InputChip selected label="Selected" />
	<InputChip selected label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>
