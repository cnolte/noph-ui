import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './SnackbarHarness.test.svelte'
import type { SnackbarProps } from './types.ts'

type Props = Omit<SnackbarProps, 'icon' | 'open' | 'timeout'>

const TIMEOUT = 100

const surface = () => document.querySelector<HTMLElement>('.np-snackbar')!
const isOpen = () => surface().matches(':popover-open')
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const hover = (el: HTMLElement) => page.elementLocator(el).hover()
const elsewhere = () => document.getElementById('elsewhere')!

/*
 * The pointer is a page-wide thing in a browser test and a hovered snackbar waits, so a test has to
 * say where the mouse is rather than inherit it. Moving it takes long enough that a snackbar
 * rendered with a live timeout can close on the way, so these open without one, park the pointer
 * off the snackbar, and hand back the arming of the timeout for the test to do last.
 */
const openWithoutTimer = async (props: Props) => {
	const { rerender } = await render(Harness, { ...props, open: true, timeout: 0 })
	await expect.poll(isOpen, { timeout: 3000 }).toBe(true)
	await hover(elsewhere())
	return () => rerender({ ...props, open: true, timeout: TIMEOUT })
}

test('closes itself once the timeout has run', async () => {
	const arm = await openWithoutTimer({ label: 'Saved' })

	await arm()

	await expect.poll(isOpen, { timeout: 3000 }).toBe(false)
})

test('stays open when there is no timeout', async () => {
	await openWithoutTimer({ label: 'Saved' })

	await wait(TIMEOUT * 3)

	expect(isOpen()).toBe(true)
})

test('holds while it is hovered and starts over once the pointer leaves', async () => {
	const arm = await openWithoutTimer({ label: 'Saved' })
	await hover(surface())
	await arm()

	await wait(TIMEOUT * 3)
	expect(isOpen()).toBe(true)

	await hover(elsewhere())

	await expect.poll(isOpen, { timeout: 3000 }).toBe(false)
})

test('holds while something inside it has focus', async () => {
	const arm = await openWithoutTimer({ label: 'Saved', actionLabel: 'Undo' })
	const action = surface().querySelector('button')!
	action.focus()
	expect(document.activeElement).toBe(action)
	await arm()

	await wait(TIMEOUT * 3)
	expect(isOpen()).toBe(true)

	action.blur()

	await expect.poll(isOpen, { timeout: 3000 }).toBe(false)
})

test('the icon button closes it and carries iconAriaLabel', async () => {
	await render(Harness, { label: 'Saved', open: true, timeout: 0, iconAriaLabel: 'Dismiss' })
	await expect.poll(isOpen, { timeout: 3000 }).toBe(true)

	await page.getByRole('button', { name: 'Dismiss' }).click()

	await expect.poll(isOpen, { timeout: 3000 }).toBe(false)
})

test('is one atomic alert region, named by the caller or not at all', async () => {
	await render(Harness, {
		label: 'Reservation saved',
		supportingText: 'Table for two',
		open: true,
		timeout: 0,
	})
	await expect.poll(isOpen, { timeout: 3000 }).toBe(true)

	const alert = surface()
	expect(alert.getAttribute('role')).toBe('alert')
	expect(alert.hasAttribute('aria-labelledby')).toBe(false)
	expect(alert.textContent).toContain('Reservation saved')
	expect(alert.textContent).toContain('Table for two')
})

test('takes an aria-label from the caller', async () => {
	await render(Harness, { label: 'Saved', open: true, timeout: 0, 'aria-label': 'Reservation' })
	await expect.poll(isOpen, { timeout: 3000 }).toBe(true)

	expect(surface().getAttribute('aria-label')).toBe('Reservation')
})
