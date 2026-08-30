import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface DialogProps extends Omit<HTMLDialogAttributes, 'open'> {
	icon?: Snippet
	headline?: string
	headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6
	supportingText?: string
	divider?: boolean
	actions?: Snippet
	quick?: boolean
	element?: HTMLDialogElement
	open?: boolean
}
