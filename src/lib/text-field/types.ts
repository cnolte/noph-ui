import type { FieldProps } from '#lib/internal/fieldTypes.js'
import type { HTMLAttributes, HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'

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
	minLines?: number
	maxLines?: number
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
	defaultValue?: string | number | null
	minLines?: number
	maxLines?: number
}
