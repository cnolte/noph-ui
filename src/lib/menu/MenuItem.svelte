<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.ts'

	let { element = $bindable(), ...attributes }: MenuItemProps = $props()

	const isLink = $derived(attributes.href != null)
</script>

<div class="np-menu-item" role="none">
	<Item role="menuitem" bind:element {...attributes} variant={isLink ? 'link' : 'button'} />
</div>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
