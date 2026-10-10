import type { Issue } from '#lib/shared/types.js'
import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'

export interface FieldProps {
	label?: string
	supportingText?: string
	issues?: Issue[]
	prefixText?: string
	suffixText?: string
	/** Spoken in place of `prefixText`, for example "Euro" for "€". */
	prefixLabel?: string
	/** Spoken in place of `suffixText`, for example "at gmail dot com". */
	suffixLabel?: string
	/** Spoken before the character counter. */
	counterLabel?: string
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

/** The text field props the docked date and time pickers forward to their field. */
export interface DockedFieldProps
	extends
		Pick<
			FieldProps,
			'label' | 'supportingText' | 'issues' | 'variant' | 'noAsterisk' | 'start' | 'element'
		>,
		Pick<
			HTMLInputAttributes,
			'name' | 'form' | 'required' | 'disabled' | 'readonly' | 'autocomplete'
		> {
	open?: boolean
}
