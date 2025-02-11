import type { Snippet } from 'svelte'
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

interface FieldProps {
	label?: string
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

export interface InputFieldProps extends HTMLInputAttributes, FieldProps {
	type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
}

export interface TextAreaFieldProps extends HTMLTextareaAttributes, FieldProps {
	type: 'textarea'
}

export type TextFieldProps = InputFieldProps | TextAreaFieldProps
