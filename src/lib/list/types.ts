import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type ItemElement = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement

export interface ItemProps
	extends
		HTMLAttributes<ItemElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	disabled?: boolean
	variant?: 'button' | 'link' | 'text'
	supportingText?: Snippet
	softFocus?: boolean
	lazy?: boolean
	type?: 'submit' | 'reset' | 'button' | null
}

export type ListItemProps = ItemProps

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
	element?: HTMLUListElement
}
