import { expect, onTestFinished, test } from 'vitest'
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
	margin?: string
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

test('by default its top left corner sits at the bottom right corner of the control', async () => {
	const { anchor, tooltip } = await open({ top: 200, left: 200 })

	expect(tooltip.left).toBeCloseTo(anchor.right, 0)
	expect(tooltip.top - anchor.bottom).toBeCloseTo(4, 0)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('at the right edge it moves to the bottom left of the control', async () => {
	const { anchor, tooltip } = await open({ top: 200, left: window.innerWidth - 60 })

	expect(tooltip.right).toBeCloseTo(anchor.left, 0)
	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('with no room below it moves to the top right of the control', async () => {
	const { anchor, tooltip } = await open({ top: window.innerHeight - 80, left: 200 })

	expect(anchor.top - tooltip.bottom).toBeCloseTo(4, 0)
	expect(tooltip.left).toBeCloseTo(anchor.right, 0)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('in the bottom right corner it moves to the top left of the control', async () => {
	const { anchor, tooltip } = await open({
		top: window.innerHeight - 80,
		left: window.innerWidth - 60,
	})

	expect(tooltip.bottom).toBeLessThanOrEqual(anchor.top)
	expect(tooltip.right).toBeCloseTo(anchor.left, 0)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('with room on neither side it stays below and keeps 8px from the window edge', async () => {
	const { innerWidth, innerHeight } = window
	await page.viewport(400, innerHeight)
	onTestFinished(() => page.viewport(innerWidth, innerHeight))

	const { anchor, tooltip } = await open({ top: 200, left: 180 })

	expect(window.innerWidth - tooltip.right).toBeCloseTo(8, 0)
	expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})

test('the tokens reproduce the centered placement Material allows on desktop', async () => {
	const { anchor, tooltip } = await open({
		top: 200,
		left: 480,
		positionArea: 'bottom',
		justifySelf: 'anchor-center',
		margin: '4px 0',
	})

	expect(tooltip.top - anchor.bottom).toBeCloseTo(4, 0)
	expect(
		Math.abs((tooltip.left + tooltip.right) / 2 - (anchor.left + anchor.right) / 2),
	).toBeLessThan(2)
	expect(covers(anchor, tooltip)).toBe(false)
	expect(onScreen(tooltip)).toBe(true)
})
