import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type NavigationRail = HTMLAttributes<HTMLElement>

interface NavigationActionButton extends HTMLButtonAttributes {
	icon: Snippet
	label: string
	selected?: boolean
}

interface NavigationActionLink extends HTMLAnchorAttributes {
	icon: Snippet
	label: string
	selected?: boolean
}
export type NavigationAction = NavigationActionButton | NavigationActionLink
