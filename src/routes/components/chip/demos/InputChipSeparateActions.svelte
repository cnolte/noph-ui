<script lang="ts">
	import { ChipSet, InputChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let editableLabel = $state('Fabian Reza')
	let editableSelected = $state(false)
</script>

<ChipSet>
	<InputChip
		bind:selected={editableSelected}
		label={editableLabel}
		removeAriaLabel="Remove {editableLabel}"
		onclick={() => (editableSelected = !editableSelected)}
		onremove={() => (editableLabel = 'Removed')}
	>
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>
