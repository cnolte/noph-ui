import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { createRawSnippet } from 'svelte'
import { page } from 'vitest/browser'
import TextField from './TextField.svelte'

const input = () => document.querySelector<HTMLInputElement>('input')!
const textarea = () => document.querySelector<HTMLTextAreaElement>('textarea')!

describe('TextField aria wiring', async () => {
	test('keeps a consumer aria-describedby alongside the supporting text', async () => {
		await render(TextField, {
			label: 'Name',
			supportingText: 'As on your passport',
			'aria-describedby': 'outside-hint',
		})

		const describedby = input().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		expect(describedby).toMatch(/supporting-text-/)
	})

	test('keeps a consumer aria-errormessage alongside an issue', async () => {
		await render(TextField, {
			label: 'Name',
			issues: [{ message: 'Required' }],
			'aria-errormessage': 'outside-error',
		})

		expect(input().getAttribute('aria-invalid')).toBe('true')
		const errormessage = input().getAttribute('aria-errormessage')!
		expect(errormessage).toContain('outside-error')
		expect(errormessage).toMatch(/supporting-text-/)
	})

	test('lets a consumer aria-invalid through when there is no issue', async () => {
		await render(TextField, { label: 'Name', 'aria-invalid': 'true' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('applies the same wiring to the textarea', async () => {
		await render(TextField, {
			type: 'textarea',
			label: 'Bio',
			supportingText: 'Keep it short',
			'aria-describedby': 'outside-hint',
		})

		const describedby = textarea().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		expect(describedby).toMatch(/supporting-text-/)
	})

	test('names the input with the label text only', async () => {
		await render(TextField, {
			label: 'Name',
			required: true,
			supportingText: 'As on your passport',
			prefixText: '$',
			maxlength: 20,
		})

		const label = document.getElementById(input().getAttribute('aria-labelledby')!)!
		expect(label.textContent!.trim()).toBe('Name')
		expect(input().labels![0].htmlFor).toBe(input().id)
	})

	test('does not label an icon button in the start slot', async () => {
		await render(TextField, {
			label: 'Message',
			start: createRawSnippet(() => ({
				render: () => '<button type="button" aria-label="Add"></button>',
			})),
		})

		const button = document.querySelector('button')!
		expect(button.labels).toHaveLength(0)
		expect(input().labels).toHaveLength(1)
	})

	test('keeps a consumer id, aria-label and aria-labelledby', async () => {
		await render(TextField, { label: 'Name', id: 'own-id', 'aria-labelledby': 'outside-label' })

		expect(input().id).toBe('own-id')
		expect(input().labels![0].htmlFor).toBe('own-id')
		expect(input().getAttribute('aria-labelledby')).toBe('outside-label')
	})

	test('does not override a consumer aria-label', async () => {
		await render(TextField, { label: 'Name', 'aria-label': 'Full name' })

		expect(input().hasAttribute('aria-labelledby')).toBe(false)
	})

	test('wires the textarea to the label the same way', async () => {
		await render(TextField, { type: 'textarea', label: 'Bio' })

		const label = document.getElementById(textarea().getAttribute('aria-labelledby')!)!
		expect(label.textContent!.trim()).toBe('Bio')
		expect(textarea().labels![0].htmlFor).toBe(textarea().id)
	})

	const describedBy = (element: Element) =>
		element
			.getAttribute('aria-describedby')!
			.split(' ')
			.map((id) => document.getElementById(id)!.textContent!.trim())

	test('puts prefix, input and suffix in reading order', async () => {
		await render(TextField, { label: 'Amount', prefixText: '$', suffixText: '.00' })

		const order = [...document.querySelector('.input-wrapper')!.children].map(
			(child) => child.className.split(' ')[0],
		)
		expect(order).toEqual(['prefix', 'input', 'suffix'])
	})

	test('describes the input with prefix and suffix', async () => {
		await render(TextField, {
			label: 'Amount',
			prefixText: '$',
			suffixText: '.00',
			supportingText: 'Whole dollars',
		})

		expect(describedBy(input())).toEqual(['$', '.00', 'Whole dollars'])
	})

	test('speaks prefixLabel and suffixLabel in place of the symbols', async () => {
		await render(TextField, {
			label: 'Price',
			prefixText: '€',
			prefixLabel: 'Euro',
			suffixText: '@gmail.com',
			suffixLabel: 'at gmail dot com',
		})

		expect(describedBy(input())).toEqual(['Euro', 'at gmail dot com'])
		expect(document.querySelector('.prefix')!.textContent!.trim()).toBe('€')
	})

	test('describes the input with the character count', async () => {
		await render(TextField, { label: 'Bio', value: 'Hello', maxlength: 20 })

		expect(describedBy(input())).toEqual(['Character count,', '5/20'])
	})

	test('takes a translated counterLabel', async () => {
		await render(TextField, {
			type: 'textarea',
			label: 'Bio',
			maxlength: 20,
			counterLabel: 'Anzahl Zeichen',
		})

		expect(describedBy(textarea())).toEqual(['Anzahl Zeichen,', '0/20'])
	})

	test('includes the asterisk in the name of a required field', async () => {
		await render(TextField, {
			label: 'Name',
			required: true,
			supportingText: 'As on your passport',
		})

		await expect.element(page.getByRole('textbox', { name: 'Name*', exact: true })).toBeVisible()
	})
})
