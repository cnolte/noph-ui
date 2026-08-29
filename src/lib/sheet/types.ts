import type { Snippet } from 'svelte'
import type { HTMLDialogAttributes } from 'svelte/elements'

export interface SheetProps extends Omit<HTMLDialogAttributes, 'open'> {
	/** Bindable. Whether the sheet is showing. */
	open?: boolean
	/**
	 * A modal sheet takes focus and blocks the page behind it; a standard one sits alongside the
	 * content and leaves it usable.
	 */
	modal?: boolean
	/** Which edge the sheet is docked to. `'bottom'` is M3's bottom sheet, the sides are side sheets. */
	placement?: 'bottom' | 'top' | 'start' | 'end'
	/** The drag handle M3 puts on a bottom sheet. Ignored on the other edges. */
	handle?: boolean
	headline?: string
	/** Trailing action in the header, usually a close button. */
	action?: Snippet
	element?: HTMLDialogElement
}
