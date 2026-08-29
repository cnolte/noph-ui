import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
	/**
	 * M3 Expressive's four: `'search'` carries a search field instead of a headline and is the
	 * emphasised, global entry point to search. `'small'` is one row. `'medium'` and `'large'` are
	 * the flexible variants, putting the headline on a second line below the action row.
	 */
	variant?: 'search' | 'small' | 'medium' | 'large'
	/** Named `headline` rather than `title`, which is the native tooltip attribute. */
	headline?: string
	/** Secondary line under the headline. */
	subtitle?: string
	/** Leading action, usually a navigation or back icon button. */
	leading?: Snippet
	/**
	 * The search field for `variant="search"`. Put a `Search` here. Replaces the headline, which a
	 * search app bar does not show.
	 */
	search?: Snippet
	/** Trailing actions. */
	trailing?: Snippet
	/**
	 * Collapses a `medium` or `large` bar down to one row as the page scrolls. Driven by
	 * `animation-timeline: scroll()`, so there is no scroll listener. Where that is unsupported the
	 * bar simply stays expanded.
	 */
	collapsible?: boolean
	/**
	 * The element the collapse is tied to. `'root'` (the default) follows the page scroller; pass a
	 * different scroll container's axis with `'nearest'` when the bar sits inside one.
	 */
	scroller?: 'root' | 'nearest'
	element?: HTMLElement
}
