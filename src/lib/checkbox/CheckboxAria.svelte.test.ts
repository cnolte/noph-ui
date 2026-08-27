import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Checkbox from './Checkbox.svelte'

const input = () => document.querySelector<HTMLInputElement>('input')!

describe('Checkbox aria wiring', () => {
	test('marks itself invalid from issues', () => {
		render(Checkbox, { issues: [{ message: 'Required' }] })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('lets a consumer aria-invalid through when there is no issue', () => {
		render(Checkbox, { 'aria-invalid': 'true' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('an issue wins over a consumer aria-invalid of false', () => {
		render(Checkbox, { issues: [{ message: 'Required' }], 'aria-invalid': 'false' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})
})
