<script lang="ts">
	import { NavigationBar, NavigationBarItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const destinations = [
		{ value: 'home', label: 'Home', icon: 'home' },
		{ value: 'search', label: 'Search', icon: 'search' },
		{ value: 'mail', label: 'Mail', icon: 'mail' },
		{ value: 'settings', label: 'Settings', icon: 'settings' },
	]

	let selectedCentered = $state('home')
</script>

<div style="width:100%;max-width:36rem">
	<NavigationBar aria-label="Main, horizontal items" arrangement="centered">
		{#each destinations as destination (destination.value)}
			<NavigationBarItem
				orientation="horizontal"
				label={destination.label}
				selected={selectedCentered === destination.value}
				onclick={() => (selectedCentered = destination.value)}
			>
				{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
			</NavigationBarItem>
		{/each}
	</NavigationBar>
</div>
