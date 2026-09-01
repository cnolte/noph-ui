import { createContext } from 'svelte'
import type { CarouselContext } from './types.ts'

export const [getCarouselContext, setCarouselContext] = createContext<CarouselContext>()
