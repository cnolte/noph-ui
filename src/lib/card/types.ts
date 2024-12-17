import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

interface TextProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'elevated' | 'filled' | 'outlined'
	disabled?: boolean
	image?: string | undefined
	element?: HTMLElement
	headline?: string | undefined
	subhead?: string
	supportingText?: string
	action?: Snippet
	type: 'text'
}
interface ButtonProps extends HTMLButtonAttributes {
	variant?: 'elevated' | 'filled' | 'outlined'
	disabled?: boolean
	image?: string | undefined
	element?: HTMLElement
	headline?: string | undefined
	subhead?: string
	supportingText?: string
	action?: Snippet
	type: 'button'
}
interface AnchorProps extends HTMLAnchorAttributes {
	variant?: 'elevated' | 'filled' | 'outlined'
	disabled?: boolean
	image?: string | undefined
	element?: HTMLElement
	headline?: string | undefined
	subhead?: string
	supportingText?: string
	action?: Snippet
	type: 'link'
}

export type CardProps = TextProps | ButtonProps | AnchorProps
