import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Card from './Card.svelte'

const container = () => document.querySelector<HTMLElement>('.np-card-container')!

describe('Card element', () => {
	test('keeps the old type="text" a static card, not a submit button', async () => {
		await render(Card, { type: 'text', headline: 'Plain', onclick: () => {} })
		expect(container().tagName).toBe('DIV')
		expect(container().hasAttribute('type')).toBe(false)
	})

	test('keeps the old type="link" a link without a type attribute', async () => {
		await render(Card, { type: 'link', href: '#target', headline: 'Link' })
		expect(container().tagName).toBe('A')
		expect(container().hasAttribute('type')).toBe(false)
	})

	test('is a plain button with onclick', async () => {
		await render(Card, { onclick: () => {}, headline: 'Button' })
		expect(container().tagName).toBe('BUTTON')
		expect(container().getAttribute('type')).toBe('button')
	})

	test('passes a native submit type through', async () => {
		await render(Card, { type: 'submit', headline: 'Submit' })
		expect(container().getAttribute('type')).toBe('submit')
	})
})
