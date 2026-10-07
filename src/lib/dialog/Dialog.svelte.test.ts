import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './DialogHarness.test.svelte'

const headline = () => document.querySelector<HTMLElement>('.np-dialog-headline')!

describe('Dialog', () => {
	test('the headline is a level two heading, so it sits under the page heading', async () => {
		await render(Harness, { open: true })

		expect(headline().tagName).toBe('H2')
		expect(headline().textContent?.trim()).toBe('Reset settings?')
	})

	test('the heading level can be moved where the page needs it', async () => {
		await render(Harness, { open: true, headlineLevel: 3 })

		expect(headline().tagName).toBe('H3')
	})

	test('the dialog is named by its headline', async () => {
		await render(Harness, { open: true })

		const dialog = document.querySelector<HTMLDialogElement>('.np-dialog-container')!
		expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)).toBe(headline())
	})

	test('focus lands on the first interactive element, not on the dialog', async () => {
		await render(Harness, { open: true })
		// The toggle event is queued after showModal(), so let it run first.
		await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve)))

		expect(document.activeElement?.textContent).toBe('Reset')
	})
})
