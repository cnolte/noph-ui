<script lang="ts">
	import { IconButton, List, ListItem, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let expanded = $state(false)
</script>

<div style="width:26rem;max-width:100%">
	<Search bind:expanded placeholder="Search product">
		{#snippet trailing()}
			<IconButton title="Filter"><Icon>settings</Icon></IconButton>
		{/snippet}
		<List aria-label="Suggestions">
			<ListItem type="button" onclick={() => (expanded = false)}>Simple Classic Tacos</ListItem>
		</List>
	</Search>
</div>
