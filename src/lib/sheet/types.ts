import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface SheetProps extends Omit<HTMLDialogAttributes, 'open'> {
	open?: boolean
	modal?: boolean
	placement?: 'bottom' | 'top' | 'start' | 'end'
	handle?: boolean
	/** Names the drag handle of a bottom sheet. */
	handleLabel?: string
	/** Whether a bottom sheet is raised to its full height instead of half the window. */
	expanded?: boolean
	/** A side sheet held 16dp from the window's edges, rounded all round. */
	detached?: boolean
	/** Before the headline, such as a back button. */
	leading?: Snippet
	/** The actions along the bottom of the sheet. */
	actions?: Snippet
	headline?: string
	headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6
	action?: Snippet
	element?: HTMLDialogElement
}
