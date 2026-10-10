import type { Issue } from '#lib/shared/types.js'
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
	/** Size of the buttons that don't set their own. */
	size?: BaseButtonProps['size']
	/** Shape of the buttons that don't set their own. */
	shape?: BaseButtonProps['shape']
	/**
	 * Lets the group manage selection: its buttons with a `value` become toggles, and `value`
	 * holds the selected one (`single`) or the selected ones (`multiple`).
	 */
	selection?: 'single' | 'multiple'
	value?: string | string[] | null
	/** With `selection`, keeps at least one button selected and makes a form require one. */
	required?: boolean
	/** With `selection`, submits the selected values under this name, like a radio or checkbox group. */
	name?: string
	form?: string
	/** Arrow keys move between the buttons, which share one tab stop. Off, Tab visits each. */
	arrowKeys?: boolean
	expandedRatio?: number
	compressionLimit?: number
	element?: HTMLElement
}

export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onclick'> {
	label?: string
	/** Shows only `icon` on the leading button. `label` then names it and becomes its tooltip. */
	iconOnly?: boolean
	icon?: Snippet
	menu?: Snippet<[string]>
	variant?: Exclude<ButtonProps['variant'], 'text'>
	size?: BaseButtonProps['size']
	disabled?: boolean | null
	open?: boolean
	menuLabel?: string
	onclick?: MouseEventHandler<ButtonElement>
	element?: HTMLElement
}

export interface SegmentedButtonOption {
	/** Stored in `group` and submitted with the form. Falls back to `label`. */
	value?: string | number
	label?: string
	labelIcon?: Snippet
	selected?: boolean
	disabled?: boolean | null
	icon?: Snippet
	onclick?: (event: Event) => void
}

export interface SegmentedButtonProps extends HTMLAttributes<HTMLDivElement> {
	name: string
	multiSelect?: boolean
	options: SegmentedButtonOption[]
	group?: string | number | (string | number)[] | null
	element?: HTMLElement
	issues?: Issue[]
}
