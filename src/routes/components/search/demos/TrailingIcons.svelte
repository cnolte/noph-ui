<script lang="ts">
	import { IconButton, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
	import Item from '#lib/list/Item.svelte'
</script>

<div style="width:26rem;max-width:100%">
	<Search placeholder="Search product">
		{#snippet trailing()}
			<IconButton title="Filter"><Icon>settings</Icon></IconButton>
		{/snippet}
		<Item variant="button">Simple Classic Tacos</Item>
	</Search>
</div>
