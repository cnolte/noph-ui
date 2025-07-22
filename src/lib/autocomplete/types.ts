import type { InputFieldProps } from '$lib/types.ts'

export interface AutoCompleteOption {
	value?: string | number
	label: string
	disabled?: boolean
	selected?: boolean | undefined | null
}

export interface AutoCompleteProps extends Omit<InputFieldProps, 'clientWidth' | 'clientHeight'> {
	options: AutoCompleteOption[]
	optionsFilter?: (option: AutoCompleteOption) => boolean
	onoptionselect?: (option: AutoCompleteOption) => void
	clampMenuWidth?: boolean
	showPopover?: () => void
	hidePopover?: () => void
}
