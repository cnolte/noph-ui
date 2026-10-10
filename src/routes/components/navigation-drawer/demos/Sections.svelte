<script lang="ts">
	import { NavigationDrawer, NavigationDrawerItem, NavigationDrawerSection } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const mail = [
		{ value: 'inbox', label: 'Inbox', icon: 'mail', badgeLabel: 24 },
		{ value: 'sent', label: 'Sent', icon: 'send' },
		{ value: 'favorites', label: 'Favorites', icon: 'favorite' },
		{ value: 'trash', label: 'Trash', icon: 'delete' },
	]
	const labels = [
		{ value: 'work', label: 'Work', icon: 'work' },
		{ value: 'saved', label: 'Saved', icon: 'bookmark' },
	]

	let selected = $state('inbox')
</script>

{#snippet item(destination: { value: string; label: string; icon: string; badgeLabel?: number })}
	<NavigationDrawerItem
		label={destination.label}
		badgeLabel={destination.badgeLabel}
		selected={selected === destination.value}
		onclick={() => (selected = destination.value)}
	>
		{#snippet icon()}<Icon>{destination.icon}</Icon>{/snippet}
	</NavigationDrawerItem>
{/snippet}

<NavigationDrawer headline="Mail" --np-navigation-drawer-height="34rem">
	{#each mail as destination (destination.value)}
		{@render item(destination)}
	{/each}
	<NavigationDrawerSection label="Labels">
		{#each labels as destination (destination.value)}
			{@render item(destination)}
		{/each}
	</NavigationDrawerSection>
</NavigationDrawer>
