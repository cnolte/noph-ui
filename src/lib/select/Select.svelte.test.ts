import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './MenuWidthHarness.test.svelte'
import MultiHarness from './SelectOptionsHarness.test.svelte'

describe.each(['select', 'autocomplete'] as const)('%s menu width', async (which) => {
	test.each(['420px', '260px'])('matches the field at %s', async (width) => {
		await render(Harness, { which, width })

		const field = document.querySelector<HTMLElement>(
			which === 'select' ? '.field' : '.np-text-field',
		)!
		const menu = document.querySelector<HTMLElement>('.np-menu-container')!
		menu.showPopover()

		const fieldWidth = Math.round(field.getBoundingClientRect().width)
		expect(fieldWidth).toBe(Number.parseInt(width, 10))

		await expect.poll(() => Math.round(menu.getBoundingClientRect().width)).toBe(fieldWidth)
	})
})

describe('select options', async () => {
	test('a multiple select leads each option with a checkmark', async () => {
		await render(MultiHarness, { multiple: true, value: ['a'] })

		expect(document.querySelectorAll('.np-item-start')).toHaveLength(2)
		expect(
			[...document.querySelectorAll('[role="option"]')].map((o) => o.getAttribute('aria-selected')),
		).toEqual(['true', 'false'])
	})

	test('a single select has no checkmark column', async () => {
		await render(MultiHarness, { value: 'b' })

		expect(document.querySelectorAll('.np-item-start')).toHaveLength(0)
		expect(
			[...document.querySelectorAll('[role="option"]')].map((o) => o.getAttribute('aria-selected')),
		).toEqual(['false', 'true'])
	})
})
