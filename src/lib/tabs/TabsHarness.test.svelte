<script lang="ts">
	import Tab from './Tab.svelte'
	import Tabs from './Tabs.svelte'

	let {
		value = $bindable('one'),
		variant = 'primary',
	}: { value?: string; variant?: 'primary' | 'secondary' } = $props()

	const tabs = ['one', 'two', 'three']
</script>

<Tabs bind:value {variant} aria-label="Sections">
	{#each tabs as tab (tab)}
		<Tab value={tab}>{tab}</Tab>
	{/each}
</Tabs>
