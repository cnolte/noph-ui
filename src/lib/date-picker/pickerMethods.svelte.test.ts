import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './PickerMethodsHarness.test.svelte'

const WHICH = ['dialog', 'range', 'docked', 'dockedTime'] as const

/** The dialogs report through `open`; the docked pickers hang their calendar off a popover. */
const isOpen = () => {
	const dialog = document.querySelector('dialog')
	if (dialog) return dialog.open
	return !!document.querySelector('[popover]:popover-open')
}

const press = (testid: string) =>
	document.querySelector<HTMLButtonElement>(`[data-testid="${testid}"]`)!.click()

const bound = () => document.querySelector('[data-testid="bound-open"]')!.textContent

/**
 * Every overlay in the library exports the same pair, so a page with no trigger to point at the
 * picker can still open it without reaching for `open`. `open` follows either way.
 */
describe.each(WHICH)('%s show() and close()', async (which) => {
	test('show() opens it and open follows', async () => {
		await render(Harness, { which })
		expect(isOpen()).toBe(false)

		press('show')

		await expect.poll(isOpen).toBe(true)
		await expect.poll(bound).toBe('true')
	})

	test('close() closes it again and open follows', async () => {
		await render(Harness, { which, open: true })
		await expect.poll(isOpen).toBe(true)

		press('close')

		await expect.poll(isOpen).toBe(false)
		await expect.poll(bound).toBe('false')
	})

	test('show() on an already open picker is a no-op', async () => {
		await render(Harness, { which, open: true })
		await expect.poll(isOpen).toBe(true)

		press('show')

		await expect.poll(isOpen).toBe(true)
	})
})

/** A disabled field has nothing to pick with, so `show()` must not get around that. */
describe.each(['docked', 'dockedTime'] as const)('disabled %s', async (which) => {
	test('show() leaves it closed', async () => {
		await render(Harness, { which, disabled: true })

		press('show')

		await expect.poll(bound).toBe('false')
		expect(isOpen()).toBe(false)
	})
})
