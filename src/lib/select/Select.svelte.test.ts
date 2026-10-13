import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './MenuWidthHarness.test.svelte'
import Select from './Select.svelte'
import MultiHarness from './SelectOptionsHarness.test.svelte'

describe.each(['select', 'autocomplete'] as const)('%s menu width', async (which) => {
	test.each(['420px', '260px'])('matches the field at %s', async (width) => {
		await render(Harness, { which, width })

		const field = document.querySelector<HTMLElement>(
			which === 'select' ? '.np-field' : '.np-text-field',
		)!
		const menu = document.querySelector<HTMLElement>('.np-menu-container')!
		menu.showPopover()

		const fieldWidth = Math.round(field.getBoundingClientRect().width)
		expect(fieldWidth).toBe(Number.parseInt(width, 10))

		await expect.poll(() => Math.round(menu.getBoundingClientRect().width)).toBe(fieldWidth)
	})
})

describe('select options', async () => {
	test('a multiple select leads each option with a checkmark', async () => {
		await render(MultiHarness, { multiple: true, value: ['a'] })

		expect(document.querySelectorAll('.np-item-start')).toHaveLength(2)
		expect(
			[...document.querySelectorAll('[role="option"]')].map((o) => o.getAttribute('aria-selected')),
		).toEqual(['true', 'false'])
	})

	test('a single select has no checkmark column', async () => {
		await render(MultiHarness, { value: 'b' })

		expect(document.querySelectorAll('.np-item-start')).toHaveLength(0)
		expect(
			[...document.querySelectorAll('[role="option"]')].map((o) => o.getAttribute('aria-selected')),
		).toEqual(['false', 'true'])
	})
})

describe('select error state', async () => {
	const options = [{ value: 'a', label: 'A' }]
	const combobox = () => document.querySelector<HTMLElement>('[role="combobox"]')!

	test('issues mark the focusable combobox invalid and point it at the message', async () => {
		await render(Select, { options, label: 'Pick', issues: [{ message: 'Required' }] })

		expect(combobox().getAttribute('aria-invalid')).toBe('true')
		const errormessage = combobox().getAttribute('aria-errormessage')!
		expect(document.getElementById(errormessage)?.textContent?.trim()).toBe('Required')
		// The field shows its error colours for an invalid combobox.
		const style = getComputedStyle(combobox())
		expect(style.getPropertyValue('--_label-color')).toBe(
			style.getPropertyValue('--np-color-error'),
		)
	})

	test('supporting text describes the combobox', async () => {
		await render(Select, {
			options,
			label: 'Pick',
			supportingText: 'Choose one',
			'aria-describedby': 'outside-hint',
		})

		const describedby = combobox().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		const own = describedby.split(' ').find((id) => id !== 'outside-hint')!
		expect(document.getElementById(own)?.textContent?.trim()).toBe('Choose one')
	})
})

describe('select events', async () => {
	test('a picked option fires input, then change', async () => {
		const calls: string[] = []
		await render(Select, {
			label: 'Pick',
			options: [
				{ value: 'a', label: 'A' },
				{ value: 'b', label: 'B' },
			],
			oninput: () => calls.push('input'),
			onchange: () => calls.push('change'),
		})

		await userEvent.click(document.querySelector<HTMLElement>('[role="combobox"]')!)
		await page.getByRole('option', { name: 'B' }).click()

		await expect.poll(() => calls).toEqual(['input', 'change'])
	})
})

test('options that share a value render in the hidden select', async () => {
	const options = [
		{ value: '', label: 'None' },
		{ value: '', label: 'Unknown' },
	]
	await render(Select, { options, label: 'Pick', value: '' })

	expect(document.querySelectorAll('select.np-field-value option')).toHaveLength(2)
})
