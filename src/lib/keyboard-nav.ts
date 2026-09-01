import type { Attachment } from 'svelte/attachments'
import { on } from 'svelte/events'

const focusable = (items: HTMLElement[]) => items.filter((item) => !item.matches(':disabled'))

const focusedItem = (node: HTMLElement, itemSelector: string, items: HTMLElement[]) => {
	const active = document.activeElement
	if (!(active instanceof HTMLElement) || !node.contains(active)) return null
	const item = active.closest<HTMLElement>(itemSelector)
	return item && items.includes(item) ? item : null
}

export const rovingTabindex = (
	itemSelector: string,
	options: { currentAttr?: string; currentValue?: string } = {},
): Attachment<HTMLElement> => {
	const { currentAttr = 'aria-current', currentValue = 'page' } = options
	return (node) => {
		const getItems = () => focusable(Array.from(node.querySelectorAll<HTMLElement>(itemSelector)))

		const setTabstop = (target: HTMLElement) => {
			for (const i of getItems()) {
				const wanted = i === target ? 0 : -1
				if (i.tabIndex !== wanted) i.tabIndex = wanted
			}
		}

		const sync = () => {
			const items = getItems()
			if (items.length === 0) return
			const focused = focusedItem(node, itemSelector, items)
			const current = items.find((i) => i.getAttribute(currentAttr) === currentValue)
			setTabstop(focused ?? current ?? items[0])
		}

		const onFocusIn = (event: FocusEvent) => {
			const target = (event.target as HTMLElement).closest<HTMLElement>(itemSelector)
			if (!target || !node.contains(target) || target.tabIndex === 0) return
			setTabstop(target)
		}

		sync()
		const offFocusIn = on(node, 'focusin', onFocusIn)
		const observer = new MutationObserver(sync)
		observer.observe(node, {
			attributes: true,
			attributeFilter: [currentAttr],
			subtree: true,
			childList: true,
		})

		return () => {
			offFocusIn()
			observer.disconnect()
		}
	}
}

export const arrowKeyNav =
	(
		itemSelector: string,
		orientation: 'vertical' | 'horizontal' = 'vertical',
		{ wrap = true }: { wrap?: boolean } = {},
	) =>
	(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const [prev, next] =
			orientation === 'vertical'
				? (['ArrowUp', 'ArrowDown'] as const)
				: (['ArrowLeft', 'ArrowRight'] as const)
		const { key } = event
		if (key !== prev && key !== next && key !== 'Home' && key !== 'End') return

		const items = focusable(
			Array.from(event.currentTarget.querySelectorAll<HTMLElement>(itemSelector)),
		)
		if (items.length === 0) return

		const focused = focusedItem(event.currentTarget, itemSelector, items)
		if (!focused) return
		const currentIndex = items.indexOf(focused)

		let target: HTMLElement
		if (key === 'Home') {
			target = items[0]
		} else if (key === 'End') {
			target = items[items.length - 1]
		} else {
			const delta = key === next ? 1 : -1
			const index = currentIndex + delta
			// `delta` is only ever ±1, so wrapping is one modulo and clamping is one clamp.
			target =
				items[
					wrap
						? (index + items.length) % items.length
						: Math.min(Math.max(index, 0), items.length - 1)
				]
		}
		target.focus()
		event.preventDefault()
	}
