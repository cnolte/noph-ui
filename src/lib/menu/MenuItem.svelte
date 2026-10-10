<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.js'

	let {
		element = $bindable(),
		role = 'menuitem',
		selected,
		...attributes
	}: MenuItemProps = $props()
</script>

<div class="np-menu-item" role="none">
	<Item
		bind:element
		{...attributes}
		{role}
		{selected}
		aria-checked={role === 'menuitem' ? undefined : !!selected}
		type={attributes.type ?? (attributes.href == null ? 'button' : undefined)}
	/>
</div>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
