import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements'

export interface SearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onsearch'> {
	/** Bindable. The query. */
	value?: string
	/** Hinted search text, shown while the field is empty. */
	placeholder?: string
	/** Bindable. Whether the results are showing. */
	expanded?: boolean
	/**
	 * `'contained'` keeps the field's pill shape and colour while expanded, which M3 recommends.
	 * `'divided'` squares the field off against the results and separates them with a divider.
	 */
	variant?: 'contained' | 'divided'
	/** `'docked'` drops the results under the field. `'full-screen'` covers the viewport. */
	view?: 'docked' | 'full-screen'
	/** Leading slot. Defaults to a search icon, or a back arrow once expanded. */
	leading?: Snippet
	/** Trailing slot, for an avatar or actions. A clear button is shown alongside it. */
	trailing?: Snippet
	/** Accessible name for the field. */
	label?: string
	/** Accessible name for the clear button. */
	clearLabel?: string
	/** Accessible name for the back action shown while expanded. */
	backLabel?: string
	/** Fired on the Enter key, with the current query. */
	onsearch?: (value: string) => void
	/** Extra attributes for the underlying `input`. */
	inputAttributes?: HTMLInputAttributes
	/**
	 * Extra attributes for the container holding the suggestions or results. It carries no role of
	 * its own, so this is where the content's semantics go: `role="listbox"` when the children
	 * really are options, nothing when they are a list, categories or chips.
	 */
	resultsAttributes?: HTMLAttributes<HTMLDivElement>
	element?: HTMLDivElement
	inputElement?: HTMLInputElement
}
