import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface TabProps extends HTMLAttributes<HTMLElement> {
	variant?: 'primary' | 'secondary'
	inlineIcon?: boolean
	value: string | number
	href?: string
	icon?: Snippet
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
	value: string | number
	element?: HTMLElement
}
