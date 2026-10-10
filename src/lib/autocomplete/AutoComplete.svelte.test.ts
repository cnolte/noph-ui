import { describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import AutoComplete from './AutoComplete.svelte'

const options = [
	{ value: 1, label: 'Apple' },
	{ value: 2, label: 'Apricot' },
	{ value: 3, label: 'Banana' },
]

const input = () => document.querySelector<HTMLInputElement>('input')!
const active = () => input().getAttribute('aria-activedescendant')

describe('AutoComplete Home and End', async () => {
	test('move the caret while no option is active', async () => {
		await render(AutoComplete, { label: 'Fruit', options })

		await userEvent.click(input())
		await userEvent.keyboard('ap')
		await userEvent.keyboard('{Home}')
		expect(input().selectionStart).toBe(0)
		await userEvent.keyboard('{End}')
		expect(input().selectionStart).toBe(2)
		expect(active()).toBeNull()
	})

	test('move between the options once the arrows are in them', async () => {
		await render(AutoComplete, { label: 'Fruit', options })

		await userEvent.click(input())
		await userEvent.keyboard('{ArrowDown}{End}')
		expect(document.getElementById(active()!)?.textContent?.trim()).toBe('Banana')
		await userEvent.keyboard('{Home}')
		expect(document.getElementById(active()!)?.textContent?.trim()).toBe('Apple')
	})
})
