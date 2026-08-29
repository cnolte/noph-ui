<script lang="ts">
	import { Search } from '#lib/index.js'
	import Item from '#lib/list/Item.svelte'
</script>

<div style="width:26rem;max-width:100%">
	<Search
		placeholder="Search product"
		--np-search-pane-margin="4rem"
		--np-search-view-margin="0rem"
	>
		<Item variant="button">Simple Classic Tacos</Item>
	</Search>
</div>
