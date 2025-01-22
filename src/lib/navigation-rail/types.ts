import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type NavigationRailProps = HTMLAttributes<HTMLElement>

interface NavigationRailItemButton extends HTMLButtonAttributes {
	icon: Snippet
	label: string
	selected?: boolean
}

interface NavigationRailItemLink extends HTMLAnchorAttributes {
	icon: Snippet
	label: string
	selected?: boolean
}
export type NavigationRailItemProps = NavigationRailItemButton | NavigationRailItemLink
