import type { HTMLInputAttributes } from 'svelte/elements'

export interface RadioProps extends Omit<HTMLInputAttributes, 'type'> {
	element?: HTMLElement
	group?: string | number | null
}
