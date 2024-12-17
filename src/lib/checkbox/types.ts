import type { HTMLInputAttributes } from 'svelte/elements'

export type CheckboxProps = Omit<HTMLInputAttributes, 'class' | 'type'>
