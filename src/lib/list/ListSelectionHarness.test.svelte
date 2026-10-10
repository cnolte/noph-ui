<script lang="ts">
	import List from './List.svelte'
	import ListItem from './ListItem.svelte'

	let { selection = 'single' }: { selection?: 'single' | 'multiple' } = $props()
	let chosen = $state(['Work'])
</script>

<List {selection} aria-label="Places">
	{#each ['Home', 'Work', 'Gym'] as place (place)}
		<ListItem
			selected={chosen.includes(place)}
			onclick={() =>
				(chosen =
					selection === 'single'
						? [place]
						: chosen.includes(place)
							? chosen.filter((p) => p !== place)
							: [...chosen, place])}>{place}</ListItem
		>
	{/each}
</List>
