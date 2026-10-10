import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import ExtendedFab from './ExtendedFab.svelte'
import Fab from './Fab.svelte'
import Harness from './FabMenuItemsHarness.test.svelte'

const trigger = () => document.querySelector<HTMLElement>('.np-fab-menu-trigger')!
const list = () => document.querySelector<HTMLElement>('.np-fab-menu-list')!
const items = () => [...list().querySelectorAll<HTMLElement>('[role="menuitem"]')]
const focusedText = () => document.activeElement?.textContent?.trim()
const color = (el: Element, prop: 'backgroundColor' | 'color') => getComputedStyle(el)[prop]
const resolve = (token: string) => {
	const probe = document.createElement('div')
	probe.style.color = `var(${token})`
	document.body.append(probe)
	const value = getComputedStyle(probe).color
	probe.remove()
	return value
}

describe('FAB', async () => {
	test('is square by default', async () => {
		await render(Fab, { label: 'Add' })
		expect(document.querySelector('.np-fab')!.classList).toContain('square')
	})
})

describe('ExtendedFAB', async () => {
	test.each([
		['s', '16px', '8px', '500'],
		['m', '26px', '12px', '400'],
		['l', '28px', '16px', '400'],
	] as const)(
		'size %s has the padding, gap and weight of the spec',
		async (size, padding, gap, weight) => {
			await render(ExtendedFab, { label: 'Compose', size })
			const style = getComputedStyle(document.querySelector('.np-extended-fab')!)
			expect(style.paddingInlineStart).toBe(padding)
			expect(style.columnGap).toBe(gap)
			expect(style.fontWeight).toBe(weight)
		},
	)

	test('never truncates its label', async () => {
		await render(ExtendedFab, { label: 'Start a brand new conversation with the whole team' })
		const label = document.querySelector<HTMLElement>('.np-fab-label')!
		expect(label.scrollWidth).toBeLessThanOrEqual(label.clientWidth)
	})
})

describe('FAB menu', async () => {
	test('lists the actions top to bottom in focus order', async () => {
		await render(Harness)
		await userEvent.click(trigger())
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		const [album, photo, video] = items().map((i) => i.getBoundingClientRect().top)
		expect(album).toBeLessThan(photo)
		expect(photo).toBeLessThan(video)
	})

	test('ArrowDown on the FAB opens it on the first action, then moves down', async () => {
		await render(Harness)
		trigger().focus()

		await userEvent.keyboard('{ArrowDown}')
		await expect.poll(focusedText).toBe('Album')
		await userEvent.keyboard('{ArrowDown}')
		expect(focusedText()).toBe('Photo')
	})

	test('a letter moves to the action that starts with it', async () => {
		await render(Harness)
		trigger().focus()
		await userEvent.keyboard('{ArrowDown}')
		await expect.poll(focusedText).toBe('Album')

		await userEvent.keyboard('v')

		expect(focusedText()).toBe('Video')
	})

	test('items measure like a medium button', async () => {
		await render(Harness)
		await userEvent.click(trigger())
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		expect(items()[0].getBoundingClientRect().height).toBe(56)
	})

	test('a tertiary FAB opens a tertiary menu', async () => {
		await render(Harness, { variant: 'tertiary-container' })
		await userEvent.click(trigger())
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		await expect
			.poll(() => color(trigger(), 'backgroundColor'))
			.toBe(resolve('--np-color-tertiary'))
		expect(color(items()[0], 'backgroundColor')).toBe(resolve('--np-color-tertiary-container'))
		await expect.element(page.getByRole('menuitem', { name: 'Album' })).toBeVisible()
	})

	test('a focused action stays on top, so its ring is not covered by the next one', async () => {
		await render(Harness)
		trigger().focus()
		await userEvent.keyboard('{ArrowDown}')
		await expect.poll(focusedText).toBe('Album')

		expect(getComputedStyle(document.activeElement!).zIndex).toBe('1')
		expect(getComputedStyle(items()[1]).zIndex).toBe('auto')
	})
})
