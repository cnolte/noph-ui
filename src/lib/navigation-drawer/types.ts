import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationDrawerProps extends HTMLAttributes<HTMLElement> {
	modal?: boolean
	backdrop?: boolean
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
	badgeLabelText?: string
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
}
