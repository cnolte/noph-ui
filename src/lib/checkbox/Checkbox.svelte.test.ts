import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { resolve, rippleHoverColor, ripplePressedColor } from '#lib/internal/colors.test.helpers.js'
import Checkbox from './Checkbox.svelte'

const input = () => document.querySelector<HTMLInputElement>('input')!

describe('Checkbox state layer', async () => {
	test('unselected: hover on-surface, pressed primary', async () => {
		await render(Checkbox)

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-on-surface'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-primary'))
	})

	test('checked: hover primary, pressed on-surface', async () => {
		await render(Checkbox)
		input().checked = true

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-primary'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-on-surface'))
	})

	test('indeterminate counts as selected', async () => {
		await render(Checkbox, { indeterminate: true })

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-primary'))
	})

	test('an error keeps its own state layer color when checked', async () => {
		await render(Checkbox, { checked: true, issues: [{ message: 'Required' }] })

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-error'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-error'))
	})
})
