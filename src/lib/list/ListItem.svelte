<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import { getListContext } from './context.js'
	import type { ListItemProps } from './types.js'

	let { element = $bindable(), ...attributes }: ListItemProps = $props()

	// In a listbox, the item is the option and the <li> around it steps aside.
	const list = getListContext()
	let option = $derived(!!list?.selection)
</script>

<li role={option ? 'none' : undefined}>
	{#if option}
		<Item
			bind:element
			{...attributes}
			role="option"
			aria-selected={attributes.selected ? 'true' : 'false'}
		/>
	{:else}
		<Item bind:element {...attributes} />
	{/if}
</li>
