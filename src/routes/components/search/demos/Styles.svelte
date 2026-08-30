<script lang="ts">
	import { Item, Search } from '#lib/index.js'

	const dishes = ['Simple Classic Tacos', 'Mexican street corn', 'Chilaquiles verdes']

	let dividedQuery = $state('')

	const matches = (q: string) =>
		q ? dishes.filter((d) => d.toLowerCase().includes(q.toLowerCase())) : dishes
</script>

<div style="width:26rem;max-width:100%">
	<Search bind:value={dividedQuery} variant="divided" placeholder="Search product">
		{#each matches(dividedQuery) as dish (dish)}
			<Item variant="button">{dish}</Item>
		{/each}
	</Search>
</div>
