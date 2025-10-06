import type { Snippet } from 'svelte'
import type { HTMLSelectAttributes } from 'svelte/elements'

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
