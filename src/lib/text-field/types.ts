import type { Snippet } from 'svelte'
import type { ClassValue, HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

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
	inputElement?: HTMLInputElement | HTMLTextAreaElement
	populated?: boolean
	inputClass?: ClassValue
	reportValidity?: () => boolean
	checkValidity?: () => boolean
}

export interface InputFieldProps extends HTMLInputAttributes, FieldProps {
	type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'datetime-local'
}

export interface TextAreaFieldProps extends HTMLTextareaAttributes, FieldProps {
	type: 'textarea'
}

export type TextFieldProps = InputFieldProps | TextAreaFieldProps
