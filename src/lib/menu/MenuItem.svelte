<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		selected?: boolean
		start?: Snippet
		end?: Snippet
		supportingText?: Snippet
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		selected?: boolean
		start?: Snippet
		end?: Snippet
		disabled?: boolean
		supportingText?: Snippet
	}

	let { ...attributes }: ButtonProps | AnchorProps = $props()

	const isButton = (
		obj: HTMLAnchorAttributes | HTMLButtonAttributes,
	): obj is HTMLButtonAttributes => {
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
