<script lang="ts">
	import { Divider, List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<List style="max-width:300px">
	<ListItem>
		Account
		{#snippet start()}
			<Icon>person</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Setting
		{#snippet start()}
			<Icon>settings</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Sign out
		{#snippet start()}
			<Icon>logout</Icon>
		{/snippet}
	</ListItem>
</List>
