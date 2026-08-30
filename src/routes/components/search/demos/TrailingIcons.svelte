<script lang="ts">
	import { IconButton, Item, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="width:26rem;max-width:100%">
	<Search placeholder="Search product">
		{#snippet trailing()}
			<IconButton title="Filter"><Icon>settings</Icon></IconButton>
		{/snippet}
		<Item variant="button">Simple Classic Tacos</Item>
	</Search>
</div>
