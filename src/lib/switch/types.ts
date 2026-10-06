import type { Issue } from '#lib/shared/types.js'
import type { HTMLInputAttributes } from 'svelte/elements'

export interface SwitchProps extends Omit<
	HTMLInputAttributes,
	'type' | 'role' | 'checked' | 'indeterminate'
> {
	selected?: boolean
	icons?: 'selected' | 'both'
	inputElement?: HTMLInputElement
	element?: HTMLDivElement
	issues?: Issue[]
}
