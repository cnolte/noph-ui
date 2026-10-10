<script lang="ts">
	import { NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const destinations = [
		{ value: 'videos', label: 'Videos', icon: 'videocam' },
		{ value: 'styles', label: 'Styles', icon: 'palette' },
		{ value: 'settings', label: 'Settings', icon: 'settings' },
	]

	let expanded = $state(false)
	let selected = $state('videos')
</script>

<div style="display:flex;height:22rem;width:100%">
	<NavigationRail modal menu bind:expanded aria-label="Main, modal">
		{#each destinations as destination (destination.value)}
			<NavigationRailItem
				label={destination.label}
				selected={selected === destination.value}
				onclick={() => {
					selected = destination.value
					expanded = false
				}}
			>
				{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
			</NavigationRailItem>
		{/each}
	</NavigationRail>
	<div style="flex:1;padding:1.5rem">The content stays put. The expanded rail opens over it.</div>
</div>
