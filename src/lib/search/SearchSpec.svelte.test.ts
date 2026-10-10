import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './SearchSpecHarness.test.svelte'

const root = () => document.querySelector<HTMLElement>('.np-search')!
const input = () => document.querySelector<HTMLInputElement>('.np-search-input')!
const isOpen = () => root().classList.contains('np-search-expanded')
const focusedText = () => document.activeElement?.textContent?.trim()

describe('Search spec', async () => {
	test('is named by its hinted text', async () => {
		await render(Harness)
		await expect.element(page.getByRole('searchbox', { name: 'Search recipes' })).toBeVisible()
	})

	test('a trailing action does its own thing without opening search', async () => {
		await render(Harness)

		await userEvent.click(page.getByRole('button', { name: 'Profile' }))

		await expect.poll(() => page.getByTestId('profile').element().textContent).toBe('1')
		expect(isOpen()).toBe(false)
	})

	test('↓ moves into the results and ↑ on the first goes back to the field', async () => {
		await render(Harness)
		input().focus()

		await userEvent.keyboard('{ArrowDown}')
		expect(focusedText()).toBe('Tacos')
		await userEvent.keyboard('{ArrowDown}')
		expect(focusedText()).toBe('Tamales')
		await userEvent.keyboard('{ArrowUp}{ArrowUp}')
		expect(document.activeElement).toBe(input())
	})

	test('announces how many results there are', async () => {
		await render(Harness, { count: 3 })
		input().focus()

		await expect.element(page.getByRole('status')).toHaveTextContent('3 results')
	})

	test('Enter keeps the query visible, lets go of the field and keeps the view open', async () => {
		await render(Harness)
		input().focus()
		await userEvent.keyboard('tac{Enter}')

		expect(input().value).toBe('tac')
		expect(document.activeElement).not.toBe(input())
		expect(isOpen()).toBe(true)
	})

	test('docked, the open view is at least 240px high', async () => {
		await render(Harness, { view: 'docked', count: 1 })
		input().focus()

		await expect.poll(isOpen).toBe(true)
		const box = document.querySelector('.np-search-container')!.getBoundingClientRect()
		expect(box.height).toBeGreaterThanOrEqual(240)
	})

	test('docked without results, the open view is just the bar', async () => {
		await render(Harness, { view: 'docked', count: 0 })
		input().focus()

		await expect.poll(isOpen).toBe(true)
		const box = document.querySelector('.np-search-container')!.getBoundingClientRect()
		expect(box.height).toBeLessThan(60)
	})

	test('divided and docked without results, the bar keeps its pill and has no divider', async () => {
		await render(Harness, { view: 'docked', variant: 'divided', count: 0 })
		input().focus()

		const bar = document.querySelector<HTMLElement>('.np-search-bar')!
		await expect.poll(() => root().classList.contains('np-search-empty')).toBe(true)
		expect(getComputedStyle(bar).borderTopLeftRadius).toBe('28px')
		expect(getComputedStyle(bar).boxShadow).toContain('rgba(0, 0, 0, 0)')
	})

	test('without a view, it fills the screen in a compact window', async () => {
		await page.viewport(400, 800)
		try {
			await render(Harness)
			expect(root().classList).toContain('np-search-full-screen')
		} finally {
			await page.viewport(1024, 900)
		}
	})

	test('docks above compact windows', async () => {
		await render(Harness)
		expect(root().classList).toContain('np-search-docked')
	})
})
