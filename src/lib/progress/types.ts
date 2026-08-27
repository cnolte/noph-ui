import type { HTMLAttributes } from 'svelte/elements'

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
	value?: number
	max?: number
	indeterminate?: boolean
	fourColor?: boolean
	track?: boolean
	wavy?: boolean
	element?: HTMLDivElement
}

export interface LinearProgressProps extends CircularProgressProps {
	buffer?: number
}
