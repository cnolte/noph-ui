import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import NativeSelect from './NativeSelect.svelte'

const container = () => document.querySelector<HTMLDivElement>('.np-select-container')!
const select = () => document.querySelector<HTMLSelectElement>('select')!

describe('NativeSelect', async () => {
	test('does not leak an "element" attribute onto the DOM', async () => {
		await render(NativeSelect, { label: 'Fruit' })

		expect(container().hasAttribute('element')).toBe(false)
		expect(select().hasAttribute('element')).toBe(false)
	})

	test('keeps a consumer aria-describedby alongside the supporting text', async () => {
		await render(NativeSelect, {
			label: 'Fruit',
			supportingText: 'Pick one',
			'aria-describedby': 'outside-hint',
		})

		const describedby = select().getAttribute('aria-describedby')!
		expect(describedby).toContain('outside-hint')
		expect(describedby).toMatch(/supporting-text-/)
	})

	test('keeps a consumer aria-describedby alongside an error message', async () => {
		await render(NativeSelect, {
			label: 'Fruit',
			issues: [{ message: 'Required' }],
			'aria-describedby': 'outside-hint',
			'aria-errormessage': 'outside-error',
		})

		expect(select().getAttribute('aria-describedby')).toContain('outside-hint')
		const errormessage = select().getAttribute('aria-errormessage')!
		expect(errormessage).toContain('outside-error')
		expect(errormessage).toMatch(/supporting-text-/)
	})
})
