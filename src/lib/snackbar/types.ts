import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
	label: string
	open?: boolean
	supportingText?: string | undefined
	actionLabel?: string | undefined
	onactionclick?: (event: Event) => void
	icon?: Snippet | undefined
	oniconclick?: (event: Event) => void
	iconAriaLabel?: string
	timeout?: number
	element?: HTMLElement
	popover?: 'auto' | 'manual'
}
