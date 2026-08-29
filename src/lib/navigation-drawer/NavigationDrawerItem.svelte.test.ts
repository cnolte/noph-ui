import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import NavigationDrawerItem from './NavigationDrawerItem.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

describe('NavigationDrawerItem', async () => {
	test('renders a button when href is undefined', async () => {
		await render(NavigationDrawerItem, { label: 'Home', href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', async () => {
		await render(NavigationDrawerItem, { label: 'Home', href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', async () => {
		await render(NavigationDrawerItem, { label: 'Home', href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})
})
