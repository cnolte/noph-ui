import type { Snippet } from 'svelte'
import type { HTMLSelectAttributes } from 'svelte/elements'

export interface SelectProps extends HTMLSelectAttributes {
	label?: string
	supportingText?: string
	error?: boolean
	errorText?: string
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
	options: { value: string | number; label: string }[]
}
