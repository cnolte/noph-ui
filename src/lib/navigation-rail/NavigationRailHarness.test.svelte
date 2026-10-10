<script lang="ts">
	import Fab from '#lib/fab/Fab.svelte'
	import NavigationRail from './NavigationRail.svelte'
	import NavigationRailItem from './NavigationRailItem.svelte'
	import NavigationRailSection from './NavigationRailSection.svelte'

	let {
		expanded = $bindable(false),
		withFab = false,
		alignment = 'top',
		modal = false,
		hideWhenCollapsed = false,
	}: {
		expanded?: boolean
		withFab?: boolean
		alignment?: 'top' | 'center'
		modal?: boolean
		hideWhenCollapsed?: boolean
	} = $props()

	const items = [
		{ value: 'home', label: 'Home', badgeLabel: undefined },
		{ value: 'mail', label: 'Mail', badgeLabel: 3 },
		{ value: 'settings', label: 'Settings', badgeLabel: undefined },
	]
</script>

{#snippet newFab()}<Fab label="New" />{/snippet}

<div style="display: flex; height: 600px">
	<NavigationRail
		menu
		bind:expanded
		{alignment}
		{modal}
		{hideWhenCollapsed}
		fab={withFab ? newFab : undefined}
		aria-label="Main"
	>
		{#each items as item, i (item.value)}
			<NavigationRailItem
				label={item.label}
				selected={i === 0}
				badge={item.badgeLabel !== undefined}
				badgeLabel={item.badgeLabel}
			>
				{#snippet icon()}
					<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
				{/snippet}
			</NavigationRailItem>
		{/each}
		<NavigationRailSection label="Library">
			<NavigationRailItem label="Saved">
				{#snippet icon()}
					<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
				{/snippet}
			</NavigationRailItem>
		</NavigationRailSection>
	</NavigationRail>
</div>
