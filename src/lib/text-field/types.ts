import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

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

export type TextFieldType =
	| 'text'
	| 'password'
	| 'email'
	| 'number'
	| 'search'
	| 'tel'
	| 'url'
	| 'datetime-local'
	| 'date'
	| 'datetime'
	| 'time'

export type TextFieldElement = HTMLInputElement | HTMLTextAreaElement

export interface InputFieldProps extends HTMLInputAttributes, FieldProps {
	type?: TextFieldType
}

export interface TextAreaFieldProps extends HTMLTextareaAttributes, FieldProps {
	type: 'textarea'
}

export interface TextFieldProps
	extends
		HTMLAttributes<TextFieldElement>,
		Omit<
			HTMLInputAttributes,
			keyof HTMLAttributes<HTMLInputElement> | 'type' | 'value' | 'defaultValue' | 'defaultvalue'
		>,
		Omit<
			HTMLTextareaAttributes,
			keyof HTMLAttributes<HTMLTextAreaElement> | 'value' | 'defaultValue' | 'defaultvalue'
		>,
		FieldProps {
	type?: TextFieldType | 'textarea'
	value?: string | number | null
}
