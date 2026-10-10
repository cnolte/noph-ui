<script lang="ts">
	import { List, ListItem, Search } from '#lib/index.js'

	let expanded = $state(false)
</script>

<div style="width:26rem;max-width:100%">
	<Search
		bind:expanded
		placeholder="Search product"
		--np-search-pane-margin="4rem"
		--np-search-view-margin="0rem"
	>
		<List aria-label="Suggestions">
			<ListItem type="button" onclick={() => (expanded = false)}>Simple Classic Tacos</ListItem>
		</List>
	</Search>
</div>
