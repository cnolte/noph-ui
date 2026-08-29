import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Button from './Button.svelte'
import IconButton from './IconButton.svelte'

const link = () => document.querySelector('a')
const button = () => document.querySelector('button')

const hrefTests = (renderButton: (props: { href?: string | null; disabled?: boolean }) => void) => {
	test('renders a button when href is undefined', () => {
		renderButton({ href: undefined })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a button when href is null', () => {
		renderButton({ href: null })
		expect(link()).toBeNull()
		expect(button()).not.toBeNull()
	})

	test('renders a link when href is set', () => {
		renderButton({ href: '/home' })
		expect(button()).toBeNull()
		expect(link()?.getAttribute('href')).toBe('/home')
	})

	test('renders a button when href is set but disabled', () => {
		renderButton({ href: '/home', disabled: true })
		expect(link()).toBeNull()
		expect(button()?.disabled).toBe(true)
	})
}

describe('Button', async () => {
	hrefTests(async (props) => {
		await render(Button, props)
	})
})

describe('IconButton', async () => {
	hrefTests(async (props) => {
		await render(IconButton, props)
	})
})
