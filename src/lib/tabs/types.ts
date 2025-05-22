import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'primary' | 'secondary'
	inlineIcon?: boolean
	value: string | number
	icon?: Snippet
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
	value: string | number
	element?: HTMLElement
}
