<script lang="ts">
	import { IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div class="icon-list">
	<IconButton aria-label="Unselected icon button" toggle><Icon>settings</Icon></IconButton>
	<IconButton aria-label="Unselected filled icon button" variant="filled" toggle
		><Icon>settings</Icon></IconButton
	>
	<IconButton aria-label="Unselected tonal icon button" variant="tonal" toggle
		><Icon>settings</Icon></IconButton
	>
	<IconButton aria-label="Unselected outlined icon button" variant="outlined" toggle
		><Icon>settings</Icon></IconButton
	>
</div>
<div class="icon-list">
	<IconButton aria-label="Selected icon button" toggle selected><Icon>settings</Icon></IconButton>
	<IconButton aria-label="Selected filled icon button" variant="filled" toggle selected
		><Icon>settings</Icon></IconButton
	>
	<IconButton aria-label="Selected tonal icon button" variant="tonal" toggle selected
		><Icon>settings</Icon></IconButton
	>
	<IconButton aria-label="Selected outlined icon button" variant="outlined" toggle selected
		><Icon>settings</Icon></IconButton
	>
</div>

<style>
	.icon-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
