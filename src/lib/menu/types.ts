import type { ItemProps } from '#lib/list/types.js'
import type { HTMLAttributes } from 'svelte/elements'

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	anchor?: HTMLElement | undefined
	element?: HTMLDivElement
	open?: boolean
	coverAnchor?: boolean
}

export interface MenuItemProps extends Omit<ItemProps, 'variant' | 'softFocus' | 'role'> {
	/**
	 * `menuitemradio` for one choice out of several, `menuitemcheckbox` for a choice that can be
	 * toggled on its own. Both announce `selected` as checked, and a checkbox keeps the menu open.
	 */
	role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox'
}
