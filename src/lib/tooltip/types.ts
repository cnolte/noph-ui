import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

declare module 'svelte/elements' {
	interface HTMLAnchorAttributes {
		interestfor?: string | undefined | null
	}
	interface HTMLButtonAttributes {
		interestfor?: string | undefined | null
	}
}

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
	element?: HTMLDivElement
	open?: boolean
}

export interface RichTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'popover'> {
	subhead?: string
	actions?: Snippet
	element?: HTMLDivElement
	open?: boolean
}
