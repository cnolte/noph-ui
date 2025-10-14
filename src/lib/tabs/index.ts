import { createContext } from 'svelte'
import type { TabsContext } from './types.ts'

export { default as Tabs } from './Tabs.svelte'
export { default as Tab } from './Tab.svelte'

export const [getTabsContext, setTabsContext] = createContext<TabsContext>()
