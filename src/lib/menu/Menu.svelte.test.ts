import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './MenuPlacementHarness.test.svelte'

const ITEM_HEIGHT = 56
const MENU_PADDING = 16
const heightOf = (items: number) => items * ITEM_HEIGHT + MENU_PADDING
const GAP = 4

const surface = () => document.querySelector<HTMLElement>('.np-menu-container')
const trigger = () => document.querySelector<HTMLElement>('#placement-anchor')

const openMenu = async (props: {
	top?: number
	left?: number
	items?: number
	coverAnchor?: boolean
	menuStyle?: string
}) => {
	await render(Harness, props)
	await page.getByRole('button', { name: 'Open the menu' }).click()
	await expect.poll(() => !!surface()?.matches(':popover-open')).toBe(true)
	const element = surface()!
	await expect.poll(() => !!element.style.maxHeight).toBe(true)
	return {
		element,
		menu: element.getBoundingClientRect(),
		anchor: trigger()!.getBoundingClientRect(),
	}
}

describe('placement', async () => {
	test('opens below the anchor while the menu fits there', async () => {
		const { menu, anchor } = await openMenu({ top: 100, items: 3 })

		expect(menu.top).toBeGreaterThanOrEqual(anchor.bottom)
		expect(menu.top - anchor.bottom).toBeLessThanOrEqual(GAP)
		expect(menu.height).toBeCloseTo(heightOf(3), 0)
	})

	test('flips above the anchor when there is no room below it', async () => {
		const { menu, anchor } = await openMenu({ top: 800, items: 3 })

		expect(menu.bottom).toBeLessThanOrEqual(anchor.top)
		expect(anchor.top - menu.bottom).toBeLessThanOrEqual(GAP)
		expect(menu.height).toBeCloseTo(heightOf(3), 0)
	})

	test('flips to the other side of the anchor when there is no room beside it', async () => {
		const { menu, anchor } = await openMenu({
			top: 100,
			left: 880,
			items: 3,
			menuStyle:
				'--np-menu-position-area:bottom span-right;--np-menu-justify-self:none;width:400px',
		})

		expect(menu.left).toBeLessThan(anchor.left)
		expect(menu.right).toBeLessThanOrEqual(window.innerWidth)
	})

	test('spans the height over the anchor when neither side can hold it whole', async () => {
		const { element, menu, anchor } = await openMenu({ top: 400, items: 10 })

		expect(menu.top).toBeLessThan(anchor.top)
		expect(menu.bottom).toBeGreaterThan(anchor.bottom)
		expect(menu.height).toBeCloseTo(heightOf(10), 0)
		expect(element.scrollHeight).toBeLessThanOrEqual(element.clientHeight)
	})

	test('leaves the anchor uncovered when coverAnchor is off', async () => {
		const { element, menu, anchor } = await openMenu({ top: 400, items: 10, coverAnchor: false })

		expect(menu.top).toBeGreaterThanOrEqual(anchor.bottom)
		expect(element.scrollHeight).toBeGreaterThan(element.clientHeight)
	})

	test('stays on the roomier side when it is longer than the viewport', async () => {
		const { element, menu, anchor } = await openMenu({ top: 400, items: 20 })

		expect(menu.top).toBeGreaterThanOrEqual(anchor.bottom)
		expect(menu.bottom).toBeLessThanOrEqual(window.innerHeight)
		expect(element.scrollHeight).toBeGreaterThan(element.clientHeight)
	})
})
