import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Checkbox from './Checkbox.svelte'

const input = () => document.querySelector<HTMLInputElement>('input')!

describe('Checkbox aria wiring', async () => {
	test('marks itself invalid from issues', async () => {
		await render(Checkbox, { issues: [{ message: 'Required' }] })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('lets a consumer aria-invalid through when there is no issue', async () => {
		await render(Checkbox, { 'aria-invalid': 'true' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})

	test('an issue wins over a consumer aria-invalid of false', async () => {
		await render(Checkbox, { issues: [{ message: 'Required' }], 'aria-invalid': 'false' })

		expect(input().getAttribute('aria-invalid')).toBe('true')
	})
})
