<script lang="ts">
	import { Button, ButtonGroup } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let places = $state([
		{ label: 'Work', icon: 'work', selected: true },
		{ label: 'Restaurant', icon: 'restaurant', selected: false },
		{ label: 'Coffee', icon: 'coffee', selected: false },
		{ label: 'Home', icon: 'home', selected: false },
	])

	const choose = (index: number) => {
		places.forEach((place, i) => (place.selected = i === index))
	}
</script>

<ButtonGroup variant="connected" aria-label="Place">
	{#each places as place, index (place.label)}
		<Button variant="tonal" toggle bind:selected={place.selected} onclick={() => choose(index)}>
			{#snippet start()}
				<Icon>{place.icon}</Icon>
			{/snippet}
			{place.label}
		</Button>
	{/each}
</ButtonGroup>
