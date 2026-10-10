import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
	variant?: 'search' | 'small' | 'medium' | 'large'
	headline?: string
	/** Renders the headline as a heading of this level. Without it the headline is plain text. */
	headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6
	subtitle?: string
	/** Headline and subtitle at the leading edge or centered. */
	alignment?: 'start' | 'center'
	/** An image or logo. It replaces the headline of a small app bar and sits above it otherwise. */
	image?: Snippet
	leading?: Snippet
	search?: Snippet
	trailing?: Snippet
	collapsible?: boolean
	scroller?: 'root' | 'nearest'
	element?: HTMLElement
}
