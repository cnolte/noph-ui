import type { HTMLAttributes } from 'svelte/elements'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
	keepTooltipOnClick?: boolean
	element?: HTMLDivElement
}
