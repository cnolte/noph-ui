<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.ts'

	let { ...attributes }: MenuItemProps = $props()

	const isLink = $derived(attributes.href != null)
</script>

<div class="np-menu-item" role="none">
	<Item role="menuitem" {...attributes} variant={isLink ? 'link' : 'button'} />
</div>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
