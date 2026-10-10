<script lang="ts">
	import { ExtendedFab, NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const destinations = [
		{ value: 'videos', label: 'Videos', icon: 'videocam' },
		{ value: 'styles', label: 'Styles', icon: 'palette' },
		{ value: 'favorites', label: 'Favorites', icon: 'favorite', badgeLabel: 3 },
		{ value: 'settings', label: 'Settings', icon: 'settings' },
	]

	let expanded = $state(false)
	let selected = $state('videos')
</script>

<div style="display:flex;height:30rem;width:36rem;max-width:100%">
	<NavigationRail menu bind:expanded aria-label="Main">
		{#snippet fab({ expanded })}
			<ExtendedFab collapsed={!expanded} label="New video">
				{#snippet icon()}<Icon>add</Icon>{/snippet}
			</ExtendedFab>
		{/snippet}
		{#each destinations as destination (destination.value)}
			<NavigationRailItem
				label={destination.label}
				selected={selected === destination.value}
				badge={destination.badgeLabel !== undefined}
				badgeLabel={destination.badgeLabel}
				onclick={() => (selected = destination.value)}
			>
				{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
			</NavigationRailItem>
		{/each}
	</NavigationRail>
	<div style="flex:1;padding:1.5rem">Content moves aside as the rail expands.</div>
</div>
