import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'

export type SliderSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export interface SliderProps extends Omit<
	HTMLInputAttributes,
	'type' | 'value' | 'size' | 'min' | 'max' | 'step' | 'orientation' | 'children'
> {
	value?: number
	endValue?: number
	min?: number
	max?: number
	step?: number
	size?: SliderSize
	orientation?: 'horizontal' | 'vertical'
	range?: boolean
	centered?: boolean
	labeled?: boolean
	ticks?: boolean
	disabled?: boolean
	format?: (value: number) => string
	icon?: Snippet
	endInputAttributes?: HTMLInputAttributes
	element?: HTMLDivElement
	inputElement?: HTMLInputElement
	endInputElement?: HTMLInputElement
}
