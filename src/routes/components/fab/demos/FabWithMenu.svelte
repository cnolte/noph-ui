<script lang="ts">
	import { ExtendedFab, Menu, MenuItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let fab: HTMLButtonElement | HTMLAnchorElement | undefined = $state()
</script>

<ExtendedFab
	label="Create"
	style="anchor-name:--create-fab"
	command="toggle-popover"
	commandfor="create-menu"
	aria-haspopup="menu"
	bind:element={fab}
>
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</ExtendedFab>
<Menu
	anchor={fab}
	id="create-menu"
	style="position-anchor:--create-fab"
	--np-menu-margin="4px"
	--np-menu-position-area="bottom span-right"
	--np-menu-justify-self="none"
>
	{#each ['Event', 'Task', 'Out of office', 'Working location'] as entry (entry)}
		<MenuItem command="hide-popover" commandfor="create-menu">{entry}</MenuItem>
	{/each}
</Menu>
