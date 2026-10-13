import { describe, expect, test } from 'vitest'
import { createRawSnippet } from 'svelte'
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

	test('issues alone switch on the error state', async () => {
		await render(NativeSelect, { label: 'Fruit', issues: [{ message: 'Required' }] })

		expect(select().getAttribute('aria-invalid')).toBe('true')
		expect(select().matches(':user-invalid')).toBe(false)
		const errormessage = select().getAttribute('aria-errormessage')!
		expect(document.getElementById(errormessage)?.textContent?.trim()).toBe('Required')
	})
})

describe('NativeSelect filled', async () => {
	test('shows the chosen option over its container', async () => {
		await render(NativeSelect, {
			label: 'Fruit',
			variant: 'filled',
			value: 'apple',
			children: createRawSnippet(() => ({
				render: () => '<option value="apple">Apple</option>',
			})),
		})

		// Hit testing follows the paint order, once the container can be hit at all.
		document.querySelector<HTMLElement>('.np-field-background')!.style.pointerEvents = 'auto'
		const box = select().getBoundingClientRect()
		const top = document.elementFromPoint(box.left + 24, box.top + box.height * 0.7)
		expect(top === select() || select().contains(top)).toBe(true)
	})
})
