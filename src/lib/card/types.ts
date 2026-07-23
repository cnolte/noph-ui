import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type CardElement = HTMLDivElement | HTMLButtonElement | HTMLAnchorElement

export interface CardProps
	extends
		HTMLAttributes<CardElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	variant?: 'elevated' | 'filled' | 'outlined'
	disabled?: boolean
	image?: string | null
	element?: HTMLElement
	headline?: string | null
	subhead?: string | null
	supportingText?: string | null
	action?: Snippet<[]>
	type: 'text' | 'button' | 'link'
}
