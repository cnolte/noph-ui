import type { HTMLAttributes } from 'svelte/elements'

export interface ToolbarProps extends HTMLAttributes<HTMLElement> {
	/**
	 * `'docked'` spans the full width of its container and sits flush against an edge, for actions
	 * that stay the same across pages. It replaces M3's deprecated bottom app bar. `'floating'`
	 * hovers above the content as a rounded island, for actions specific to the page.
	 */
	variant?: 'docked' | 'floating'
	/** Which edge a floating toolbar hovers against. Ignored when docked. */
	placement?: 'bottom' | 'top' | 'start' | 'end'
	orientation?: 'horizontal' | 'vertical'
	/** Colour role of a floating toolbar's container. */
	color?: 'standard' | 'vibrant'
	element?: HTMLElement
}
