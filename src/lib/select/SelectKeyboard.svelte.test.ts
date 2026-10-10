import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Select from './Select.svelte'

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana', disabled: true },
	{ value: 'cherry', label: 'Cherry' },
]

const combobox = () => document.querySelector<HTMLElement>('[role="combobox"]')!
const isOpen = () => !!document.querySelector('.np-menu-container:popover-open')
const focusedOption = () => document.activeElement?.closest('[role="option"]')?.textContent?.trim()

describe('Select keyboard', async () => {
	test('the first ArrowDown after a mouse open lands on the selected option', async () => {
		await render(Select, { label: 'Fruit', options, value: 'cherry' })

		await userEvent.click(combobox())
		await expect.poll(isOpen).toBe(true)
		await userEvent.keyboard('{ArrowDown}')

		await expect.poll(focusedOption).toBe('Cherry')
	})

	test('ArrowDown on the closed field opens on the selected option', async () => {
		await render(Select, { label: 'Fruit', options, value: 'apple' })

		combobox().focus()
		await userEvent.keyboard('{ArrowDown}')

		await expect.poll(focusedOption).toBe('Apple')
	})

	test('a disabled option takes focus but cannot be picked', async () => {
		await render(Select, { label: 'Fruit', options, value: 'apple' })

		combobox().focus()
		await userEvent.keyboard('{ArrowDown}')
		await expect.poll(focusedOption).toBe('Apple')
		await userEvent.keyboard('{ArrowDown}')
		await expect.poll(focusedOption).toBe('Banana')
		await userEvent.keyboard('{Enter}')

		expect(isOpen()).toBe(true)
		expect(document.querySelector('select')!.value).toBe('apple')
	})

	test('Home, End and typeahead reach disabled options', async () => {
		await render(Select, {
			label: 'Fruit',
			value: 'apple',
			options: [
				{ value: 'x', label: 'Xigua', disabled: true },
				...options,
				{ value: 'z', label: 'Zucchini', disabled: true },
			],
		})

		combobox().focus()
		await userEvent.keyboard('{End}')
		await expect.poll(focusedOption).toBe('Zucchini')
		await userEvent.keyboard('{Home}')
		await expect.poll(focusedOption).toBe('Xigua')
		await userEvent.keyboard('b')
		await expect.poll(focusedOption).toBe('Banana')
	})
})

describe('Select name', async () => {
	test('is the label with the asterisk when required', async () => {
		await render(Select, { label: 'Fruit', options, required: true })

		await expect.element(page.getByRole('combobox', { name: 'Fruit*', exact: true })).toBeVisible()
		expect(combobox().getAttribute('aria-required')).toBe('true')
	})

	test('is the label alone when the field is optional', async () => {
		await render(Select, { label: 'Fruit', options, value: 'apple' })

		await expect.element(page.getByRole('combobox', { name: 'Fruit', exact: true })).toBeVisible()
		expect(combobox().hasAttribute('aria-required')).toBe(false)
	})

	test('takes a consumer aria-label', async () => {
		await render(Select, { label: 'Fruit', options, 'aria-label': 'Favourite fruit' })

		await expect
			.element(page.getByRole('combobox', { name: 'Favourite fruit', exact: true }))
			.toBeVisible()
	})
})
