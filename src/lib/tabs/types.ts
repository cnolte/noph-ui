import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface TabProps extends HTMLAttributes<HTMLElement> {
	inlineIcon?: boolean
	value: string | number
	href?: string
	icon?: Snippet
	badge?: boolean
	badgeLabel?: string | number
	badgeAriaLabel?: string
	controls?: string
	element?: HTMLElement
}

export interface TabsProps extends HTMLAttributes<HTMLElement> {
	variant?: 'primary' | 'secondary'
	value: string | number
	/** Tabs as wide as their labels that scroll sideways, for more tabs or longer labels than fit. */
	scrollable?: boolean
	element?: HTMLElement
}

export interface TabsContext {
	value: string | number
	indicatorValue: string | number
	variant: 'primary' | 'secondary'
	reveal(tab: HTMLElement): void
}
