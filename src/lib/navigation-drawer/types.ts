import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationDrawerProps extends HTMLAttributes<HTMLElement> {
	/** A modal drawer is a `dialog` over the page; a standard one is part of the layout. */
	modal?: boolean
	/** Paints the scrim behind a modal drawer. */
	backdrop?: boolean
	/** Bindable. Whether a modal drawer is showing. Ignored by a standard drawer. */
	open?: boolean
	element?: HTMLElement
	direction?: 'rtl' | 'ltr'
}

export type NavigationDrawerItemElement = HTMLButtonElement | HTMLAnchorElement

export interface NavigationDrawerItemProps
	extends
		HTMLAttributes<NavigationDrawerItemElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	icon?: Snippet
	label: string
	selected?: boolean
	badgeLabel?: string
	badgeAriaLabel?: string
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationDrawerItemElement
}
