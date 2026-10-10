<script lang="ts">
	import { NavigationRail, NavigationRailItem, NavigationRailSection } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	type Destination = { value: string; label: string; icon: string }

	const main: Destination[] = [
		{ value: 'home', label: 'Home', icon: 'home' },
		{ value: 'search', label: 'Search', icon: 'search' },
		{ value: 'mail', label: 'Mail', icon: 'mail' },
	]
	const library: Destination[] = [
		{ value: 'saved', label: 'Saved', icon: 'bookmark' },
		{ value: 'favorites', label: 'Favorites', icon: 'favorite' },
		{ value: 'downloads', label: 'Downloads', icon: 'download' },
	]

	let expanded = $state(true)
	let selected = $state('home')
</script>

{#snippet item(destination: Destination)}
	<NavigationRailItem
		label={destination.label}
		selected={selected === destination.value}
		onclick={() => (selected = destination.value)}
	>
		{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
	</NavigationRailItem>
{/snippet}

<div style="display:flex;height:36rem;width:36rem;max-width:100%">
	<NavigationRail menu bind:expanded aria-label="Main, with sections">
		{#each main as destination (destination.value)}
			{@render item(destination)}
		{/each}
		<NavigationRailSection label="Library">
			{#each library as destination (destination.value)}
				{@render item(destination)}
			{/each}
		</NavigationRailSection>
	</NavigationRail>
	<div style="flex:1;padding:1.5rem">Collapse the rail and the library goes with it.</div>
</div>
