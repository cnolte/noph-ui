<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let last = $state('nothing yet')
</script>

<div style="width:100%;max-width:340px">
	<List aria-label="Account">
		<ListItem onclick={() => (last = 'Profile')}>
			Profile
			{#snippet start()}<Icon>person</Icon>{/snippet}
		</ListItem>
		<ListItem onclick={() => (last = 'Settings')}>
			Settings
			{#snippet start()}<Icon>settings</Icon>{/snippet}
		</ListItem>
		<ListItem href="#actions">
			Help
			{#snippet start()}<Icon>info</Icon>{/snippet}
			{#snippet end()}<Icon>open_in_new</Icon>{/snippet}
		</ListItem>
		<ListItem disabled>
			Sign out
			{#snippet start()}<Icon>logout</Icon>{/snippet}
		</ListItem>
	</List>
	<p>Last picked: {last}</p>
</div>
