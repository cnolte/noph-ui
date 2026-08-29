import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
	/**
	 * `'equal-weight'` stretches every item to the same width, which M3 recommends for compact
	 * screens. `'centered'` sizes each item to its content and groups them in the middle, which M3
	 * recommends once the bar has room to spare on a medium-width screen.
	 */
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
	/** Hides the label until the item is selected, which M3 allows for four or five items. */
	labelBehavior?: 'always' | 'selected'
	/**
	 * `'vertical'` stacks the icon above the label. `'horizontal'` puts it beside the label instead,
	 * which M3 pairs with `arrangement="centered"` once a bar has room to spare.
	 */
	orientation?: 'vertical' | 'horizontal'
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationBarItemElement
}
