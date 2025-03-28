import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'popover'> {
	icon?: Snippet
	headline: string
	supportingText?: string
	divider?: boolean
	actions?: Snippet
	quick?: boolean
	element?: HTMLElement
	showPopover?: () => void
	hidePopover?: () => void
}
