import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationRailProps extends HTMLAttributes<HTMLElement> {
	element?: HTMLElement
}

export type NavigationRailItemElement = HTMLButtonElement | HTMLAnchorElement

export interface NavigationRailItemProps
	extends
		HTMLAttributes<NavigationRailItemElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	icon: Snippet
	label: string
	selected?: boolean
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationRailItemElement
}
