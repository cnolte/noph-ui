import type { Snippet } from 'svelte'
import type { ElementKindProps } from '#lib/internal/elementTag.js'
import type { HTMLAttributes } from 'svelte/elements'

export type ItemElement = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement

export interface ItemProps extends ElementKindProps<ItemElement> {
	selected?: boolean
	start?: Snippet
	/** A 40px round avatar in place of `start`: initials as text, or a snippet holding an image. */
	avatar?: string | Snippet
	/** Trailing content, such as an icon or short supporting text like a count. */
	end?: string | Snippet
	supportingText?: string | Snippet
	softFocus?: boolean
	lazy?: boolean
	/** @deprecated Use `type`, like on `Card`. */
	variant?: 'button' | 'link' | 'text'
	element?: ItemElement
}

export type ListItemProps = ItemProps

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
	/**
	 * Makes the list a listbox whose items are options, announcing each item's `selected` state.
	 * The selection itself stays with you, through `selected` and `onclick` on the items.
	 */
	selection?: 'single' | 'multiple'
	element?: HTMLUListElement
}
