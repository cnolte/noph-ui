<script lang="ts">
	import { IconButton, NavigationDrawer, NavigationDrawerItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const destinations = [
		{ value: 'videos', label: 'Videos', icon: 'videocam' },
		{ value: 'styles', label: 'Styles', icon: 'palette' },
		{ value: 'settings', label: 'Settings', icon: 'settings' },
	]

	let open = $state(true)
	let selected = $state('videos')
</script>

<div style="display:flex;width:40rem;max-width:100%;height:16rem">
	<NavigationDrawer {open} aria-label="Main, dismissible" --np-navigation-drawer-height="100%">
		{#each destinations as destination (destination.value)}
			<NavigationDrawerItem
				label={destination.label}
				selected={selected === destination.value}
				onclick={() => (selected = destination.value)}
			>
				{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
			</NavigationDrawerItem>
		{/each}
	</NavigationDrawer>
	<div style="flex:1;padding:0.5rem 1rem">
		<IconButton aria-label="Navigation" aria-expanded={open} onclick={() => (open = !open)}>
			<Icon>{open ? 'menu_open' : 'menu'}</Icon>
		</IconButton>
		<p>The content takes the space the drawer gives back.</p>
	</div>
</div>
