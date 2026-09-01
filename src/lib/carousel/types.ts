import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type CarouselVariant = 'multi-browse' | 'uncontained' | 'hero' | 'full-screen'
export type CarouselAlignment = 'start' | 'center'
export type CarouselOrientation = 'horizontal' | 'vertical'

export type CarouselItemElement = HTMLDivElement | HTMLButtonElement | HTMLAnchorElement

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	variant?: CarouselVariant
	alignment?: CarouselAlignment
	orientation?: CarouselOrientation
	snap?: boolean
	label?: string | null
	itemLabel?: (label: string, position: number, total: number) => string
	children?: Snippet
	scroller?: HTMLDivElement
	element?: HTMLDivElement
}

export interface CarouselItemProps
	extends
		HTMLAttributes<CarouselItemElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	type: 'text' | 'button' | 'link'
	label?: string | null
	image?: string | null
	aspectRatio?: number | null
	disabled?: boolean | null
	children?: Snippet
	element?: CarouselItemElement
}

export interface CarouselContext {
	items: CarouselItemElement[]
	position: (item: CarouselItemElement) => number
	itemLabel: (label: string, position: number, total: number) => string
}
