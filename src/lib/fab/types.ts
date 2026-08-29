import type { ButtonElement } from '#lib/button/types.js'
import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export type FabElement = ButtonElement

interface BaseFabProps
	extends
		HTMLAttributes<FabElement>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	element?: FabElement
	/**
	 * Colour style, named after the tokens it maps to. The three tone styles are the stronger
	 * pair, the three container styles the softer one. M3 Expressive no longer recommends a
	 * surface-coloured FAB, so there is no `surface`.
	 */
	variant?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'primary-container'
		| 'secondary-container'
		| 'tertiary-container'
	/**
	 * 56, 80 and 96 pixels, the same three `Fab` and `ExtendedFab` share. `s` is M3's baseline FAB
	 * and the default. The 40 pixel FAB is not here: M3 Expressive no longer recommends it.
	 */
	size?: 's' | 'm' | 'l'
	shape?: 'round' | 'square'
	lowered?: boolean
	disabled?: boolean | null
	type?: 'submit' | 'reset' | 'button' | (string & {}) | null
}

export interface FabProps extends BaseFabProps {
	icon?: Snippet
	/**
	 * A FAB shows no text, so its accessible name has to come from somewhere. Sets both
	 * `aria-label` and a plain tooltip, the way `Button` treats `title`.
	 */
	label?: string
}

export interface ExtendedFabProps extends BaseFabProps {
	icon?: Snippet
	/** Visible text. An extended FAB is named by it, so it needs no `aria-label`. */
	label?: string
	/**
	 * Collapses to an icon-only FAB, animating the width. Drive it from a scroll or a media query
	 * to get M3's collapsing FAB.
	 */
	collapsed?: boolean
}

export interface FabMenuProps extends HTMLAttributes<HTMLDivElement> {
	/** Names the trigger and the menu. The trigger shows no text. */
	label?: string
	/** Trigger icon while the menu is closed. */
	icon?: Snippet
	/** Trigger icon while the menu is open. Defaults to a close icon. */
	closeIcon?: Snippet
	variant?: FabProps['variant']
	size?: FabProps['size']
	/** Which side the items fan out to. */
	placement?: 'block-start' | 'block-end' | 'inline-start' | 'inline-end'
	/** Bindable. Whether the menu is open. */
	open?: boolean
	/** Closes the menu when an action is picked, which is what M3 does. */
	closeOnSelect?: boolean
	element?: HTMLDivElement
}
