<script lang="ts">
	import { List, ListItem, Search } from '#lib/index.js'

	const dishes = ['Simple Classic Tacos', 'Mexican street corn', 'Chilaquiles verdes']

	let fullScreenQuery = $state('')
	let expanded = $state(false)

	const matches = (q: string) =>
		q ? dishes.filter((d) => d.toLowerCase().includes(q.toLowerCase())) : dishes
</script>

<div style="width:26rem;max-width:100%">
	<Search
		bind:value={fullScreenQuery}
		bind:expanded
		view="full-screen"
		placeholder="Search product"
	>
		<List aria-label="Suggestions">
			{#each matches(fullScreenQuery) as dish (dish)}
				<ListItem
					onclick={() => {
						fullScreenQuery = dish
						expanded = false
					}}
				>
					{dish}
				</ListItem>
			{/each}
		</List>
	</Search>
</div>
