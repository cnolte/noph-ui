import { getContext, setContext } from 'svelte'

export interface NavigationRailContext {
	readonly expanded: boolean
}

const KEY = Symbol('np-navigation-rail')

export const setNavigationRailContext = (context: NavigationRailContext) => setContext(KEY, context)

/** The surrounding rail, or undefined for an item rendered on its own. */
export const getNavigationRailContext = () => getContext<NavigationRailContext | undefined>(KEY)
