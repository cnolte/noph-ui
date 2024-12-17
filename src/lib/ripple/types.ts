import type { HTMLAttributes } from 'svelte/elements'

export interface RippleProps extends HTMLAttributes<HTMLDivElement> {
	forceHover?: boolean
	element?: HTMLDivElement
	forElement?: HTMLElement
}
