import type { HTMLAttributes } from 'svelte/elements'
import type { TimeOption } from './types.ts'

export interface TimeColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
	options: TimeOption[]
	value?: number
	onselect?: (value: number) => void
}
