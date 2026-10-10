import { describe, expect, test, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './MenuBehaviorHarness.test.svelte'

const menu = () => document.querySelector<HTMLElement>('.np-menu-container')!
const isOpen = () => menu().matches(':popover-open')
const item = (name: string) =>
	[...document.querySelectorAll<HTMLElement>('[role^="menuitem"]')].find(
		(element) => element.querySelector('.np-item-headline')?.textContent?.trim() === name,
	)!
const focusedText = () =>
	document.activeElement?.querySelector('.np-item-headline')?.textContent?.trim()

const openMenu = async (props = {}) => {
	await render(Harness, props)
	await page.getByRole('button', { name: 'Open the menu' }).click()
	await expect.poll(isOpen).toBe(true)
}

describe('Menu behavior', async () => {
	test('moves focus to the first item when it opens', async () => {
		await openMenu()

		await expect.poll(focusedText).toBe('Apple')
	})

	test('stays open when an item is picked, closing is up to the app', async () => {
		const onpick = vi.fn()
		await openMenu({ onpick })

		await userEvent.keyboard('{ArrowDown}{Enter}')

		expect(onpick).toHaveBeenCalledWith('Banana')
		expect(isOpen()).toBe(true)
	})

	test('stays open for a disabled item, which still takes focus', async () => {
		const onpick = vi.fn()
		await openMenu({ onpick })

		await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')

		expect(focusedText()).toBe('Blueberry')
		expect(onpick).not.toHaveBeenCalled()
		expect(isOpen()).toBe(true)
	})

	test('follows a link item on Space', async () => {
		const onpick = vi.fn()
		await openMenu({ onpick })

		await userEvent.keyboard('{End}')
		await userEvent.keyboard('c')
		expect(focusedText()).toBe('Cherry')
		await userEvent.keyboard(' ')

		expect(onpick).toHaveBeenCalledWith('Cherry')
	})

	test('announces radio and checkbox items as checked', async () => {
		await openMenu()

		expect(item('Small').getAttribute('aria-checked')).toBe('true')
		expect(item('Large').getAttribute('aria-checked')).toBe('false')
		expect(item('Apple').hasAttribute('aria-checked')).toBe(false)
	})

	test('stays open on radio and checkbox items', async () => {
		await openMenu()

		await userEvent.click(item('Bold'))
		await expect.poll(() => item('Bold').getAttribute('aria-checked')).toBe('true')

		await userEvent.click(item('Large'))
		await expect.poll(() => item('Large').getAttribute('aria-checked')).toBe('true')
		expect(isOpen()).toBe(true)
	})

	describe('typeahead', async () => {
		test('moves to the next item that starts with the letter', async () => {
			await openMenu()

			await userEvent.keyboard('b')
			expect(focusedText()).toBe('Banana')
			await userEvent.keyboard('b')
			expect(focusedText()).toBe('Blueberry')
			await userEvent.keyboard('b')
			expect(focusedText()).toBe('Bold')
		})

		test('refines the match with further letters', async () => {
			await openMenu()

			await userEvent.keyboard('bl')
			expect(focusedText()).toBe('Blueberry')
			await new Promise((resolve) => setTimeout(resolve, 600))
			await userEvent.keyboard('bo')
			expect(focusedText()).toBe('Bold')
		})

		test('reads the label, not the start slot', async () => {
			await openMenu()

			await userEvent.keyboard('z')
			expect(focusedText()).toBe('Apple')
		})
	})
})
