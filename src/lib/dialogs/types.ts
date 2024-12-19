import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements'

export interface DialogProps extends Omit<HTMLFormAttributes, 'class' | 'popover'> {
	icon?: Snippet
	headline: string
	supportingText?: string
	divider?: boolean
	buttons?: Snippet
	element?: HTMLElement
	showPopover?: () => void
	hidePopover?: () => void
}
