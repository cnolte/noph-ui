<script lang="ts">
	import { NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let selection = $state(1)
</script>

<NavigationRail>
	<NavigationRailItem
		selected={selection === 1}
		onclick={() => {
			selection = 1
		}}
		label="Videos"
	>
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem
		selected={selection === 2}
		onclick={() => {
			selection = 2
		}}
		label="Styles"
	>
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem
		selected={selection === 3}
		onclick={() => {
			selection = 3
		}}
		label="Settings"
	>
		{#snippet icon()}<Icon>settings</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>
