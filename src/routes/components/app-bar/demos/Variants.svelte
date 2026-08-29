<script lang="ts">
	import { AppBar, IconButton, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
	import Item from '#lib/list/Item.svelte'

	const dishes = ['Simple Classic Tacos', 'Mexican street corn', 'Chilaquiles verdes']

	let query = $state('')

	const matches = (q: string) =>
		q ? dishes.filter((d) => d.toLowerCase().includes(q.toLowerCase())) : dishes
</script>

<div style="display:grid;gap:1rem;width:26rem;max-width:100%">
	<div style="border-radius:1rem">
		<AppBar variant="search">
			{#snippet leading()}
				<IconButton title="Open navigation"><Icon>menu</Icon></IconButton>
			{/snippet}
			{#snippet search()}
				<Search bind:value={query} placeholder="Search product">
					{#each matches(query) as dish (dish)}
						<Item variant="button">{dish}</Item>
					{/each}
				</Search>
			{/snippet}
		</AppBar>
	</div>
	{#each ['small', 'medium', 'large'] as const as variant (variant)}
		<div style="border-radius:1rem;overflow:hidden">
			<AppBar {variant} headline="Headline" subtitle={variant}>
				{#snippet leading()}
					<IconButton title="Back"><Icon>arrow_back</Icon></IconButton>
				{/snippet}
				{#snippet trailing()}
					<IconButton title="Search"><Icon>search</Icon></IconButton>
					<IconButton title="Choose date"><Icon>calendar_today</Icon></IconButton>
				{/snippet}
			</AppBar>
		</div>
	{/each}
</div>
