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
const isOpen = (which: Which) => {
	const el = surface(which)
	return el instanceof HTMLDialogElement ? el.open : el.matches(':popover-open')
}

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
