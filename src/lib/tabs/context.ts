import { createContext } from 'svelte'
import type { TabsContext } from './types.ts'

export const [getTabsContext, setTabsContext] = createContext<TabsContext>()
