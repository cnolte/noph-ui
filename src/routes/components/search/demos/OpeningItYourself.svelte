<script lang="ts">
	import { IconButton, List, ListItem, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let search: ReturnType<typeof Search> | undefined = $state()
	let expanded = $state(false)
</script>

<IconButton title="Open search" onclick={() => search?.show()}>
	<Icon>search</Icon>
</IconButton>

<!-- The bar has nowhere to sit until it opens, so it is out of the layout while at rest. -->
<div class={['view', !expanded && 'resting']}>
	<Search bind:this={search} bind:expanded view="full-screen" placeholder="Search product">
		<List aria-label="Suggestions">
			<ListItem type="button" onclick={() => (expanded = false)}>Simple Classic Tacos</ListItem>
		</List>
	</Search>
</div>

<style>
	.view.resting {
		display: none;
	}
</style>
