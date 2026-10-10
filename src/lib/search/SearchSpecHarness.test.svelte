<script lang="ts">
	import List from '#lib/list/List.svelte'
	import ListItem from '#lib/list/ListItem.svelte'
	import Search from './Search.svelte'
	import type { SearchProps } from './types.js'

	let {
		view,
		variant,
		expanded = $bindable(false),
		count = 2,
	}: {
		view?: SearchProps['view']
		variant?: SearchProps['variant']
		expanded?: boolean
		count?: number
	} = $props()
	let profileClicks = $state(0)
</script>

<Search placeholder="Search recipes" {view} {variant} bind:expanded>
	{#snippet trailing()}
		<button type="button" onclick={() => (profileClicks += 1)}>Profile</button>
	{/snippet}
	{#if count > 0}
		<List aria-label="Suggestions">
			{#each ['Tacos', 'Tamales', 'Tortillas'].slice(0, count) as dish (dish)}
				<ListItem onclick={() => {}}>{dish}</ListItem>
			{/each}
		</List>
	{/if}
</Search>
<span data-testid="profile">{profileClicks}</span>
