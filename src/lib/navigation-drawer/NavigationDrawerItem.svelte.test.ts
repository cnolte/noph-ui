import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import NavigationDrawerItem from './NavigationDrawerItem.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

describe('NavigationDrawerItem', () => {
	test('renders a button when href is undefined', () => {
		render(NavigationDrawerItem, { label: 'Home', href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', () => {
		render(NavigationDrawerItem, { label: 'Home', href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', () => {
		render(NavigationDrawerItem, { label: 'Home', href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})
})
