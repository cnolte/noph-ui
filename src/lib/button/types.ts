import type { Snippet } from 'svelte'
import type {
	HTMLAnchorAttributes,
	HTMLAttributes,
	HTMLButtonAttributes,
	MouseEventHandler,
} from 'svelte/elements'

export type ButtonElement = HTMLButtonElement | HTMLAnchorElement

export interface BaseButtonProps
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

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'standard' | 'connected'
	expandedRatio?: number
	compressionLimit?: number
	element?: HTMLElement
}

export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onclick'> {
	/** Text of the leading action. */
	label?: string
	/** Leading icon on the action half. */
	icon?: Snippet
	/** Menu items for the trailing half. Rendered inside a `Menu`. */
	menu?: Snippet<[string]>
	variant?: Exclude<ButtonProps['variant'], 'text'>
	size?: BaseButtonProps['size']
	disabled?: boolean | null
	/** Bindable. Whether the menu is open. */
	open?: boolean
	/** Accessible name for the trailing half, which shows only a caret. */
	menuLabel?: string
	/** The action half's click handler. The trailing half opens the menu instead. */
	onclick?: MouseEventHandler<ButtonElement>
	element?: HTMLElement
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
	issues?: { message: string }[]
}
