import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './SheetHarness.test.svelte'

const sheet = () => document.querySelector<HTMLDialogElement>('.np-sheet')!
const at = (id: string) => document.querySelector<HTMLElement>(`[data-testid="${id}"]`)!

describe('Sheet', async () => {
	test('is a dialog, closed and out of the layout to start', async () => {
		await render(Harness, { open: false })

		expect(sheet().tagName).toBe('DIALOG')
		expect(sheet().open).toBe(false)
		expect(getComputedStyle(sheet()).display).toBe('none')
	})

	test('bind:open opens and closes it', async () => {
		const { rerender } = await render(Harness, { open: false })

		await rerender({ open: true })
		await expect.poll(() => sheet().open).toBe(true)

		await rerender({ open: false })
		await expect.poll(() => sheet().open).toBe(false)
	})

	test('a modal sheet is named by its headline', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => sheet().open).toBe(true)

		const labelledby = sheet().getAttribute('aria-labelledby')!
		expect(document.getElementById(labelledby)!.textContent).toBe('Sheet headline')
	})

	test('a modal sheet blocks the page behind it, including what arrives later', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => sheet().open).toBe(true)

		// Appended while the sheet is already open. A hand-rolled trap can only inert what exists
		// at the moment it runs, so this is exactly the case it misses.
		const late = document.createElement('button')
		late.textContent = 'late'
		document.body.append(late)

		// Focus cannot reach either one: the browser keeps everything outside the modal blocked
		// for as long as it is open.
		at('outside').focus()
		expect(document.activeElement).not.toBe(at('outside'))
		late.focus()
		expect(document.activeElement).not.toBe(late)

		// And focus does land inside.
		at('inside').focus()
		expect(document.activeElement).toBe(at('inside'))

		late.remove()
	})

	test('closing restores focus to whatever had it', async () => {
		const { rerender } = await render(Harness, { open: false })
		at('outside').focus()
		expect(document.activeElement).toBe(at('outside'))

		await rerender({ open: true })
		await expect.poll(() => sheet().open).toBe(true)
		await rerender({ open: false })

		await expect.poll(() => document.activeElement).toBe(at('outside'))
	})

	test('a standard sheet does not block the page', async () => {
		await render(Harness, { open: true, modal: false })

		await expect.poll(() => sheet().open).toBe(true)
		expect(sheet().matches(':modal')).toBe(false)
		// The contrast that makes the modal test above mean something: focus really does move
		// here, so the modal case failing to move it is the trap and not an inert environment.
		at('outside').focus()
		expect(document.activeElement).toBe(at('outside'))
	})

	test('a modal sheet is modal and light dismisses', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => sheet().open).toBe(true)

		expect(sheet().matches(':modal')).toBe(true)
		expect(sheet().getAttribute('closedby')).toBe('any')
	})

	test('the drag handle is a bottom sheet affordance only', async () => {
		const { rerender } = await render(Harness, { open: true, placement: 'bottom' })
		await expect.poll(() => !!document.querySelector('.np-sheet-handle')).toBe(true)

		await rerender({ open: true, placement: 'end' })

		await expect.poll(() => !!document.querySelector('.np-sheet-handle')).toBe(false)
	})

	test('each edge docks the sheet to that side', async () => {
		const { rerender } = await render(Harness, { open: true, placement: 'bottom' })
		await expect.poll(() => sheet().open).toBe(true)
		const bottom = sheet().getBoundingClientRect()
		expect(Math.round(bottom.bottom)).toBe(Math.round(window.innerHeight))

		await rerender({ open: true, placement: 'end' })
		await expect.poll(() => sheet().open).toBe(true)
		const end = sheet().getBoundingClientRect()
		expect(Math.round(end.right)).toBe(Math.round(window.innerWidth))
		expect(Math.round(end.height)).toBe(Math.round(window.innerHeight))
	})
})
