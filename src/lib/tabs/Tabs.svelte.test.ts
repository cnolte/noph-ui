import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './TabsHarness.test.svelte'

const tabs = () => [...document.querySelectorAll<HTMLElement>('.np-tab')]
const anchored = () => document.querySelector<HTMLElement>('.np-indicator-anchor')

describe('Tabs', async () => {
	test('renders a tablist with one tab per child', async () => {
		await render(Harness)

		expect(document.querySelector('[role="tablist"]')).not.toBeNull()
		expect(tabs()).toHaveLength(3)
	})

	test('only the selected tab is selected and a tab stop', async () => {
		await render(Harness, { value: 'two' })

		expect(tabs().map((tab) => tab.getAttribute('aria-selected'))).toEqual([
			'false',
			'true',
			'false',
		])
		expect(tabs().map((tab) => tab.tabIndex)).toEqual([-1, 0, -1])
	})

	test('the indicator is anchored to the selected tab', async () => {
		await render(Harness, { value: 'two' })

		await expect.poll(() => anchored()?.closest('.np-tab')?.textContent?.trim()).toBe('two')
	})

	test('a click moves the selection and the indicator with it', async () => {
		await render(Harness, { value: 'one' })

		tabs()[2].click()

		await expect.poll(() => tabs()[2].getAttribute('aria-selected')).toBe('true')
		await expect.poll(() => anchored()?.closest('.np-tab')?.textContent?.trim()).toBe('three')
	})

	test('an arrow key moves focus along the row', async () => {
		await render(Harness, { value: 'one' })
		tabs()[0].focus()

		await page
			.getByRole('tablist')
			.element()
			.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

		await expect.poll(() => document.activeElement === tabs()[1]).toBe(true)
	})

	test('the divider lies inside the 48px height', async () => {
		await render(Harness)

		expect(document.querySelector('nav')!.getBoundingClientRect().height).toBe(48)
	})
})

describe('Scrollable tabs', async () => {
	const many = ['Akita', 'Alaskan', 'Australian Shepherd', 'Azawakh', 'Barbet', 'Basenji']

	test('are as wide as their labels, the first 52px from the start', async () => {
		await render(Harness, { scrollable: true, tabs: many, value: 'Akita' })

		const strip = document.querySelector('[role="tablist"]')!.getBoundingClientRect()
		const [first, second] = tabs().map((tab) => tab.getBoundingClientRect())
		expect(first.left - strip.left).toBe(52)
		expect(first.width).toBeLessThan(second.width)
		expect(tabs()[0].parentElement!.scrollWidth).toBeGreaterThan(strip.width)
	})

	test('bring the selected tab into view', async () => {
		await render(Harness, { scrollable: true, tabs: many, value: 'Akita' })
		const strip = document.querySelector<HTMLElement>('[role="tablist"]')!
		expect(strip.scrollLeft).toBe(0)

		tabs()[5].click()

		await expect
			.poll(() => {
				const box = tabs()[5].getBoundingClientRect()
				const view = strip.getBoundingClientRect()
				return box.left >= view.left && box.right <= view.right
			})
			.toBe(true)
	})

	test('fixed tabs share the width equally', async () => {
		await render(Harness)

		const widths = tabs().map((tab) => Math.round(tab.getBoundingClientRect().width))
		expect(new Set(widths).size).toBe(1)
	})
})

describe('Link tabs', async () => {
	test('a click selects the tab', async () => {
		await render(Harness, { links: true, value: 'one' })

		tabs()[1].click()

		await expect.poll(() => tabs()[1].getAttribute('aria-selected')).toBe('true')
	})

	test('Space activates the tab instead of scrolling the page', async () => {
		await render(Harness, { links: true, value: 'one' })
		tabs()[2].focus()

		const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
		tabs()[2].dispatchEvent(event)

		expect(event.defaultPrevented).toBe(true)
		await expect.poll(() => tabs()[2].getAttribute('aria-selected')).toBe('true')
	})
})

describe('Tab badge', async () => {
	test('is read after the tab name, as its description', async () => {
		await render(Harness, { badgeLabel: 5 })

		const tab = page.getByRole('tab', { name: 'two', exact: true })
		await expect.element(tab).toHaveAccessibleDescription('5')
		expect(document.querySelector('.np-badge-container')!.getAttribute('aria-hidden')).toBe('true')
	})
})
