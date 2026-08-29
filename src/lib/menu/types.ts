import type { ItemProps } from '#lib/list/types.js'
import type { HTMLAttributes } from 'svelte/elements'

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	anchor?: HTMLElement | undefined
	element?: HTMLDivElement
	open?: boolean
	coverAnchor?: boolean
}

export type MenuItemProps = Omit<ItemProps, 'variant' | 'softFocus'>
