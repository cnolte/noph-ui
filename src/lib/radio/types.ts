import type { HTMLInputAttributes } from 'svelte/elements'

export type RadioProps = Omit<HTMLInputAttributes, 'class' | 'type'>
