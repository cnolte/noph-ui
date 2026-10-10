import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './BadgeHarness.test.svelte'

const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect()
const icon = () => rect('[data-testid="icon"]')
const badge = () => rect('.np-badge-container')

describe('Badge placement', async () => {
	test('a small badge sits inside the top trailing corner of the icon', async () => {
		await render(Harness)

		expect(badge().top - icon().top).toBe(0)
		expect(icon().right - badge().left).toBe(6)
		expect(badge().right).toBe(icon().right)
	})

	test('a large badge starts 12px inside the icon and 2px above it', async () => {
		await render(Harness, { label: 3 })

		expect(icon().top - badge().top).toBe(2)
		expect(icon().right - badge().left).toBe(12)
		expect(badge().height).toBe(16)
	})

	test('a wider badge keeps its leading edge and grows to the trailing side', async () => {
		await render(Harness, { label: 999 })

		expect(icon().right - badge().left).toBe(12)
		expect(badge().width).toBeGreaterThan(16)
	})

	test('mirrors for right-to-left text', async () => {
		await render(Harness, { label: 3, dir: 'rtl' })

		expect(badge().right - icon().left).toBe(12)
	})
})

describe('Badge label', async () => {
	test('shows counts above 999 as 999+', async () => {
		await render(Harness, { label: 1200 })

		expect(document.querySelector('.np-badge-label')!.textContent!.trim()).toBe('999+')
	})

	test('leaves shorter counts and text alone', async () => {
		await render(Harness, { label: 999 })

		expect(document.querySelector('.np-badge-label')!.textContent!.trim()).toBe('999')
	})
})
