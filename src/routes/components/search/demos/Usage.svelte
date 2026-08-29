<script lang="ts">
	import { Search } from '#lib/index.js'
	import Item from '#lib/list/Item.svelte'

	const dishes = ['Simple Classic Tacos', 'Mexican street corn', 'Chilaquiles verdes']

	let query = $state('')

	const matches = (q: string) =>
		q ? dishes.filter((d) => d.toLowerCase().includes(q.toLowerCase())) : dishes
</script>

<div style="width:26rem;max-width:100%">
	<Search bind:value={query} placeholder="Search product">
		{#each matches(query) as dish (dish)}
			<Item variant="button">{dish}</Item>
		{/each}
	</Search>
</div>
