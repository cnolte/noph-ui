<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const places = ['Home', 'Work', 'Coffee shop']
	let place = $state('Work')
</script>

<List selection="single" aria-label="Pick a place" style="max-width:340px">
	{#each places as option (option)}
		<ListItem selected={place === option} onclick={() => (place = option)}>
			{option}
			{#snippet end()}
				{#if place === option}<Icon>check</Icon>{/if}
			{/snippet}
		</ListItem>
	{/each}
</List>
