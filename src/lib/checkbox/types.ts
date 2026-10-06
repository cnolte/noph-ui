import type { Issue } from '#lib/shared/types.js'
import type { HTMLInputAttributes } from 'svelte/elements'

export interface CheckboxProps extends Omit<HTMLInputAttributes, 'type'> {
	element?: HTMLElement
	group?: (string | number)[] | null
	issues?: Issue[]
}
