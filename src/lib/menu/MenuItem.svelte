<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
	import type { MenuItemProps } from './types.ts'

	let { ...attributes }: MenuItemProps = $props()

	const isButton = (obj: unknown): obj is HTMLButtonAttributes => {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
</script>

<li class="np-menu-item" role="menuitem">
	{#if isButton(attributes)}
		<Item {...attributes} variant="button" />
	{:else}
		<Item {...attributes} variant="link" />
	{/if}
</li>

<style>
	.np-menu-item {
		display: flex;
	}
</style>
