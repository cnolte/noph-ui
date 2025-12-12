import type { InputFieldProps } from '$lib/types.ts'
import type { Snippet } from 'svelte'

export interface AutoCompleteOption {
	value?: string | number
	label: string
	start?: Snippet
	end?: Snippet
}

export interface AutoCompleteProps extends Omit<InputFieldProps, 'clientWidth' | 'clientHeight'> {
	options: AutoCompleteOption[]
	optionsFilter?: (option: AutoCompleteOption) => boolean
	onoptionselect?: (option: AutoCompleteOption, menuElement: HTMLDivElement) => void
	clampMenuWidth?: boolean
	showPopover?: () => void
	hidePopover?: () => void
	virtualThreshold?: number
	menuOpen?: boolean
}
