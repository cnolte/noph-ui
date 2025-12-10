import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

interface ButtonButtonProps extends HTMLButtonAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
	start?: Snippet | undefined
	end?: Snippet | undefined
	element?: HTMLElement
	disabled?: boolean
	loading?: boolean
	loadingAriaLabel?: string
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	toggle?: boolean
	shape?: 'round' | 'square'
	selected?: boolean
}
interface ButtonAnchorProps extends HTMLAnchorAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
	start?: Snippet
	end?: Snippet
	element?: HTMLElement
	disabled?: boolean
	loading?: boolean
	loadingAriaLabel?: string
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	toggle?: boolean
	shape?: 'round' | 'square'
	selected?: boolean
}

interface IconButtonButtonProps extends HTMLButtonAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'tonal'
	element?: HTMLElement
	toggle?: boolean
	selected?: boolean
	loading?: boolean
	loadingAriaLabel?: string
	selectedIcon?: Snippet
	shape?: 'round' | 'square'
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	width?: 'narrow' | 'wide' | 'default'
}
interface IconButtonAnchorProps extends HTMLAnchorAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'tonal'
	element?: HTMLElement
	disabled?: boolean
	loading?: boolean
	loadingAriaLabel?: string
	toggle?: boolean
	selected?: boolean
	selectedIcon?: Snippet
	shape?: 'round' | 'square'
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	width?: 'narrow' | 'wide' | 'default'
}

export type IconButtonProps = IconButtonButtonProps | IconButtonAnchorProps
export type ButtonProps = ButtonButtonProps | ButtonAnchorProps

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
