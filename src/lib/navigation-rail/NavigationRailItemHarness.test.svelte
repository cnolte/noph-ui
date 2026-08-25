<script lang="ts">
	import NavigationRailItem from './NavigationRailItem.svelte'

	let { href, selected = false }: { href?: string | null; selected?: boolean } = $props()
</script>

<NavigationRailItem {href} {selected} label="Home">
	{#snippet icon()}
		<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	{/snippet}
</NavigationRailItem>
