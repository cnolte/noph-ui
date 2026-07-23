import type { ItemProps } from '#lib/list/types.ts'
import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	children: Snippet
	anchor?: HTMLElement | undefined
	element?: HTMLDivElement
	open?: boolean
}

export type MenuItemProps = Omit<ItemProps, 'variant' | 'softFocus'>
