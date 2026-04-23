import type { Attachment } from 'svelte/attachments'

export const rovingTabindex = (
	itemSelector: string,
	options: { currentAttr?: string; currentValue?: string } = {},
): Attachment<HTMLElement> => {
	const { currentAttr = 'aria-current', currentValue = 'page' } = options
	return (node) => {
		const getItems = () => Array.from(node.querySelectorAll<HTMLElement>(itemSelector))

		const setTabstop = (target: HTMLElement) => {
			for (const i of getItems()) {
				const wanted = i === target ? 0 : -1
				if (i.tabIndex !== wanted) i.tabIndex = wanted
			}
		}

		const sync = () => {
			const items = getItems()
			if (items.length === 0) return
			const focused = node.querySelector<HTMLElement>(`${itemSelector}:focus`)
			const current = items.find((i) => i.getAttribute(currentAttr) === currentValue)
			setTabstop(focused ?? current ?? items[0])
		}

		const onFocusIn = (event: FocusEvent) => {
			const target = (event.target as HTMLElement).closest<HTMLElement>(itemSelector)
			if (!target || !node.contains(target) || target.tabIndex === 0) return
			setTabstop(target)
		}

		sync()
		node.addEventListener('focusin', onFocusIn)
		const observer = new MutationObserver(sync)
		observer.observe(node, {
			attributes: true,
			attributeFilter: [currentAttr],
			subtree: true,
			childList: true,
		})

		return () => {
			node.removeEventListener('focusin', onFocusIn)
			observer.disconnect()
		}
	}
}

export const arrowKeyNav =
	(itemSelector: string, orientation: 'vertical' | 'horizontal' = 'vertical') =>
	(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const [prev, next] =
			orientation === 'vertical'
				? (['ArrowUp', 'ArrowDown'] as const)
				: (['ArrowLeft', 'ArrowRight'] as const)
		const { key } = event
		if (key !== prev && key !== next && key !== 'Home' && key !== 'End') return

		const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(itemSelector))
		if (items.length === 0) return

		const focused = event.currentTarget.querySelector<HTMLElement>(`${itemSelector}:focus`)
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
			target = index < 0 ? items[items.length - 1] : index >= items.length ? items[0] : items[index]
		}
		target.focus()
		event.preventDefault()
	}
