<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.js'

	let { element = $bindable(), ...attributes }: MenuItemProps = $props()
</script>

<div class="np-menu-item" role="none">
	<!-- Without a link to follow, a menu item is still a button. -->
	<Item
		role="menuitem"
		bind:element
		{...attributes}
		type={attributes.type ?? (attributes.href == null ? 'button' : undefined)}
	/>
</div>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
