import { getContext, setContext } from 'svelte'

/** What a `ButtonGroup` decides for its buttons: their size and shape, and with `selection` which are selected. */
export interface ButtonGroupContext {
	readonly selection: 'single' | 'multiple' | undefined
	readonly size: 'xs' | 's' | 'm' | 'l' | 'xl' | undefined
	readonly shape: 'round' | 'square' | undefined
	isSelected: (value: string) => boolean
	toggle: (value: string) => void
}

const key = Symbol('np-button-group')

export const setButtonGroupContext = (context: ButtonGroupContext) => setContext(key, context)
export const getButtonGroupContext = () => getContext<ButtonGroupContext | undefined>(key)
