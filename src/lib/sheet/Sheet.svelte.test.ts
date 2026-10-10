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

	test('the headline is a level two heading, and takes another level when asked', async () => {
		const { rerender } = await render(Harness, { open: true })

		expect(document.querySelector('h2.np-sheet-headline')?.textContent?.trim()).toBe(
			'Sheet headline',
		)

		await rerender({ open: true, headlineLevel: 3 })

		expect(document.querySelector('h3.np-sheet-headline')?.textContent?.trim()).toBe(
			'Sheet headline',
		)
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

		const late = document.createElement('button')
		late.textContent = 'late'
		document.body.append(late)

		at('outside').focus()
		expect(document.activeElement).not.toBe(at('outside'))
		late.focus()
		expect(document.activeElement).not.toBe(late)

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

	test('the drag handle is a labelled button with a 48px target', async () => {
		await render(Harness, { open: true })

		const handle = document.querySelector<HTMLButtonElement>('.np-sheet-handle')!
		expect(handle.tagName).toBe('BUTTON')
		expect(handle.getAttribute('aria-label')).toBe('Drag handle')
		expect(handle.getAttribute('aria-expanded')).toBe('false')
		const box = handle.getBoundingClientRect()
		expect(box.width).toBe(48)
		expect(box.height).toBe(48)
	})

	test('selecting the handle raises a tall sheet to full height, then back', async () => {
		await render(Harness, { open: true, long: true })
		const handle = document.querySelector<HTMLButtonElement>('.np-sheet-handle')!
		await expect.poll(() => sheet().open).toBe(true)

		handle.click()
		await expect.poll(() => handle.getAttribute('aria-expanded')).toBe('true')
		const full = window.innerWidth > 640 ? 56 : 72
		await expect
			.poll(() => getComputedStyle(sheet()).maxHeight)
			.toBe(`${window.innerHeight - full}px`)

		handle.click()
		await expect.poll(() => handle.getAttribute('aria-expanded')).toBe('false')
	})

	test('selecting the handle of a short sheet closes it', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => sheet().open).toBe(true)

		document.querySelector<HTMLButtonElement>('.np-sheet-handle')!.click()
		await expect.poll(() => sheet().open).toBe(false)
	})

	const dragHandle = (dy: number) => {
		const handle = document.querySelector<HTMLButtonElement>('.np-sheet-handle')!
		const box = handle.getBoundingClientRect()
		const x = box.left + box.width / 2
		const y = box.top + box.height / 2
		const init = { bubbles: true, pointerId: 1, button: 0, clientX: x }
		handle.dispatchEvent(new PointerEvent('pointerdown', { ...init, clientY: y }))
		handle.dispatchEvent(new PointerEvent('pointermove', { ...init, clientY: y + dy / 2 }))
		handle.dispatchEvent(new PointerEvent('pointermove', { ...init, clientY: y + dy }))
		handle.dispatchEvent(new PointerEvent('pointerup', { ...init, clientY: y + dy }))
	}

	test('dragging the handle down closes the sheet', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => sheet().open).toBe(true)

		dragHandle(sheet().getBoundingClientRect().height)
		await expect.poll(() => sheet().open).toBe(false)
	})

	test('dragging the handle up raises a tall sheet to full height', async () => {
		await render(Harness, { open: true, long: true })
		await expect.poll(() => sheet().open).toBe(true)

		dragHandle(-window.innerHeight / 2)
		await expect
			.poll(() => document.querySelector('.np-sheet-handle')!.getAttribute('aria-expanded'))
			.toBe('true')
		expect(sheet().open).toBe(true)
	})

	test('a standard side sheet sits in the layout instead of over it', async () => {
		await render(Harness, { open: true, modal: false, placement: 'end' })
		await expect.poll(() => sheet().open).toBe(true)

		expect(getComputedStyle(sheet()).position).toBe('relative')
		expect(getComputedStyle(sheet()).boxShadow).toBe('none')
	})

	test('a detached side sheet keeps 16px from the edges and rounds every corner', async () => {
		await render(Harness, { open: true, placement: 'end', detached: true })
		await expect.poll(() => sheet().open).toBe(true)

		const box = sheet().getBoundingClientRect()
		expect(Math.round(window.innerWidth - box.right)).toBe(16)
		expect(Math.round(box.top)).toBe(16)
		expect(getComputedStyle(sheet()).borderTopRightRadius).not.toBe('0px')
	})

	test('a back button leads the header and actions line the bottom', async () => {
		await render(Harness, { open: true, placement: 'end' })
		await expect.poll(() => sheet().open).toBe(true)

		expect(at('back').closest('.np-sheet-leading')).not.toBeNull()
		expect(at('save').closest('.np-sheet-actions')).not.toBeNull()
		const actions = at('save').closest('.np-sheet-actions')!.getBoundingClientRect()
		expect(Math.round(actions.bottom)).toBe(Math.round(sheet().getBoundingClientRect().bottom))
	})
})
