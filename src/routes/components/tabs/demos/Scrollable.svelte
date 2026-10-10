<script lang="ts">
	import { Tab, Tabs } from '#lib/index.js'

	const breeds = [
		'Akita',
		'Alaskan Malamute',
		'Australian Shepherd',
		'Azawakh',
		'Barbet',
		'Basenji',
		'Beagle',
		'Bernese Mountain Dog',
	]

	let value = $state('Akita')
</script>

<div style="width:100%;max-width:400px">
	<Tabs bind:value scrollable aria-label="Dog breeds">
		{#each breeds as breed (breed)}
			<Tab value={breed}>{breed}</Tab>
		{/each}
	</Tabs>
</div>
