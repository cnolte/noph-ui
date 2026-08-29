import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
	variant?: 'search' | 'small' | 'medium' | 'large'
	headline?: string
	subtitle?: string
	leading?: Snippet
	search?: Snippet
	trailing?: Snippet
	collapsible?: boolean
	scroller?: 'root' | 'nearest'
	element?: HTMLElement
}
