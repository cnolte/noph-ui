import type { HTMLAttributes } from 'svelte/elements'

export interface ToolbarProps extends HTMLAttributes<HTMLElement> {
	variant?: 'docked' | 'floating'
	placement?: 'bottom' | 'top' | 'start' | 'end'
	orientation?: 'horizontal' | 'vertical'
	color?: 'standard' | 'vibrant'
	element?: HTMLElement
}
