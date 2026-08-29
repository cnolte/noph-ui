<script lang="ts">
	import { Divider, List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<List style="max-width:300px">
	<ListItem>Browsers</ListItem>
	<Divider />
	<ListItem>Chrome</ListItem>
	<ListItem>Safari</ListItem>
	<ListItem
		>{#snippet supportingText()}
			Firefox is the spiritual successor of Netscape Navigator.
		{/snippet}Firefox</ListItem
	>
	<ListItem variant="button"
		>{#snippet end()}
			<Icon>open_in_new</Icon>
		{/snippet}
		{#snippet supportingText()}
			This will open a new tab
		{/snippet}Compare benchmarks</ListItem
	>
</List>
