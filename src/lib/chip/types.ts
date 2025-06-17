import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type ChipSetProps = HTMLAttributes<HTMLDivElement>

interface AssistChipButtonProps extends HTMLButtonAttributes {
	elevated?: boolean
	disabled?: boolean
	label?: string
	icon?: Snippet
	element?: HTMLDivElement
}
interface AssistChipAnchorProps extends HTMLAnchorAttributes {
	elevated?: boolean
	disabled?: boolean
	label?: string
	icon?: Snippet
	element?: HTMLDivElement
}

export type AssistChipProps = AssistChipButtonProps | AssistChipAnchorProps

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
	value?: string | number
	onremove?: (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement
		},
	) => void
}
