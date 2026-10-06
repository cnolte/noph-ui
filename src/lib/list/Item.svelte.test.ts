import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Item from './Item.svelte'

const item = () => document.querySelector<HTMLElement>('.np-item')!

describe('Item element', () => {
	test('keeps the deprecated variant working', async () => {
		await render(Item, { variant: 'button' })
		expect(item().tagName).toBe('BUTTON')
	})

	test('keeps type="text" static even with a click handler', async () => {
		await render(Item, { type: 'text', onclick: () => {} })
		expect(item().tagName).toBe('DIV')
		expect(item().hasAttribute('type')).toBe(false)
	})

	test('lets type win over the deprecated variant', async () => {
		await render(Item, { variant: 'link', type: 'submit' })
		expect(item().tagName).toBe('BUTTON')
		expect(item().getAttribute('type')).toBe('submit')
	})

	test('puts no type attribute on a link', async () => {
		await render(Item, { href: '#target' })
		expect(item().tagName).toBe('A')
		expect(item().hasAttribute('type')).toBe(false)
	})
})
