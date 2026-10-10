import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './DialogHarness.test.svelte'

const headline = () => document.querySelector<HTMLElement>('.np-dialog-headline')!
const dialog = () => document.querySelector<HTMLDialogElement>('.np-dialog-container')!

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

	test('a basic dialog is an alert dialog, unless given another role', async () => {
		const { rerender } = await render(Harness, { open: true })
		expect(dialog().getAttribute('role')).toBe('alertdialog')

		await rerender({ role: 'dialog' })
		expect(dialog().getAttribute('role')).toBe('dialog')
	})

	test('a click on the scrim closes it by default', async () => {
		await render(Harness, { open: true })

		dialog().click()
		await expect.poll(() => dialog().open).toBe(false)
	})

	test('closedby="closerequest" keeps it open on a click on the scrim', async () => {
		await render(Harness, { open: true, closedby: 'closerequest' })

		dialog().click()
		await new Promise((resolve) => setTimeout(resolve, 50))
		expect(dialog().open).toBe(true)
	})

	test('closedby="none" keeps it open on Escape', async () => {
		await render(Harness, { open: true, closedby: 'none' })

		const cancel = new Event('cancel', { cancelable: true })
		dialog().dispatchEvent(cancel)
		expect(cancel.defaultPrevented).toBe(true)
	})

	test('long supporting text scrolls between the pinned headline and actions', async () => {
		await render(Harness, { open: true, supportingText: 'Text', long: true })

		const scroller = document.querySelector<HTMLElement>('.np-dialog-scroller')!
		expect(scroller.querySelector('.np-dialog-supporting-text')).not.toBeNull()
		expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight)
		const actions = document.querySelector('.np-dialog-actions')!.getBoundingClientRect()
		expect(actions.bottom).toBeLessThanOrEqual(window.innerHeight)
	})
})

describe('Full-screen dialog', () => {
	test('is a plain dialog with a close button, headline and action in its header', async () => {
		await render(Harness, { open: true, variant: 'full-screen' })

		expect(dialog().getAttribute('role')).toBe('dialog')
		const header = document.querySelector<HTMLElement>('.np-dialog-header')!
		expect(header.querySelector('[aria-label="Close"]')).not.toBeNull()
		expect(header.querySelector('.np-dialog-headline')).not.toBeNull()
		expect(header.textContent).toContain('Save')
		expect(Math.round(header.getBoundingClientRect().height)).toBe(56)
		expect(document.querySelector('.np-dialog-action-bar')!.textContent).toContain('Later')
	})

	test('the close button closes it', async () => {
		await render(Harness, { open: true, variant: 'full-screen' })

		document.querySelector<HTMLElement>('[aria-label="Close"]')!.click()
		await expect.poll(() => dialog().open).toBe(false)
	})

	test('fills a compact window without rounded corners', async () => {
		await render(Harness, { open: true, variant: 'full-screen' })

		const box = dialog().getBoundingClientRect()
		if (window.innerWidth < 600) {
			expect(Math.round(box.width)).toBe(window.innerWidth)
			expect(Math.round(box.height)).toBe(window.innerHeight)
			const surface = document.querySelector('.np-dialog')!
			expect(getComputedStyle(surface).borderTopLeftRadius).toBe('0px')
		} else {
			expect(box.width).toBeLessThanOrEqual(560)
		}
	})
})
