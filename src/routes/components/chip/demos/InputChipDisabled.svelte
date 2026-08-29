<script lang="ts">
	import { ChipSet, InputChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ChipSet>
	<InputChip disabled label="Disabled" />
	<InputChip disabled selected label="Disabled selected" />
	<InputChip disabled label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>
