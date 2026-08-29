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
})
