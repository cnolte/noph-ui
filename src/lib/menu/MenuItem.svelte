<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { MenuItemProps } from './types.ts'

	let { ...attributes }: MenuItemProps = $props()
</script>

<div class="np-menu-item" role="none">
	{#if 'href' in attributes}
		<Item role="menuitem" {...attributes} variant="link" />
	{:else}
		<Item role="menuitem" {...attributes} variant="button" />
	{/if}
</div>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
