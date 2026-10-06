import type { Snippet } from 'svelte'
import type { ElementKindProps } from '#lib/internal/elementTag.js'

export type CardElement = HTMLDivElement | HTMLButtonElement | HTMLAnchorElement

export interface CardProps extends ElementKindProps<CardElement> {
	variant?: 'elevated' | 'filled' | 'outlined'
	image?: string | null
	/** Describes `image` for assistive technology. Leave it out for a decorative image. */
	imageAlt?: string
	element?: HTMLElement
	headline?: string | null
	subhead?: string | null
	supportingText?: string | null
	action?: Snippet<[]>
}
