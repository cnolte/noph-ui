import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export type ChipSetProps = HTMLAttributes<HTMLDivElement>

export interface FilterChipProps extends HTMLAttributes<HTMLDivElement> {
	selected?: boolean
	removable?: boolean
	disabled?: boolean
	elevated?: boolean
	label?: string
	icon?: Snippet
	ariaLabelRemove?: string
	element?: HTMLDivElement
	name?: string
	value?: string
	group?: (string | number)[] | null
	defaultSelected?: boolean | null
	onremove?: (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement
		},
	) => void
}

export interface InputChipProps extends HTMLAttributes<HTMLDivElement> {
	selected?: boolean
	disabled?: boolean
	label?: string
	icon?: Snippet
	ariaLabelRemove?: string
	element?: HTMLDivElement
	name?: string
	value?: string
	group?: (string | number)[] | null
	defaultSelected?: boolean | null
	onremove?: (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement
		},
	) => void
}
