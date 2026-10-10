import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Slider from './Slider.svelte'

const labelOpen = () => !!document.querySelector('.np-slider-label-anchor:popover-open')

describe('Slider value label', async () => {
	test('does not show on hover', async () => {
		await render(Slider, { labeled: true, value: 50, 'aria-label': 'Volume' })
		const handle = document.querySelector<HTMLElement>('.np-slider-handle-start')!
		const rect = handle.getBoundingClientRect()

		await page.elementLocator(document.body).hover({
			position: { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 },
		})

		expect(labelOpen()).toBe(false)
	})

	test('shows on keyboard focus', async () => {
		await render(Slider, { labeled: true, value: 50, 'aria-label': 'Volume' })

		document.querySelector<HTMLInputElement>('input')!.focus()

		await expect.poll(labelOpen).toBe(true)
	})
})
