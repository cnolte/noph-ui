import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationDrawerProps extends HTMLAttributes<HTMLElement> {
	modal?: boolean
	backdrop?: boolean
	element?: HTMLElement
}

interface NavigationDrawerItemButton extends HTMLButtonAttributes {
	icon?: Snippet
	label: string
	selected?: boolean
	badgeLabelText?: string
}

interface NavigationDrawerItemLink extends HTMLAnchorAttributes {
	icon?: Snippet
	label: string
	selected?: boolean
	badgeLabelText?: string
}

export type NavigationDrawerItemProps = NavigationDrawerItemButton | NavigationDrawerItemLink
