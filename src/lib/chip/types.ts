import type { ButtonElement, ButtonProps } from '#lib/button/types.ts'
import type { Snippet } from 'svelte'
import type { HTMLAttributes, MouseEventHandler } from 'svelte/elements'

export interface ChipSetProps extends HTMLAttributes<HTMLDivElement> {
	chipsCount?: number
}

export interface AssistChipProps extends Omit<
	ButtonProps,
	'variant' | 'start' | 'end' | 'element'
> {
	elevated?: boolean
	disabled?: boolean
	label?: string
	icon?: Snippet
	element?: HTMLDivElement
}

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
	onremove?: MouseEventHandler<ButtonElement>
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
	onremove?: MouseEventHandler<ButtonElement>
}

export interface ChipSetContext {
	chips: { label: string; name: string | undefined; value: string | number | undefined }[]
}
