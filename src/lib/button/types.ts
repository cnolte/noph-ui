import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type ButtonElement = HTMLButtonElement | HTMLAnchorElement

interface BaseButtonProps
	extends
		HTMLAttributes<ButtonElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	element?: HTMLElement
	disabled?: boolean | null
	loading?: boolean
	loadingAriaLabel?: string
	toggle?: boolean
	selected?: boolean
	shape?: 'round' | 'square'
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
}

export interface ButtonProps extends BaseButtonProps {
	variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
	start?: Snippet
	end?: Snippet
}

export interface IconButtonProps extends BaseButtonProps {
	variant?: 'text' | 'filled' | 'outlined' | 'tonal'
	selectedIcon?: Snippet
	width?: 'narrow' | 'wide' | 'default'
}

export interface SegmentedButtonProps extends HTMLAttributes<HTMLDivElement> {
	name: string
	multiSelect?: boolean
	options: {
		label?: string
		labelIcon?: Snippet
		selected?: boolean
		disabled?: boolean
		icon?: Snippet
		onclick?: (event: Event) => void
	}[]
	group?: string | number | (string | number)[] | null
	element?: HTMLElement
}
