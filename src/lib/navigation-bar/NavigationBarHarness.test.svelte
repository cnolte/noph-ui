<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import NavigationBar from './NavigationBar.svelte'
	import NavigationBarItem from './NavigationBarItem.svelte'

	let {
		selected = 'home',
		labelBehavior = 'always',
		asLinks = false,
		arrangement = 'equal-weight',
		orientation = 'vertical',
	}: {
		selected?: string
		labelBehavior?: 'always' | 'selected'
		asLinks?: boolean
		arrangement?: 'equal-weight' | 'centered'
		orientation?: 'vertical' | 'horizontal'
	} = $props()

	const items = [
		{ value: 'home', label: 'Home', icon: 'home' },
		{ value: 'search', label: 'Search', icon: 'search' },
		{ value: 'mail', label: 'Mail', icon: 'mail' },
	]
</script>

<NavigationBar {arrangement} aria-label="Main">
	{#each items as item (item.value)}
		<NavigationBarItem
			{labelBehavior}
			{orientation}
			href={asLinks ? `/${item.value}` : undefined}
			label={item.label}
			selected={selected === item.value}
			badge={item.value === 'mail'}
			badgeLabel={item.value === 'mail' ? 3 : undefined}
			badgeAriaLabel={item.value === 'mail' ? '3 unread' : undefined}
		>
			{#snippet icon()}<Icon>{item.icon}</Icon>{/snippet}
		</NavigationBarItem>
	{/each}
</NavigationBar>
