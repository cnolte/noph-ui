import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
	arrangement?: 'equal-weight' | 'centered'
	element?: HTMLElement
}

export type NavigationBarItemElement = HTMLButtonElement | HTMLAnchorElement

export interface NavigationBarItemProps
	extends
		HTMLAttributes<NavigationBarItemElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	icon: Snippet
	label: string
	selected?: boolean
	badge?: boolean
	badgeLabel?: string | number
	badgeAriaLabel?: string
	labelBehavior?: 'always' | 'selected'
	orientation?: 'vertical' | 'horizontal'
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationBarItemElement
}
