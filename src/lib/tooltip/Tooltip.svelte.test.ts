import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './TooltipHarness.test.svelte'

const byId = (id: string) => document.getElementById(id)!
const isOpen = (el: HTMLElement) => el.matches(':popover-open')
const hover = (el: HTMLElement) => page.elementLocator(el).hover()

const tooltipOf = (anchorId: string) => {
	const anchor = byId(anchorId)
	const id = anchor.getAttribute('aria-describedby')!
	return { anchor, tooltip: byId(id) }
}

const centeredAbove = (anchor: HTMLElement, tooltip: HTMLElement) => {
	const a = anchor.getBoundingClientRect()
	const t = tooltip.getBoundingClientRect()
	return {
		above: t.bottom <= a.top && a.top - t.bottom < 16,
		centered: Math.abs((t.left + t.right) / 2 - (a.left + a.right) / 2) < 2,
	}
}

describe('a control that can be an interest invoker', () => {
	test('hands the tooltip to the browser and needs no anchor name of its own', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('button-anchor')

		expect(anchor.getAttribute('interestfor')).toBe(tooltip.id)
		expect(anchor.style.anchorName).toBe('')
		expect(tooltip.style.positionAnchor).toBe('')

		const delays = getComputedStyle(anchor)
		expect(delays.getPropertyValue('interest-delay-start')).toBe('0s')
		expect(delays.getPropertyValue('interest-delay-end')).toBe('0.5s')
	})

	test('shows on hover, stays while the tooltip is hovered and hides after leaving', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('button-anchor')

		await hover(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		expect(centeredAbove(anchor, tooltip)).toEqual({ above: true, centered: true })

		await hover(tooltip)
		await new Promise((resolve) => setTimeout(resolve, 700))
		expect(isOpen(tooltip)).toBe(true)

		await hover(byId('before'))
		await expect.poll(() => isOpen(tooltip), { timeout: 2000 }).toBe(false)
	})

	test('needs no JavaScript at all: a copy of the markup with no listeners still works', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('button-anchor')

		const control = anchor.cloneNode(true) as HTMLElement
		const hint = tooltip.cloneNode(true) as HTMLElement
		control.id = 'copied-anchor'
		hint.id = 'copied-tip'
		control.setAttribute('interestfor', hint.id)
		control.setAttribute('aria-describedby', hint.id)
		const room = document.createElement('div')
		room.style.padding = '12rem 20rem'
		room.append(control, hint)
		document.body.append(room)

		await hover(control)
		await expect.poll(() => isOpen(hint), { timeout: 400 }).toBe(true)
		expect(centeredAbove(control, hint)).toEqual({ above: true, centered: true })

		await hover(byId('before'))
		await expect.poll(() => isOpen(hint), { timeout: 2000 }).toBe(false)
	})

	test('shows on keyboard focus and closes on escape', async () => {
		render(Harness)
		const { tooltip } = tooltipOf('button-anchor')

		await page.elementLocator(byId('before')).click()
		await hover(byId('before'))
		await userEvent.tab()
		await expect.poll(() => isOpen(tooltip), { timeout: 600 }).toBe(true)

		await userEvent.keyboard('{Escape}')
		await expect.poll(() => isOpen(tooltip), { timeout: 600 }).toBe(false)
	})
})

describe('an anchor that cannot be an interest invoker', () => {
	test('falls back to its own listeners and anchor name', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('plain-anchor')

		expect(anchor.hasAttribute('interestfor')).toBe(false)
		expect(anchor.style.anchorName).not.toBe('')
		expect(tooltip.style.positionAnchor).toBe(anchor.style.anchorName)
	})

	test('counts a link without an href among them, since the browser ignores interestfor there', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('linkless-anchor')

		expect(anchor.hasAttribute('interestfor')).toBe(false)

		await hover(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
	})

	test('shows on hover and hides half a second after leaving', async () => {
		render(Harness)
		const { anchor, tooltip } = tooltipOf('plain-anchor')

		await hover(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		expect(centeredAbove(anchor, tooltip)).toEqual({ above: true, centered: true })

		await hover(byId('before'))
		await new Promise((resolve) => setTimeout(resolve, 250))
		expect(isOpen(tooltip)).toBe(true)
		await expect.poll(() => isOpen(tooltip), { timeout: 2000 }).toBe(false)
	})
})
