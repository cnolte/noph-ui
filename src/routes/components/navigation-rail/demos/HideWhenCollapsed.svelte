<script lang="ts">
	import { IconButton, NavigationRail, NavigationRailItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const destinations = [
		{ value: 'videos', label: 'Videos', icon: 'videocam' },
		{ value: 'styles', label: 'Styles', icon: 'palette' },
		{ value: 'settings', label: 'Settings', icon: 'settings' },
	]

	let expanded = $state(false)
	let selected = $state('videos')
</script>

<div style="display:flex;align-items:flex-start;gap:0.5rem;width:100%">
	<IconButton
		aria-label="Open navigation"
		aria-expanded={expanded}
		onclick={() => (expanded = true)}
	>
		<Icon>menu</Icon>
	</IconButton>
	<NavigationRail modal hideWhenCollapsed menu bind:expanded aria-label="Main, hidden">
		{#each destinations as destination (destination.value)}
			<NavigationRailItem
				label={destination.label}
				selected={selected === destination.value}
				onclick={() => (selected = destination.value)}
			>
				{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
			</NavigationRailItem>
		{/each}
	</NavigationRail>
	<p style="margin:0.5rem 0">Collapsed, the rail is gone and the content has the full width.</p>
</div>
