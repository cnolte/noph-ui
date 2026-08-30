<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import Search from './Search.svelte'
	import type { SearchProps } from './types.ts'

	let {
		value = $bindable(''),
		expanded = $bindable(false),
		variant = 'contained',
		view = 'docked',
		searched = $bindable(''),
		width = 'auto',
		hiddenAtRest = false,
		resultsRole,
	}: {
		value?: string
		expanded?: boolean
		variant?: SearchProps['variant']
		view?: SearchProps['view']
		searched?: string
		width?: string
		hiddenAtRest?: boolean
		resultsRole?: string
	} = $props()
	let search: ReturnType<typeof Search> | undefined = $state()
</script>

<div class={[hiddenAtRest && !expanded && 'resting']} style="width:{width}">
	<Search
		bind:this={search}
		bind:value
		bind:expanded
		{variant}
		{view}
		resultsAttributes={resultsRole ? { role: resultsRole } : undefined}
		placeholder="Search product"
		onsearch={(q) => (searched = q)}
	>
		<Item variant="button">Simple Classic Tacos</Item>
		<Item variant="button">Mexican dishes</Item>
	</Search>
</div>

<button onclick={() => search?.show()}>Trigger open</button>
<button onclick={() => search?.close()}>Trigger close</button>

<span data-testid="searched">{searched}</span>

<style>
	.resting {
		display: none;
	}
</style>
