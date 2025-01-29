import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface FilterChipProps extends HTMLAttributes<HTMLDivElement> {
	selected?: boolean
	removable?: boolean
	disabled?: boolean
	elevated?: boolean
	label?: string
	icon?: Snippet
	ariaLabelRemove?: string
	element?: HTMLDivElement
	remove?: (chip: HTMLDivElement) => void
	select?: (chip: HTMLDivElement) => void
	deselect?: (chip: HTMLDivElement) => void
}
