import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface DialogProps extends Omit<HTMLDialogAttributes, 'open'> {
	icon?: Snippet
	headline?: string
	supportingText?: string
	divider?: boolean
	actions?: Snippet
	quick?: boolean
	element?: HTMLDialogElement
	open?: boolean
}
