import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './ToolbarHarness.test.svelte'

const toolbar = () => document.querySelector<HTMLElement>('.np-toolbar')!
const items = () => [...toolbar().querySelectorAll<HTMLElement>('button')]

const tooltipOf = (item: HTMLElement) =>
	document.getElementById(item.getAttribute('aria-describedby')!)!

const covers = (a: DOMRect, b: DOMRect) =>
	b.left < a.right && b.right > a.left && b.top < a.bottom && b.bottom > a.top

const settled = (el: HTMLElement) => Promise.all(el.getAnimations().map((a) => a.finished))

const openTooltipOfSecondAction = async () => {
	const item = items()[1]
	const tooltip = tooltipOf(item)
	await page.elementLocator(item).hover()
	await expect.poll(() => tooltip.matches(':popover-open'), { timeout: 400 }).toBe(true)
	await settled(tooltip)
	return { item, tooltip }
}

describe('Toolbar', async () => {
	test('exposes itself as a toolbar with an orientation', async () => {
		await render(Harness)

		expect(toolbar().getAttribute('role')).toBe('toolbar')
		expect(toolbar().getAttribute('aria-orientation')).toBe('horizontal')
	})

	test('is one tab stop, with the arrows moving between actions', async () => {
		await render(Harness)

		expect(items().filter((i) => i.tabIndex === 0)).toHaveLength(1)
	})

	test('docked spans the full width of its container', async () => {
		await render(Harness, { variant: 'docked' })

		const width = toolbar().getBoundingClientRect().width
		const parent = toolbar().parentElement!.getBoundingClientRect().width
		expect(Math.round(width)).toBe(Math.round(parent))
		expect(Number.parseFloat(getComputedStyle(toolbar()).borderTopLeftRadius)).toBe(0)
	})

	test('floating is an island: narrower than its container, rounded and raised', async () => {
		await render(Harness, { variant: 'floating' })

		const style = getComputedStyle(toolbar())
		expect(toolbar().getBoundingClientRect().width).toBeLessThan(
			toolbar().parentElement!.getBoundingClientRect().width,
		)
		expect(Number.parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(0)
		expect(style.boxShadow).not.toBe('none')
		expect(style.position).toBe('sticky')
	})

	test('vertical stacks the actions and says so', async () => {
		await render(Harness, { orientation: 'vertical' })

		expect(toolbar().getAttribute('aria-orientation')).toBe('vertical')
		expect(getComputedStyle(toolbar()).flexDirection).toBe('column')
		const [first, second] = items().map((i) => i.getBoundingClientRect())
		expect(second.top).toBeGreaterThanOrEqual(first.bottom - 1)
	})

	test('vertical puts a tooltip beside its action, clear of the whole stack', async () => {
		await render(Harness, { orientation: 'vertical' })

		const { item, tooltip } = await openTooltipOfSecondAction()

		const box = tooltip.getBoundingClientRect()
		for (const other of items()) expect(covers(other.getBoundingClientRect(), box)).toBe(false)

		const anchor = item.getBoundingClientRect()
		expect(box.left).toBeGreaterThanOrEqual(anchor.right)
		expect(Math.abs((box.top + box.bottom) / 2 - (anchor.top + anchor.bottom) / 2)).toBeLessThan(2)
	})

	test('vertical against the end edge flips the tooltip back on screen', async () => {
		await render(Harness, { variant: 'floating', orientation: 'vertical', placement: 'end' })

		const { item, tooltip } = await openTooltipOfSecondAction()

		const box = tooltip.getBoundingClientRect()
		for (const other of items()) expect(covers(other.getBoundingClientRect(), box)).toBe(false)
		expect(box.left).toBeGreaterThanOrEqual(0)
		expect(box.right).toBeLessThanOrEqual(window.innerWidth)
		expect(box.right <= item.getBoundingClientRect().left).toBe(true)
	})

	test('horizontal leaves the tooltip on the block axis, centered on its action', async () => {
		await render(Harness, { orientation: 'horizontal' })

		const { item, tooltip } = await openTooltipOfSecondAction()

		const box = tooltip.getBoundingClientRect()
		const anchor = item.getBoundingClientRect()
		expect(covers(anchor, box)).toBe(false)
		expect(box.bottom <= anchor.top || box.top >= anchor.bottom).toBe(true)
		expect(Math.abs((box.left + box.right) / 2 - (anchor.left + anchor.right) / 2)).toBeLessThan(2)
	})
})
