import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
	children: Snippet
	element?: HTMLSpanElement
}
