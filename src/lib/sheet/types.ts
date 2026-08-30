import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface SheetProps extends Omit<HTMLDialogAttributes, 'open'> {
	open?: boolean
	modal?: boolean
	placement?: 'bottom' | 'top' | 'start' | 'end'
	handle?: boolean
	headline?: string
	headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6
	action?: Snippet
	element?: HTMLDialogElement
}
