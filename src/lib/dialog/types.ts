import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface DialogProps extends Omit<HTMLDialogAttributes, 'open'> {
	/** A basic dialog floats over a scrim; a full-screen one fills a compact window. */
	variant?: 'basic' | 'full-screen'
	/** Names the close button of a full-screen dialog. */
	closeLabel?: string
	/** The 56dp bar at the bottom of a full-screen dialog. */
	actionBar?: Snippet
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
