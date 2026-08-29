import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MenuItem from './MenuItem.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

describe('MenuItem', async () => {
	test('renders a button when href is undefined', async () => {
		await render(MenuItem, { href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', async () => {
		await render(MenuItem, { href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', async () => {
		await render(MenuItem, { href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})
})
