import { describe, expect, test } from 'vitest'
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
})
