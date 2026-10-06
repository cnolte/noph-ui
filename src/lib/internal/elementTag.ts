import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

type ElementTag = 'a' | 'button' | 'div'

export type ElementKind = 'text' | 'link' | 'button' | 'submit' | 'reset'

/** The props of a component that renders static content, a link or a button, see `elementTag`. */
export interface ElementKindProps<E extends EventTarget>
	extends
		HTMLAttributes<E>,
		Omit<HTMLButtonAttributes, keyof HTMLAttributes<HTMLButtonElement> | 'type'>,
		Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement> | 'type'> {
	/**
	 * The element to render. Leave it out to follow `href` and `onclick`. `text` renders static
	 * content, `link` a link, and `button`, `submit` or `reset` a button of that type.
	 */
	type?: ElementKind | null
}

interface TagAttributes {
	href?: string | null
	onclick?: unknown
	command?: unknown
	popovertarget?: unknown
}

/**
 * Picks the element for a component that can be static content, a link or a button. An explicit
 * kind wins: `text`, `link`, or a native button type. Without one, `href` makes a link and a click
 * handler, `command` or `popovertarget` makes a button.
 */
export const elementTag = (attributes: TagAttributes, kind?: ElementKind | null): ElementTag => {
	if (kind === 'text') return 'div'
	if (kind === 'link') return 'a'
	if (kind === 'button' || kind === 'submit' || kind === 'reset') return 'button'
	if (attributes.href != null) return 'a'
	if (
		attributes.onclick != null ||
		attributes.command != null ||
		attributes.popovertarget != null
	) {
		return 'button'
	}
	return 'div'
}

/** The native `type` for the button branch. Anything that is not a native button type becomes `button`. */
export const buttonType = (kind?: ElementKind | null) =>
	kind === 'submit' || kind === 'reset' ? kind : 'button'
