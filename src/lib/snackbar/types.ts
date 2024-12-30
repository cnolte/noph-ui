import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
	label: string
	supportingText?: string | undefined
	actionLabel?: string | undefined
	onActionClick?: (event: Event) => void
	icon?: Snippet | undefined
	onIconClick?: (event: Event) => void
	showPopover?: () => void
	hidePopover?: () => void
	timeout?: number
	element?: HTMLElement
	popover?: 'auto' | 'manual'
}
