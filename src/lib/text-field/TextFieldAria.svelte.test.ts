import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import TextField from './TextField.svelte'

const input = () => document.querySelector<HTMLInputElement>('input')!
const textarea = () => document.querySelector<HTMLTextAreaElement>('textarea')!

describe('TextField aria wiring', () => {
	test('keeps a consumer aria-describedby alongside the supporting text', () => {
		render(TextField, {
			label: 'Name',
			supportingText: 'As on your passport',
			'aria-describedby': 'outside-hint',
		})

		const describedby = input().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		expect(describedby).toMatch(/supporting-text-/)
	})

	test('keeps a consumer aria-errormessage alongside an issue', () => {
		render(TextField, {
			label: 'Name',
			issues: [{ message: 'Required' }],
			'aria-errormessage': 'outside-error',
		})

		expect(input().getAttribute('aria-invalid')).toBe('true')
		const errormessage = input().getAttribute('aria-errormessage')!
		expect(errormessage).toContain('outside-error')
		expect(errormessage).toMatch(/supporting-text-/)
	})

	test('lets a consumer aria-invalid through when there is no issue', () => {
		render(TextField, { label: 'Name', 'aria-invalid': 'true' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('applies the same wiring to the textarea', () => {
		render(TextField, {
			type: 'textarea',
			label: 'Bio',
			supportingText: 'Keep it short',
			'aria-describedby': 'outside-hint',
		})

		const describedby = textarea().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		expect(describedby).toMatch(/supporting-text-/)
	})
})
