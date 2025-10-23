import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	children: Snippet
	anchor?: HTMLElement | undefined
	showPopover?: () => void
	hidePopover?: () => void
	element?: HTMLDivElement
	open?: boolean
}

interface ButtonProps extends HTMLButtonAttributes {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	supportingText?: Snippet
	lazy?: boolean
}
interface AnchorProps extends HTMLAnchorAttributes {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	disabled?: boolean
	supportingText?: Snippet
	lazy?: boolean
}
export type MenuItemProps = ButtonProps | AnchorProps
