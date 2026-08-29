import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
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
})
