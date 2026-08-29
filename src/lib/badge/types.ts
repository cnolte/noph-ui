import type { HTMLAttributes } from 'svelte/elements'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
	label?: string | number
	element?: HTMLDivElement
}
