import type { HTMLAttributes } from 'svelte/elements'

export interface LoadingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
	contained?: boolean
	element?: HTMLDivElement
}
