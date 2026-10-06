import type { BaseOption, Issue } from '#lib/shared/types.js'
import type { Snippet } from 'svelte'
import type { HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements'

export interface SelectOption extends BaseOption {
	value: string | number
	disabled?: boolean
	selected?: boolean | undefined | null
}

export interface SelectProps extends Omit<HTMLSelectAttributes, 'size' | 'autocomplete'> {
	label?: string
	supportingText?: string
	issues?: Issue[]
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
	issues?: Issue[]
	variant?: 'outlined' | 'filled'
	element?: HTMLDivElement
}

export interface OptionProps extends HTMLOptionAttributes {
	start?: Snippet
	end?: Snippet
}
