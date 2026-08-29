import type { ButtonElement } from '#lib/button/types.js'
import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type FabElement = ButtonElement

interface BaseFabProps
	extends
		HTMLAttributes<FabElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	element?: FabElement
	variant?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'primary-container'
		| 'secondary-container'
		| 'tertiary-container'
	size?: 's' | 'm' | 'l'
	shape?: 'round' | 'square'
	lowered?: boolean
	disabled?: boolean | null
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
}

export interface FabProps extends BaseFabProps {
	icon?: Snippet
	label?: string
}

export interface ExtendedFabProps extends BaseFabProps {
	icon?: Snippet
	label?: string
	collapsed?: boolean
}

export interface FabMenuProps extends HTMLAttributes<HTMLDivElement> {
	label?: string
	icon?: Snippet
	closeIcon?: Snippet
	variant?: FabProps['variant']
	size?: FabProps['size']
	placement?: 'block-start' | 'block-end' | 'inline-start' | 'inline-end'
	open?: boolean
	closeOnSelect?: boolean
	element?: HTMLDivElement
}
