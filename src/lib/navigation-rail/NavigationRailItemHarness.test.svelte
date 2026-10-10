<script lang="ts">
	import NavigationRailItem from './NavigationRailItem.svelte'

	let {
		href,
		selected = false,
		badge = false,
		badgeLabel,
		badgeAriaLabel,
	}: {
		href?: string | null
		selected?: boolean
		badge?: boolean
		badgeLabel?: string | number
		badgeAriaLabel?: string
	} = $props()
</script>

<NavigationRailItem {href} {selected} {badge} {badgeLabel} {badgeAriaLabel} label="Home">
	{#snippet icon()}
		<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	{/snippet}
</NavigationRailItem>
