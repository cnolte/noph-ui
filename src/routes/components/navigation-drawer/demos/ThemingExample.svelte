<script lang="ts">
	import { NavigationDrawer, NavigationDrawerItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<NavigationDrawer
	--np-navigation-drawer-height="200px"
	--np-navigation-drawer-width="16rem"
	--np-navigation-drawer-background="var(--np-color-surface-container-highest)"
	--np-navigation-drawer-item-container-shape="0.5rem"
>
	<NavigationDrawerItem selected label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationDrawerItem>
	<NavigationDrawerItem label="Styles">
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationDrawerItem>
</NavigationDrawer>
