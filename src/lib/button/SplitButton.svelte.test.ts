import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './SplitButtonHarness.test.svelte'

const halves = () => [...document.querySelectorAll<HTMLElement>('.np-split-button .np-button')]
const trigger = () => document.querySelector<HTMLElement>('.np-split-button-trigger')!
const menu = () => document.querySelector<HTMLElement>('.np-menu-container')!

describe('SplitButton', async () => {
	test('renders two halves that share the group', async () => {
		await render(Harness)

		expect(halves()).toHaveLength(2)
		expect(halves()[0].textContent).toContain('Save')
	})

	test('the trailing half is named, since it shows only a caret', async () => {
		await render(Harness)

		expect(trigger().getAttribute('aria-label')).toBe('More options')
		expect(trigger().getAttribute('aria-haspopup')).toBe('menu')
	})

	test('the two halves are joined, so the inner corners are tighter than the outer', async () => {
		await render(Harness)

		const [action, more] = halves().map((h) => getComputedStyle(h))
		// The action half keeps its outer start corner and gives up its end corner, and the
		// trailing half does the opposite.
		expect(action.borderStartStartRadius).not.toBe(action.borderStartEndRadius)
		expect(more.borderStartEndRadius).not.toBe(more.borderStartStartRadius)
	})

	test('the action half runs its own handler and does not open the menu', async () => {
		await render(Harness)
		const clicks = () => document.querySelector('[data-testid="clicks"]')!.textContent

		await page.getByRole('button', { name: 'Save' }).click()

		await expect.poll(clicks).toBe('1')
		expect(menu().matches(':popover-open')).toBe(false)
	})

	test('the trailing half opens the menu', async () => {
		await render(Harness)
		expect(menu().matches(':popover-open')).toBe(false)

		await page.getByRole('button', { name: 'More options' }).click()

		await expect.poll(() => menu().matches(':popover-open')).toBe(true)
		await expect.poll(() => trigger().getAttribute('aria-expanded')).toBe('true')
	})

	test('the trailing half rounds out into a circle while its menu is open', async () => {
		await render(Harness)
		// The half is square, so the round corner every size sets to half its height reads as a
		// circle rather than as a pill with two flat sides.
		const { width, height } = trigger().getBoundingClientRect()
		expect(width).toBe(height)

		await page.getByRole('button', { name: 'More options' }).click()

		await expect.poll(() => trigger().getAttribute('aria-expanded')).toBe('true')
		const more = getComputedStyle(trigger())
		expect(more.borderStartStartRadius).toBe(`${height / 2}px`)
		expect(more.borderStartEndRadius).toBe(`${height / 2}px`)
	})

	test('bind:open opens the menu from the app', async () => {
		const { rerender } = await render(Harness, { open: false })

		await rerender({ open: true })

		await expect.poll(() => menu().matches(':popover-open')).toBe(true)
	})

	test('disabled disables both halves', async () => {
		await render(Harness, { disabled: true })

		expect(halves().every((h) => (h as HTMLButtonElement).disabled)).toBe(true)
	})

	test('both halves take the same variant, including elevated', async () => {
		await render(Harness, { variant: 'elevated' })

		expect(halves().every((h) => h.classList.contains('elevated'))).toBe(true)
	})
})
