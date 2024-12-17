import type { HTMLAttributes } from 'svelte/elements'

export interface DividerProps extends Omit<HTMLAttributes<HTMLElement>, 'role'> {
	variant?: 'full' | 'inset' | 'inset-middle'
}
