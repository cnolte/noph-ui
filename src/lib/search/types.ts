import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements'

export interface SearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onsearch'> {
	value?: string
	placeholder?: string
	expanded?: boolean
	variant?: 'contained' | 'divided'
	/** Without one, search fills the screen in compact windows (below 600px) and docks above them. */
	view?: 'docked' | 'full-screen'
	leading?: Snippet
	trailing?: Snippet
	/** The field's accessible name. Defaults to the hinted search text, `placeholder`. */
	label?: string
	clearLabel?: string
	backLabel?: string
	onsearch?: (value: string) => void
	/** What screen readers hear when results appear or change, from the number of list items. */
	resultsAnnouncement?: (count: number) => string
	inputAttributes?: HTMLInputAttributes
	resultsAttributes?: HTMLAttributes<HTMLDivElement>
	element?: HTMLDivElement
	inputElement?: HTMLInputElement
}
