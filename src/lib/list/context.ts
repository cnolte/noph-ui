import { getContext, setContext } from 'svelte'

/** Tells the items of a `List` with `selection` to be options of a listbox. */
export interface ListContext {
	readonly selection: 'single' | 'multiple' | undefined
}

const key = Symbol('np-list')

export const setListContext = (context: ListContext) => setContext(key, context)
export const getListContext = () => getContext<ListContext | undefined>(key)
