import type { HTMLInputAttributes } from 'svelte/elements'

type SliderSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export interface SliderProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	value?: number
	min?: number
	max?: number
	step?: number | 'any'
	disabled?: boolean
	showValue?: boolean
	size?: SliderSize
	stops?: boolean
	endStop?: boolean
	vertical?: boolean
	inputElement?: HTMLInputElement
	element?: HTMLDivElement
	label?: string
	format?: (n: number) => string
}
