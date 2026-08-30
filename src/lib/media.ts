import { MediaQuery } from 'svelte/reactivity'

export const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false)
export const forcedColors = new MediaQuery('(forced-colors: active)', false)
export const coarsePointer = new MediaQuery('(hover: none) and (pointer: coarse)', false)
