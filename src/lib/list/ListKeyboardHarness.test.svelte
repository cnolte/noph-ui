<script lang="ts">
	import List from './List.svelte'
	import ListItem from './ListItem.svelte'

	let { selected = '' }: { selected?: string } = $props()
</script>

<List aria-label="Places">
	<ListItem onclick={() => {}} selected={selected === 'Home'}>Home</ListItem>
	<ListItem onclick={() => {}} selected={selected === 'Work'}>Work</ListItem>
	<ListItem href="#gym" selected={selected === 'Gym'}>Gym</ListItem>
</List>
