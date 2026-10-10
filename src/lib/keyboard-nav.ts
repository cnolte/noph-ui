import type { Attachment } from 'svelte/attachments'
import { on } from 'svelte/events'

// Items inside a hidden part, such as a section shown only when expanded, cannot take focus.
export const focusableItems = (node: ParentNode, itemSelector: string) =>
	Array.from(node.querySelectorAll<HTMLElement>(itemSelector)).filter(
		(item) => !item.matches(':disabled') && !item.closest('[hidden]'),
	)

export const focusedItem = (node: HTMLElement, itemSelector: string, items: HTMLElement[]) => {
	const active = document.activeElement
	if (!(active instanceof HTMLElement) || !node.contains(active)) return null
	const item = active.closest<HTMLElement>(itemSelector)
	return item && items.includes(item) ? item : null
}

export const rovingTabindex = (
	itemSelector: string,
	options: {
		currentAttr?: string
		currentValue?: string
		/** Picks the current item by selector instead of `currentAttr` and `currentValue`. */
		current?: string
	} = {},
): Attachment<HTMLElement> => {
	const { currentAttr = 'aria-current', currentValue = 'page', current: currentSelector } = options
	return (node) => {
		const getItems = () => focusableItems(node, itemSelector)

		const setTabstop = (target: HTMLElement) => {
			for (const i of getItems()) {
				const wanted = i === target ? 0 : -1
				if (i.getAttribute('tabindex') !== String(wanted)) i.tabIndex = wanted
			}
		}

		const sync = () => {
			const items = getItems()
			if (items.length === 0) return
			const focused = focusedItem(node, itemSelector, items)
			const current = items.find((i) =>
				currentSelector ? i.matches(currentSelector) : i.getAttribute(currentAttr) === currentValue,
			)
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

// Inputs without text to edit, whose arrow keys are free to move between items.
const NOT_EDITED = ['button', 'checkbox', 'color', 'file', 'image', 'radio', 'reset', 'submit']

/**
 * Whether a field keeps an arrow, Home or End key for itself, so it moves the caret or changes the
 * value instead of moving to the next item. A caret leaves its field once it reaches the end it
 * moves towards.
 */
const fieldKeeps = (target: EventTarget | null, key: string, isNext: boolean) => {
	const upDown = key === 'ArrowUp' || key === 'ArrowDown'
	if (target instanceof HTMLSelectElement) return upDown
	if (target instanceof HTMLInputElement && NOT_EDITED.includes(target.type)) return false
	const textArea = target instanceof HTMLTextAreaElement
	if (!textArea && !(target instanceof HTMLInputElement)) {
		return target instanceof HTMLElement && target.isContentEditable
	}
	const field = target as HTMLInputElement | HTMLTextAreaElement
	// Email, number, date and range fields have no caret to read, so they keep every key.
	if (field.selectionStart === null) return true
	if (key === 'Home' || key === 'End') return true
	if (upDown) return textArea
	const { selectionStart: start, selectionEnd: end, value } = field
	if (start !== end) return true
	return isNext ? end < value.length : start > 0
}

export const arrowKeyNav =
	(
		itemSelector: string,
		// `both`: ↓ and → move on, ↑ and ← move back, as in a list whose items hold several actions.
		orientation: 'vertical' | 'horizontal' | 'both' = 'vertical',
		{ wrap = true }: { wrap?: boolean } = {},
	) =>
	(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const { key } = event
		if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return
		const rtl =
			orientation !== 'vertical' && getComputedStyle(event.currentTarget).direction === 'rtl'
		const [left, right] = rtl ? ['ArrowRight', 'ArrowLeft'] : ['ArrowLeft', 'ArrowRight']
		const [prev, next] =
			orientation === 'vertical'
				? [['ArrowUp'], ['ArrowDown']]
				: orientation === 'horizontal'
					? [[left], [right]]
					: [
							['ArrowUp', left],
							['ArrowDown', right],
						]
		const isNext = next.includes(key)
		if (!isNext && !prev.includes(key) && key !== 'Home' && key !== 'End') return
		if (fieldKeeps(event.target, key, isNext)) return

		const items = focusableItems(event.currentTarget, itemSelector)
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
			const delta = isNext ? 1 : -1
			const index = currentIndex + delta
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

const typesLetter = ({ key, ctrlKey, metaKey, altKey }: KeyboardEvent) =>
	key.length === 1 && key !== ' ' && !ctrlKey && !metaKey && !altKey

export const typeaheadBuffer = (timeout = 500) => {
	let buffer = ''
	let lastTime = 0
	return (event: KeyboardEvent) => {
		if (!typesLetter(event)) return undefined
		buffer = event.timeStamp - lastTime > timeout ? event.key : buffer + event.key
		lastTime = event.timeStamp
		return buffer
	}
}

export const typeaheadMatch = (labels: string[], current: number, query: string) => {
	const text = query.toLocaleLowerCase()
	const find = (prefix: string, offset: number) => {
		for (let i = 0; i < labels.length; i += 1) {
			const index = (current + offset + i + labels.length) % labels.length
			if (labels[index].trim().toLocaleLowerCase().startsWith(prefix)) return index
		}
		return -1
	}
	const match = find(text, text.length === 1 ? 1 : 0)
	if (match < 0 && [...text].every((char) => char === text[0])) return find(text[0], 1)
	return match
}

export const typeahead = (
	itemSelector: string,
	labelOf: (item: HTMLElement) => string,
	{ timeout = 500 }: { timeout?: number } = {},
) => {
	const collect = typeaheadBuffer(timeout)
	return (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (!typesLetter(event)) return

		const items = focusableItems(event.currentTarget, itemSelector)
		const focused = focusedItem(event.currentTarget, itemSelector, items)
		if (!focused) return

		const query = collect(event)
		if (!query) return
		const target = items[typeaheadMatch(items.map(labelOf), items.indexOf(focused), query)]
		if (!target) return
		target.focus()
		event.preventDefault()
	}
}
