import type { Snippet } from 'svelte'
import type { ElementKindProps } from '#lib/internal/elementTag.js'
import type { HTMLAttributes } from 'svelte/elements'

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

export interface CarouselItemProps extends ElementKindProps<CarouselItemElement> {
	label?: string | null
	image?: string | null
	/** Describes `image` for assistive technology. Leave it out for a decorative image. */
	imageAlt?: string
	aspectRatio?: number | null
	children?: Snippet
	element?: CarouselItemElement
}

export interface CarouselContext {
	items: CarouselItemElement[]
	position: (item: CarouselItemElement) => number
	itemLabel: (label: string, position: number, total: number) => string
}
