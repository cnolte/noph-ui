<script lang="ts">
	import { NavigationDrawer, NavigationDrawerItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let selection = $state(1)
</script>

<NavigationDrawer --np-navigation-drawer-height="200px">
	<NavigationDrawerItem
		selected={selection === 1}
		onclick={() => {
			selection = 1
		}}
		label="Videos"
		badgeLabel="+100"
	>
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationDrawerItem>
	<NavigationDrawerItem
		selected={selection === 2}
		onclick={() => {
			selection = 2
		}}
		label="Styles"
	>
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationDrawerItem>
	<NavigationDrawerItem
		selected={selection === 3}
		onclick={() => {
			selection = 3
		}}
		label="Settings"
	>
		{#snippet icon()}<Icon>settings</Icon>{/snippet}
	</NavigationDrawerItem>
</NavigationDrawer>
