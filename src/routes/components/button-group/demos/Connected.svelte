<script lang="ts">
	import { Button, ButtonGroup } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const places = [
		{ value: 'work', label: 'Work', icon: 'work' },
		{ value: 'restaurant', label: 'Restaurant', icon: 'restaurant' },
		{ value: 'coffee', label: 'Coffee', icon: 'coffee' },
		{ value: 'home', label: 'Home', icon: 'home' },
	]
	let place = $state('work')
</script>

<ButtonGroup
	variant="connected"
	selection="single"
	required
	name="place"
	bind:value={place}
	aria-label="Place"
>
	{#each places as { value, label, icon } (value)}
		<Button variant="tonal" {value}>
			{#snippet start()}
				<Icon>{icon}</Icon>
			{/snippet}
			{label}
		</Button>
	{/each}
</ButtonGroup>
