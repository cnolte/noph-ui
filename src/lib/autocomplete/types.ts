import type { BaseOption } from '#lib/shared/types.js'
import type { TextFieldProps } from '#lib/types.js'

export interface AutoCompleteOption extends BaseOption {
	/** Falls back to `label`. */
	value?: string | number
}

export interface AutoCompleteProps extends Omit<TextFieldProps, 'clientWidth' | 'clientHeight'> {
	options: AutoCompleteOption[]
	optionsFilter?: (option: AutoCompleteOption) => boolean
	onoptionselect?: (option: AutoCompleteOption, menuElement: HTMLDivElement) => void
	clampMenuWidth?: boolean
	virtualThreshold?: number
	open?: boolean
}
