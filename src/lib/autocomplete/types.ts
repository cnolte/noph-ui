import type { ItemProps } from '#lib/list/types.js'
import type { TextFieldProps } from '#lib/types.js'

export interface AutoCompleteOption extends Pick<
	ItemProps,
	'start' | 'end' | 'supportingText' | 'class' | 'style'
> {
	value?: string | number
	label: string
}

export interface AutoCompleteProps extends Omit<TextFieldProps, 'clientWidth' | 'clientHeight'> {
	options: AutoCompleteOption[]
	optionsFilter?: (option: AutoCompleteOption) => boolean
	onoptionselect?: (option: AutoCompleteOption, menuElement: HTMLDivElement) => void
	clampMenuWidth?: boolean
	virtualThreshold?: number
	open?: boolean
}
