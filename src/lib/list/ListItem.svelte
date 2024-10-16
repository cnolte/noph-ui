<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		selected?: boolean
		start?: Snippet
		end?: Snippet
		type: 'button'
		supportingText?: Snippet
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		selected?: boolean
		start?: Snippet
		end?: Snippet
		disabled?: boolean
		type: 'link'
		supportingText?: Snippet
	}
	interface TextProps extends HTMLAttributes<HTMLDivElement> {
		selected?: boolean
		start?: Snippet
		end?: Snippet
		disabled?: boolean
		type?: 'text'
		supportingText?: Snippet
	}

	let { ...attributes }: ButtonProps | AnchorProps | TextProps = $props()
</script>

<li>
	<Item {...attributes} />
</li>
