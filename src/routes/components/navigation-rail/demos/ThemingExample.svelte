<script lang="ts">
	import { NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<NavigationRail --np-navigation-rail-item-selected-font-weight="700">
	<NavigationRailItem selected label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem label="Styles">
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>
