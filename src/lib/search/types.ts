import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements'

export interface SearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onsearch'> {
	value?: string
	placeholder?: string
	expanded?: boolean
	variant?: 'contained' | 'divided'
	view?: 'docked' | 'full-screen'
	leading?: Snippet
	trailing?: Snippet
	label?: string
	clearLabel?: string
	backLabel?: string
	onsearch?: (value: string) => void
	inputAttributes?: HTMLInputAttributes
	resultsAttributes?: HTMLAttributes<HTMLDivElement>
	element?: HTMLDivElement
	inputElement?: HTMLInputElement
}
