import type { Snippet } from 'svelte'
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

interface FieldProps {
	label?: string
	supportingText?: string
	issues?: {
		message: string
	}[]
	prefixText?: string
	suffixText?: string
	variant?: 'outlined' | 'filled'
	start?: Snippet
	end?: Snippet
	noAsterisk?: boolean
	element?: HTMLSpanElement
	inputElement?: HTMLInputElement | HTMLTextAreaElement
	populated?: boolean
	clientWidth?: number
	clientHeight?: number
	focused?: boolean
}

export interface InputFieldProps extends HTMLInputAttributes, FieldProps {
	type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'datetime-local'
}

export interface TextAreaFieldProps extends HTMLTextareaAttributes, FieldProps {
	type: 'textarea'
}

export type TextFieldProps = InputFieldProps | TextAreaFieldProps
