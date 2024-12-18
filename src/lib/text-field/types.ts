import type { Snippet } from 'svelte'
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

export interface InputFieldProps extends Omit<HTMLInputAttributes, 'class'> {
	label?: string
	type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
	supportingText?: string
	error?: boolean
	errorText?: string
	prefixText?: string
	suffixText?: string
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
}

export interface TextAreaFieldProps extends Omit<HTMLTextareaAttributes, 'class'> {
	label?: string
	type: 'textarea'
	supportingText?: string
	error?: boolean
	errorText?: string
	prefixText?: string
	suffixText?: string
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
}

export type TextFieldProps = InputFieldProps | TextAreaFieldProps
