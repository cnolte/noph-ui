<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const photo = `data:image/svg+xml,${encodeURIComponent(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#7d5260"/><circle cx="20" cy="16" r="7" fill="#ffd8e4"/><rect x="8" y="26" width="24" height="14" rx="7" fill="#ffd8e4"/></svg>',
	)}`
</script>

<List style="max-width:340px">
	<ListItem supportingText="Leading icon">
		Inbox
		{#snippet start()}<Icon>mail</Icon>{/snippet}
		{#snippet end()}<Icon>favorite</Icon>{/snippet}
	</ListItem>
	<ListItem avatar="AL" supportingText="Avatar with initials" end="100+">Ada Lovelace</ListItem>
	<ListItem supportingText="Avatar with an image">
		Grace Hopper
		{#snippet avatar()}<img alt="" src={photo} />{/snippet}
		{#snippet end()}<Icon>verified</Icon>{/snippet}
	</ListItem>
</List>
