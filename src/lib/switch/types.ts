import type { HTMLInputAttributes } from 'svelte/elements'

export interface SwitchProps extends Omit<
	HTMLInputAttributes,
	'type' | 'role' | 'checked' | 'indeterminate'
> {
	selected?: boolean
	disabled?: boolean
	icons?: 'selected' | 'both'
	inputElement?: HTMLInputElement
	element?: HTMLDivElement
}
