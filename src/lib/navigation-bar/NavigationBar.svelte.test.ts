import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './NavigationBarHarness.test.svelte'

const items = () => [...document.querySelectorAll<HTMLElement>('.np-navigation-bar-item')]
const labels = () => [...document.querySelectorAll<HTMLElement>('.np-navigation-bar-item-label')]

describe('NavigationBar', async () => {
	test('renders a nav with one item per child', async () => {
		await render(Harness)

		expect(document.querySelector('nav.np-navigation-bar')).not.toBeNull()
		expect(items()).toHaveLength(3)
	})

	test('marks the selected item as the current page', async () => {
		await render(Harness, { selected: 'search' })

		const current = items().filter((i) => i.getAttribute('aria-current') === 'page')
		expect(current).toHaveLength(1)
		expect(current[0].textContent).toContain('Search')
	})

	test('only the selected item is a tab stop, so the bar is one stop in the tab order', async () => {
		await render(Harness, { selected: 'search' })

		const stops = items().filter((i) => i.tabIndex === 0)
		expect(stops).toHaveLength(1)
		expect(stops[0].textContent).toContain('Search')
	})

	test('an arrow key moves focus along the row', async () => {
		await render(Harness, { selected: 'home' })
		items()[0].focus()
		expect(document.activeElement).toBe(items()[0])

		await page
			.getByRole('navigation')
			.element()
			.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

		await expect.poll(() => document.activeElement === items()[1]).toBe(true)
	})

	test('a badge is rendered with its own accessible name', async () => {
		await render(Harness)

		const badge = document.querySelector<HTMLElement>('.np-badge-container')!
		expect(badge.getAttribute('aria-label')).toBe('3 unread')
		expect(badge.getAttribute('role')).toBe('status')
		expect(badge.textContent).toContain('3')
	})
})

describe('NavigationBarItem', async () => {
	test('renders a button by default and a link with href', async () => {
		await render(Harness)
		expect(document.querySelector('button.np-navigation-bar-item')).not.toBeNull()
	})

	test('labelBehavior="always" keeps every label visible', async () => {
		await render(Harness, { selected: 'home', labelBehavior: 'always' })

		expect(labels().every((l) => getComputedStyle(l).visibility === 'visible')).toBe(true)
	})

	test('labelBehavior="selected" shows only the selected label but keeps the layout', async () => {
		await render(Harness, { selected: 'search', labelBehavior: 'selected' })

		const visible = labels().filter((l) => getComputedStyle(l).visibility === 'visible')
		expect(visible).toHaveLength(1)
		expect(visible[0].textContent).toContain('Search')
		// Hidden rather than removed, so the row does not reflow as the selection moves.
		expect(labels().every((l) => l.getBoundingClientRect().height > 0)).toBe(true)
	})

	test('the item is a link when given an href', async () => {
		await render(Harness, { asLinks: true })

		expect(document.querySelectorAll('a.np-navigation-bar-item')).toHaveLength(3)
		expect(document.querySelector('button.np-navigation-bar-item')).toBeNull()
	})

	test('equal-weight stretches every item to the same width', async () => {
		await render(Harness, { arrangement: 'equal-weight' })

		const widths = items().map((i) => Math.round(i.getBoundingClientRect().width))
		expect(new Set(widths).size).toBe(1)
	})

	test('centered sizes items to their content and groups them in the middle', async () => {
		await render(Harness, { arrangement: 'centered' })

		const bar = document.querySelector<HTMLElement>('.np-navigation-bar')!
		const barBox = bar.getBoundingClientRect()
		const boxes = items().map((i) => i.getBoundingClientRect())

		// Content-sized rather than stretched: the items do not fill the bar.
		expect(items().every((i) => getComputedStyle(i).flexGrow === '0')).toBe(true)
		const spanned = boxes.at(-1)!.right - boxes[0].left
		expect(spanned).toBeLessThan(barBox.width)
		// Grouped in the middle: equal slack on both sides.
		const startGap = boxes[0].left - barBox.left
		const endGap = barBox.right - boxes.at(-1)!.right
		expect(Math.abs(startGap - endGap)).toBeLessThan(2)
	})
})

describe('NavigationBarItem orientation', async () => {
	test('vertical stacks the icon above the label', async () => {
		await render(Harness, { orientation: 'vertical' })

		const item = items()[0]
		const icon = item.querySelector<HTMLElement>('.np-navigation-bar-item-icon')!
		const label = item.querySelector<HTMLElement>('.np-navigation-bar-item-label')!

		expect(icon.getBoundingClientRect().bottom).toBeLessThanOrEqual(
			label.getBoundingClientRect().top + 1,
		)
	})

	test('horizontal puts the icon beside the label', async () => {
		await render(Harness, { orientation: 'horizontal', arrangement: 'centered' })

		const item = items()[0]
		const icon = item.querySelector<HTMLElement>('.np-navigation-bar-item-icon')!
		const label = item.querySelector<HTMLElement>('.np-navigation-bar-item-label')!
		const iconBox = icon.getBoundingClientRect()
		const labelBox = label.getBoundingClientRect()

		// Side by side: they overlap vertically and the icon starts before the label.
		expect(iconBox.left).toBeLessThan(labelBox.left)
		expect(iconBox.top).toBeLessThan(labelBox.bottom)
		expect(labelBox.top).toBeLessThan(iconBox.bottom)
	})
})
