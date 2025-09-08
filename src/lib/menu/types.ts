import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

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
}
interface AnchorProps extends HTMLAnchorAttributes {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	disabled?: boolean
	supportingText?: Snippet
}
export type MenuItemProps = ButtonProps | AnchorProps
