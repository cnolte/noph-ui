import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

interface ButtonButtonProps extends HTMLButtonAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
	start?: Snippet | undefined
	end?: Snippet | undefined
	element?: HTMLElement
	disabled?: boolean
	keepTooltipOnClick?: boolean
}
interface ButtonAnchorProps extends HTMLAnchorAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
	start?: Snippet
	end?: Snippet
	element?: HTMLElement
	keepTooltipOnClick?: boolean
	disabled?: boolean
}

interface IconButtonButtonProps extends HTMLButtonAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'tonal'
	element?: HTMLElement
	toggle?: boolean
	selected?: boolean
	keepTooltipOnClick?: boolean
	selectedIcon?: Snippet
}
interface IconButtonAnchorProps extends HTMLAnchorAttributes {
	variant?: 'text' | 'filled' | 'outlined' | 'tonal'
	element?: HTMLElement
	disabled?: boolean
	toggle?: boolean
	selected?: boolean
	keepTooltipOnClick?: boolean
	selectedIcon?: Snippet
}

export type IconButtonProps = IconButtonButtonProps | IconButtonAnchorProps
export type ButtonProps = ButtonButtonProps | ButtonAnchorProps

export interface SegmentedButtonProps extends HTMLAttributes<HTMLDivElement> {
	name: string
	multiSelect?: boolean
	options: {
		label: string | Snippet
		selected?: boolean
		disabled?: boolean
		icon?: Snippet
		onclick?: (event: Event) => void
	}[]
	element?: HTMLElement
}
