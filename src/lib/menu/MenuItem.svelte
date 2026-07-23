<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.ts'

	let { ...attributes }: MenuItemProps = $props()
</script>

<li class="np-menu-item" role="menuitem">
	{#if 'href' in attributes}
		<Item {...attributes} variant="link" />
	{:else}
		<Item {...attributes} variant="button" />
	{/if}
</li>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
