import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface NavigationRailProps extends HTMLAttributes<HTMLElement> {
	/** Shows the expanded rail: wider, with the label beside each icon. */
	expanded?: boolean
	/** Opens the expanded rail over the content, behind a scrim, instead of pushing it aside. */
	modal?: boolean
	/** Hides the collapsed rail. Open it with your own button that sets `expanded`. */
	hideWhenCollapsed?: boolean
	/** Puts a menu button at the top that toggles `expanded`. */
	menu?: boolean
	/** Name of the menu button, read by assistive technology. It shows no tooltip. */
	menuLabel?: string
	/** Groups the destinations at the top of the rail or in its vertical centre. */
	alignment?: 'top' | 'center'
	/** A FAB above the destinations. Switch to an extended FAB while `expanded`. */
	fab?: Snippet<[{ expanded: boolean }]>
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
	badge?: boolean
	badgeLabel?: string | number
	badgeAriaLabel?: string
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
	element?: NavigationRailItemElement
}

export interface NavigationRailSectionProps extends HTMLAttributes<HTMLDivElement> {
	/** The section header, shown above the destinations and naming the group. */
	label: string
	element?: HTMLDivElement
}
