import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './RichTooltipPlacementHarness.test.svelte'

const byId = (id: string) => document.getElementById(id)!
const settled = (el: HTMLElement) => Promise.all(el.getAnimations().map((a) => a.finished))

const open = async (props: {
	top?: number
	left?: number
	positionArea?: string
	justifySelf?: string
}) => {
	await render(Harness, props)
	const anchor = byId('placement-anchor')
	const tooltip = byId('placement-tip')
	await page.elementLocator(anchor).click()
	await expect.poll(() => tooltip.matches(':popover-open'), { timeout: 400 }).toBe(true)
	await settled(tooltip)
	return { anchor: anchor.getBoundingClientRect(), tooltip: tooltip.getBoundingClientRect() }
}

const onScreen = (r: DOMRect) =>
	r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight

const covers = (a: DOMRect, t: DOMRect) =>
	t.left < a.right && t.right > a.left && t.top < a.bottom && t.bottom > a.top

test('with room below it sits centered under the control and clear of it', async () => {
	const { anchor, tooltip } = await open({ top: 200, left: 480 })

	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
	expect(tooltip.top - anchor.bottom).toBeLessThan(8)
	expect(
		Math.abs((tooltip.left + tooltip.right) / 2 - (anchor.left + anchor.right) / 2),
	).toBeLessThan(2)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('at the right edge it shifts back on screen instead of running off it', async () => {
	const { anchor, tooltip } = await open({ top: 200, left: window.innerWidth - 60 })

	expect(onScreen(tooltip)).toBe(true)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
})

test('at the left edge it shifts back on screen as well', async () => {
	const { anchor, tooltip } = await open({ top: 200, left: 4 })

	expect(onScreen(tooltip)).toBe(true)
	expect(covers(anchor, tooltip)).toBe(false)
})

test('with no room below it flips above the control and still does not cover it', async () => {
	const { anchor, tooltip } = await open({ top: window.innerHeight - 80, left: 480 })

	expect(tooltip.bottom).toBeLessThanOrEqual(anchor.top)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('the tokens reproduce the bottom right placement Material specifies by default', async () => {
	const { anchor, tooltip } = await open({
		top: 200,
		left: 200,
		positionArea: 'bottom right',
		justifySelf: 'start',
	})

	expect(tooltip.left).toBeCloseTo(anchor.right, 0)
	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('the bottom right placement shifts back on screen at the right edge', async () => {
	const { anchor, tooltip } = await open({
		top: 200,
		left: window.innerWidth - 60,
		positionArea: 'bottom right',
		justifySelf: 'start',
	})

	expect(onScreen(tooltip)).toBe(true)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
})

test('the bottom right placement flips above the control with no room below', async () => {
	const { anchor, tooltip } = await open({
		top: window.innerHeight - 80,
		left: 200,
		positionArea: 'bottom right',
		justifySelf: 'start',
	})

	expect(tooltip.bottom).toBeLessThanOrEqual(anchor.top)
	expect(tooltip.left).toBeCloseTo(anchor.right, 0)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})
