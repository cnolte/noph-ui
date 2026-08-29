import { describe, expect, onTestFinished, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './OverlayOpenHarness.test.svelte'

const surfaces = {
	dialog: '.np-dialog-container',
	menu: '.np-menu-container',
	snackbar: '.np-snackbar',
	tooltip: '.np-tooltip',
} as const

type Which = keyof typeof surfaces

const surface = (which: Which) => document.querySelector<HTMLElement>(surfaces[which])!
/*
 * Dialog is a `<dialog>` now and the rest are popovers, so "is it showing" is a different check
 * per component: `open` for the dialog, `:popover-open` for the others.
 */
const isOpen = (which: Which) => {
	const el = surface(which)
	return el instanceof HTMLDialogElement ? el.open : el.matches(':popover-open')
}

/**
 * `bind:open` has to work in both directions on every overlay. It used to be read-only on
 * Dialog, Menu, Snackbar and Tooltip: the toggle event wrote to it, but setting it from the app
 * did nothing.
 */
describe.each(Object.keys(surfaces) as Which[])('%s bind:open', async (which) => {
	test('opens when open is set to true', async () => {
		const { rerender } = await render(Harness, { which, open: false })
		expect(isOpen(which)).toBe(false)

		await rerender({ which, open: true })

		await expect.poll(() => isOpen(which)).toBe(true)
	})

	test('closes when open is set back to false', async () => {
		const { rerender } = await render(Harness, { which, open: true })
		await expect.poll(() => isOpen(which)).toBe(true)

		await rerender({ which, open: false })

		await expect.poll(() => isOpen(which)).toBe(false)
	})
})

/**
 * A trigger in markup writes `open` back from a DOM event, which the effect keeping `open` and the
 * overlay in step then sees. It must not answer that by calling the imperative method again:
 * `beforetoggle` fires in the middle of the browser's show operation, before the popover is
 * `:popover-open`, and `showPopover()` from inside that operation throws InvalidStateError. The
 * error escapes as an uncaught one, leaving the overlay open, so only a listener catches it.
 */
describe.each(Object.keys(surfaces) as Which[])('%s opened from its trigger', async (which) => {
	test('does not re-enter its own show operation', async () => {
		const errors: string[] = []
		const onError = (event: ErrorEvent) => errors.push(event.message)
		window.addEventListener('error', onError)
		onTestFinished(() => window.removeEventListener('error', onError))

		const screen = await render(Harness, { which, open: false })
		await screen.getByRole('button', { name: 'Open' }).click()

		await expect.poll(() => isOpen(which)).toBe(true)
		expect(errors).toEqual([])
	})
})
