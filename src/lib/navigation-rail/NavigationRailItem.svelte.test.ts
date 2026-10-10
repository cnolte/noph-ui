import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './NavigationRailItemHarness.test.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

describe('NavigationRailItem', async () => {
	test('renders a button when href is undefined', async () => {
		await render(Harness, { href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', async () => {
		await render(Harness, { href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', async () => {
		await render(Harness, { href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})

	test('a dot badge is read as New notification after the name', async () => {
		await render(Harness, { badge: true })

		const item = page.getByRole('button', { name: 'Home', exact: true })
		await expect.element(item).toHaveAccessibleDescription('New notification')
	})

	test('a count badge is read as its number, or as badgeAriaLabel', async () => {
		const { rerender } = await render(Harness, { badge: true, badgeLabel: 1200 })
		const item = page.getByRole('button', { name: 'Home', exact: true })
		await expect.element(item).toHaveAccessibleDescription('1200')

		await rerender({ badge: true, badgeLabel: 3, badgeAriaLabel: '3 updates' })
		await expect.element(item).toHaveAccessibleDescription('3 updates')
	})

	test('a small badge sits inside the top trailing corner of the icon', async () => {
		await render(Harness, { badge: true })

		const icon = document.querySelector('svg')!.getBoundingClientRect()
		const badge = document.querySelector('.np-badge-container')!.getBoundingClientRect()
		expect(badge.top).toBe(icon.top)
		expect(badge.right).toBe(icon.right)
	})

	test('hovering the icon itself shows the hover state layer', async () => {
		await render(Harness)

		await page.elementLocator(document.querySelector('.np-navigation-action-icon')!).hover()
		await expect
			.poll(() =>
				document.querySelector('.np-ripple-surface')!.classList.contains('np-ripple-hovered'),
			)
			.toBe(true)
	})
})
