import type { HTMLInputAttributes } from 'svelte/elements'

export interface SwitchProps extends HTMLInputAttributes {
	checked?: boolean
	disabled?: boolean
	icons?: 'checked' | 'both' | 'none'
	inputElement?: HTMLInputElement
	element?: HTMLDivElement
}
