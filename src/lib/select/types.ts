import type { HTMLAttributes } from 'svelte/elements'

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
	forceHover?: boolean
	element?: HTMLDivElement
	forElement?: HTMLElement
}
