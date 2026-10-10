import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import { resolve, rippleHoverColor } from '#lib/internal/colors.test.helpers.js'
import Switch from './Switch.svelte'

const track = () => document.querySelector<HTMLElement>('.np-track')!
const handle = () => document.querySelector<HTMLElement>('.np-handle')!
const input = () => document.querySelector<HTMLInputElement>('input')!
const visibleIcons = () =>
	[...document.querySelectorAll<SVGElement>('.np-switch-icon')].filter(
		(icon) => getComputedStyle(icon).display !== 'none',
	)

const handleOffset = () => {
	const transform = getComputedStyle(handle()).transform
	return transform === 'none' ? 0 : new DOMMatrix(transform).e
}

describe('Switch', async () => {
	test('reads its appearance off the checkbox rather than a class', async () => {
		await render(Switch, { selected: false, icons: 'both' })
		const unselectedTrack = getComputedStyle(track()).backgroundColor
		expect(handleOffset()).toBe(0)

		input().checked = true

		await expect.poll(handleOffset).toBeGreaterThan(0)
		expect(getComputedStyle(track()).backgroundColor).not.toBe(unselectedTrack)
	})

	test('swaps the icon off the checkbox alone', async () => {
		await render(Switch, { selected: false, icons: 'both' })
		expect(visibleIcons()).toHaveLength(1)
		const unselected = visibleIcons()[0]

		input().checked = true

		expect(visibleIcons()).toHaveLength(1)
		expect(visibleIcons()[0]).not.toBe(unselected)
	})

	test('shows an icon only when on with icons="selected"', async () => {
		await render(Switch, { selected: false, icons: 'selected' })
		expect(visibleIcons()).toHaveLength(0)

		input().checked = true

		expect(visibleIcons()).toHaveLength(1)
	})

	test('moves the handle on a click', async () => {
		await render(Switch, { selected: false })
		expect(handleOffset()).toBe(0)

		await page.getByRole('switch').click()

		await expect.poll(handleOffset).toBeGreaterThan(0)
		expect(input().checked).toBe(true)
	})

	test('Enter toggles like Space and fires input and change', async () => {
		let inputs = 0
		let changes = 0
		await render(Switch, {
			selected: false,
			oninput: () => (inputs += 1),
			onchange: () => (changes += 1),
		})
		input().focus()

		await userEvent.keyboard('{Enter}')

		expect(input().checked).toBe(true)
		expect(inputs).toBe(1)
		expect(changes).toBe(1)
	})

	test('a consumer can cancel Enter in onkeydown', async () => {
		await render(Switch, {
			selected: false,
			onkeydown: (event: KeyboardEvent) => event.preventDefault(),
		})
		input().focus()

		await userEvent.keyboard('{Enter}')

		expect(input().checked).toBe(false)
	})

	test('has a target at least 48px tall', async () => {
		await render(Switch)

		const rect = input().getBoundingClientRect()
		expect(rect.height).toBe(48)
		expect(rect.width).toBeGreaterThanOrEqual(48)
	})

	test('the state layer is primary when selected and on-surface when not', async () => {
		await render(Switch, { selected: false })
		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-on-surface'))

		input().checked = true

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-primary'))
	})

	test('the handle changes color on hover', async () => {
		await render(Switch, { selected: false })
		const idle = getComputedStyle(handle()).backgroundColor
		expect(idle).toBe(resolve('--np-color-outline'))

		await page.getByRole('switch').hover()

		await expect
			.poll(() => getComputedStyle(handle()).backgroundColor)
			.toBe(resolve('--np-color-on-surface-variant'))

		input().checked = true

		// The spec's primary container sits too close to primary in some themes, so a selected
		// handle keeps on-primary.
		await expect
			.poll(() => getComputedStyle(handle()).backgroundColor)
			.toBe(resolve('--np-color-on-primary'))
	})

	test('disabled and off, handle and track outline use on-surface', async () => {
		await render(Switch, { selected: false, disabled: true })

		expect(getComputedStyle(handle()).backgroundColor).toBe(resolve('--np-color-on-surface'))
		expect(getComputedStyle(track()).outlineColor).toBe(resolve('--np-color-on-surface'))
	})

	test('an error keeps its own state layer color when selected', async () => {
		await render(Switch, { selected: true, issues: [{ message: 'Required' }] })

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-error'))
	})

	test('a themed handle and track keep their colors on hover', async () => {
		const { container } = await render(Switch, { selected: true })
		const root = container.querySelector<HTMLElement>('.np-switch')!
		root.style.setProperty('--np-switch-selected-track-color', 'rgb(1, 2, 3)')
		root.style.setProperty('--np-switch-selected-handle-color', 'rgb(4, 5, 6)')

		await page.getByRole('switch').hover()

		await expect.poll(() => getComputedStyle(handle()).backgroundColor).toBe('rgb(4, 5, 6)')
		await expect.poll(rippleHoverColor).toBe('rgb(1, 2, 3)')
	})
})
