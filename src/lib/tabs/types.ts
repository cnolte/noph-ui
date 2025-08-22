import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface TabProps extends HTMLAttributes<HTMLElement> {
	inlineIcon?: boolean
	value: string | number
	href?: string
	icon?: Snippet
	badge?: boolean
	badgeLabel?: string | number
	element?: HTMLElement
}

export interface TabsProps extends HTMLAttributes<HTMLElement> {
	variant?: 'primary' | 'secondary'
	value: string | number
	element?: HTMLElement
}

export interface TabsContext {
	value: string | number
	variant: 'primary' | 'secondary'
	id: string
}
