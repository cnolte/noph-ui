<script lang="ts">
	import { NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<NavigationRail>
	<NavigationRailItem href="#videos" selected label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem href="#styles" label="Styles">
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>
