import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationDrawerProps extends HTMLAttributes<HTMLElement> {
	modal?: boolean
	/** The scrim behind a modal drawer. On by default, as Material 3 asks. */
	backdrop?: boolean
	/**
	 * Modal: whether the drawer is open. Standard: leave it out for a drawer that is always there,
	 * or set it to make the drawer dismissible, sliding in and out.
	 */
	open?: boolean
	/** A headline above the destinations. It names the navigation unless `aria-label` does. */
	headline?: string
	element?: HTMLElement
	/**
	 * The edge the modal drawer slides in from: `ltr` from the left, `rtl` from the right. Leave it
	 * out to follow the writing direction.
	 */
	direction?: 'ltr' | 'rtl'
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
	badgeLabel?: string | number
	badgeAriaLabel?: string
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationDrawerItemElement
}

export interface NavigationDrawerSectionProps extends HTMLAttributes<HTMLDivElement> {
	/** The section label, shown above the destinations and naming the group. */
	label: string
	element?: HTMLDivElement
}
