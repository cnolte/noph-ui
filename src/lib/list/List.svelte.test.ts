import { createRawSnippet } from 'svelte'
import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Item from './Item.svelte'
import Harness from './ListKeyboardHarness.test.svelte'
import Selection from './ListSelectionHarness.test.svelte'

const actions = () => [...document.querySelectorAll<HTMLElement>('.np-item')]
const focusedText = () => document.activeElement?.textContent?.trim()

describe('List keyboard', async () => {
	test('one tab stop, on the first item', async () => {
		await render(Harness)
		expect(actions().map((a) => a.tabIndex)).toEqual([0, -1, -1])
	})

	test('the tab stop sits on the selected item', async () => {
		await render(Harness, { selected: 'Work' })
		expect(actions().map((a) => a.tabIndex)).toEqual([-1, 0, -1])
	})

	test('↓ and → move on, ↑ and ← move back, wrapping at the ends', async () => {
		await render(Harness)
		actions()[0].focus()

		await userEvent.keyboard('{ArrowDown}')
		expect(focusedText()).toBe('Work')
		await userEvent.keyboard('{ArrowRight}')
		expect(focusedText()).toBe('Gym')
		await userEvent.keyboard('{ArrowDown}')
		expect(focusedText()).toBe('Home')
		await userEvent.keyboard('{ArrowLeft}')
		expect(focusedText()).toBe('Gym')
	})

	test('Space follows a link item', async () => {
		await render(Harness)
		actions()[2].focus()

		await userEvent.keyboard(' ')

		expect(location.hash).toBe('#gym')
	})
})

describe('Item layout', async () => {
	const text = (value: string) =>
		createRawSnippet(() => ({ render: () => `<span>${value}</span>` }))

	test('three lines come to 88px', async () => {
		await render(Item, {
			children: text('Label'),
			supportingText: 'Supporting text that is long enough to fill up two lines of the item',
			style: 'width: 240px',
		} as never)
		expect(document.querySelector('.np-item')!.getBoundingClientRect().height).toBe(88)
	})

	test('leaves 16px between the elements', async () => {
		await render(Item, { children: text('Label'), end: '100+' } as never)
		expect(getComputedStyle(document.querySelector('.np-item')!).columnGap).toBe('16px')
		expect(getComputedStyle(document.querySelector('.np-item-end')!).fontSize).toBe('11px')
	})

	test('an avatar is a 40px circle in primary container', async () => {
		await render(Item, { children: text('Ada'), avatar: 'A' } as never)
		const avatar = document.querySelector<HTMLElement>('.np-item-avatar')!
		expect(avatar.getBoundingClientRect().width).toBe(40)
		expect(avatar.textContent!.trim()).toBe('A')
		expect(getComputedStyle(avatar).borderRadius).toBe('50%')
	})
})

describe('List selection', async () => {
	test('single is a listbox of options that announce their state', async () => {
		await render(Selection)
		const listbox = page.getByRole('listbox', { name: 'Places' })
		await expect.element(listbox).toBeVisible()
		expect(listbox.element().hasAttribute('aria-multiselectable')).toBe(false)
		await expect
			.element(page.getByRole('option', { name: 'Work' }))
			.toHaveAttribute('aria-selected', 'true')
		await expect
			.element(page.getByRole('option', { name: 'Home' }))
			.toHaveAttribute('aria-selected', 'false')
		expect(document.querySelector('li')!.getAttribute('role')).toBe('none')
	})

	test('Enter selects the focused option, and the tab stop follows the selection', async () => {
		await render(Selection)
		const home = page.getByRole('option', { name: 'Home' })
		;(home.element() as HTMLElement).focus()

		await userEvent.keyboard('{Enter}')

		await expect.element(home).toHaveAttribute('aria-selected', 'true')
		expect((home.element() as HTMLElement).tabIndex).toBe(0)
	})

	test('multiple marks the listbox multiselectable', async () => {
		await render(Selection, { selection: 'multiple' })
		await expect
			.element(page.getByRole('listbox', { name: 'Places' }))
			.toHaveAttribute('aria-multiselectable', 'true')
	})
})
