import type { Issue } from '#lib/shared/types.js'
import type { ButtonElement } from '#lib/button/types.js'
import type { Snippet } from 'svelte'
import type {
	HTMLAnchorAttributes,
	HTMLAttributes,
	HTMLButtonAttributes,
	MouseEventHandler,
} from 'svelte/elements'

export interface ChipSetProps extends HTMLAttributes<HTMLDivElement> {
	element?: HTMLDivElement
}

export interface AssistChipProps
	extends
		HTMLAttributes<ButtonElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	variant?: 'outlined' | 'elevated'
	disabled?: boolean | null
	label?: string
	icon?: Snippet
	element?: HTMLElement
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
}

export type SuggestionChipProps = AssistChipProps

export interface FilterChipProps extends HTMLAttributes<HTMLDivElement> {
	selected?: boolean
	removable?: boolean
	disabled?: boolean | null
	variant?: 'outlined' | 'elevated'
	label?: string
	icon?: Snippet
	/** Trailing icon, such as an arrow for a chip that opens a menu. Not shown when `removable`. */
	trailingIcon?: Snippet
	/** Defaults to "Remove" and the chip's label. */
	removeAriaLabel?: string
	element?: HTMLDivElement
	name?: string
	value?: string
	group?: (string | number)[] | null
	defaultSelected?: boolean | null
	onremove?: MouseEventHandler<ButtonElement>
	issues?: Issue[]
}

export interface InputChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onclick'> {
	selected?: boolean
	disabled?: boolean | null
	variant?: 'outlined' | 'elevated'
	label?: string
	icon?: Snippet
	/** A 24px leading image, such as a person's photo. Takes the place of `icon`. */
	avatar?: Snippet
	/** Defaults to "Remove" and the chip's label. */
	removeAriaLabel?: string
	element?: HTMLDivElement
	actionElement?: HTMLButtonElement
	name?: string
	value?: string | number
	onclick?: MouseEventHandler<HTMLButtonElement>
	onremove?: MouseEventHandler<ButtonElement>
	issues?: Issue[]
}

export interface ChipSetContext {
	chips: { label: string; name: string | undefined; value: string | number | undefined }[]
}
