import type { Snippet } from 'svelte'
import type { HTMLSelectAttributes } from 'svelte/elements'

export interface SelectProps
	extends Omit<HTMLSelectAttributes, 'multiple' | 'size' | 'autocomplete'> {
	label?: string
	supportingText?: string
	error?: boolean
	errorText?: string
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
	options: { value: string | number; label: string; selected?: boolean | undefined | null }[]
}
