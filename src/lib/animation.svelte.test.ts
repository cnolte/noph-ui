import { afterEach, describe, expect, test, vi } from 'vitest'
import { exitAnimation } from './animation.ts'

// Pretends to be a browser that cannot transition `overlay`, such as Safari, with motion allowed.
const withoutOverlay = () => {
	vi.spyOn(CSS, 'supports').mockImplementation((query: string) => query !== 'overlay: auto')
	vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
}

const popover = () => {
	const element = document.createElement('div')
	element.popover = 'manual'
	element.style.transition = 'opacity 200ms'
	document.body.append(element)
	return element
}

afterEach(() => {
	vi.restoreAllMocks()
	document.body.replaceChildren()
})

describe('exitAnimation', () => {
	test('marks a closing popover until its exit animation ends', async () => {
		withoutOverlay()
		const element = popover()
		exitAnimation(element)
		element.showPopover()

		element.hidePopover()

		expect(element.dataset.npExiting).toBe('')
		await expect.poll(() => element.dataset.npExiting, { timeout: 2000 }).toBeUndefined()
	})

	test('reopening drops the mark at once', async () => {
		withoutOverlay()
		const element = popover()
		exitAnimation(element)
		element.showPopover()
		element.hidePopover()

		element.showPopover()

		expect(element.dataset.npExiting).toBeUndefined()
	})

	test('does nothing where the browser transitions overlay itself', async () => {
		vi.spyOn(CSS, 'supports').mockReturnValue(true)
		const element = popover()
		exitAnimation(element)
		element.showPopover()

		element.hidePopover()

		expect(element.dataset.npExiting).toBeUndefined()
	})

	test('does nothing with reduced motion', async () => {
		vi.spyOn(CSS, 'supports').mockReturnValue(false)
		vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
		const element = popover()
		exitAnimation(element)
		element.showPopover()

		element.hidePopover()

		expect(element.dataset.npExiting).toBeUndefined()
	})
})
