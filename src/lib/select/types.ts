import type { Snippet } from 'svelte'
import type { HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements'

export interface SelectOption {
	value: string | number
	label: string
	disabled?: boolean
	selected?: boolean | undefined | null
}

export interface SelectProps extends Omit<HTMLSelectAttributes, 'size' | 'autocomplete'> {
	label?: string
	supportingText?: string
	issues?: {
		message: string
	}[]
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
	options: SelectOption[]
	clampMenuWidth?: boolean
	virtualThreshold?: number
}

export interface NativeSelectProps extends HTMLSelectAttributes {
	label?: string
	noAsterisk?: boolean
	supportingText?: string
	issues?:
		| {
				message: string
		  }[]
		| undefined
	variant?: 'outlined' | 'filled'
	element?: HTMLDivElement
}

export interface OptionProps extends HTMLOptionAttributes {
	start?: Snippet
	end?: Snippet
}
