import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './NavigationRailItemHarness.test.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

describe('NavigationRailItem', () => {
	test('renders a button when href is undefined', () => {
		render(Harness, { href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', () => {
		render(Harness, { href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', () => {
		render(Harness, { href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})
})
