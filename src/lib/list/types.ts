import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

interface ButtonProps extends HTMLButtonAttributes {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	variant: 'button'
	supportingText?: Snippet
}

interface AnchorProps extends HTMLAnchorAttributes {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	disabled?: boolean
	variant: 'link'
	supportingText?: Snippet
}
interface TextProps extends HTMLAttributes<HTMLDivElement> {
	selected?: boolean
	start?: Snippet
	end?: Snippet
	disabled?: boolean
	variant?: 'text'
	supportingText?: Snippet
}

export type ItemProps = ButtonProps | AnchorProps | TextProps
export type ListItemProps = ButtonProps | AnchorProps | TextProps
