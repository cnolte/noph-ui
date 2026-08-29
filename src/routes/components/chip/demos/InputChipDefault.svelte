<script lang="ts">
	import { ChipSet, InputChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<InputChip label="Input chip" />
	<InputChip label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>
