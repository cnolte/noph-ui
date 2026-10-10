import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { resolve, rippleHoverColor, ripplePressedColor } from '#lib/internal/colors.test.helpers.js'
import Radio from './Radio.svelte'

const container = () => document.querySelector<HTMLElement>('.np-radio-container')!
const input = () => document.querySelector<HTMLInputElement>('input')!

describe('Radio', async () => {
	test('takes a 48px layout box, so the target does not overflow', async () => {
		await render(Radio, { name: 'r' })
		const style = getComputedStyle(container())

		expect(
			container().offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight),
		).toBe(48)
		expect(
			container().offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom),
		).toBe(48)
	})

	test('unselected: hover on-surface, pressed primary', async () => {
		await render(Radio, { name: 'r' })

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-on-surface'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-primary'))
	})

	test('selected: hover primary, pressed on-surface', async () => {
		await render(Radio, { name: 'r' })
		input().checked = true

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-primary'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-on-surface'))
	})

	test('an error keeps its own state layer color when selected', async () => {
		await render(Radio, { name: 'r', checked: true, issues: [{ message: 'Required' }] })

		await expect.poll(rippleHoverColor).toBe(resolve('--np-color-error'))
		expect(ripplePressedColor()).toContain(resolve('--np-color-error'))
	})
})
