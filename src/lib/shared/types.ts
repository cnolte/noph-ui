import type { ItemProps } from '#lib/list/types.js'

/** A validation message shown under a form control. */
export interface Issue {
	message: string
}

/** What every option in a Select or AutoComplete menu can carry. Each is rendered as an `Item`. */
export interface BaseOption extends Pick<
	ItemProps,
	'start' | 'end' | 'supportingText' | 'class' | 'style'
> {
	label: string
}
