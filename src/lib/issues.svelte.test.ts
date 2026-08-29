import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import SegmentedButton from '#lib/button/SegmentedButton.svelte'
import FilterChip from '#lib/chip/FilterChip.svelte'
import InputChip from '#lib/chip/InputChip.svelte'
import Radio from '#lib/radio/Radio.svelte'
import Slider from '#lib/slider/Slider.svelte'
import Switch from '#lib/switch/Switch.svelte'

const issues = [{ message: 'Required' }]

/**
 * Resolves a theme token to the value the browser actually computes, so an assertion compares
 * `rgb(...)` with `rgb(...)` rather than with the raw `light-dark(...)` declaration.
 */
const resolve = (token: string) => {
	const probe = document.createElement('span')
	probe.style.color = `var(${token})`
	document.body.append(probe)
	const value = getComputedStyle(probe).color
	probe.remove()
	return value
}

const errorColor = () => resolve('--np-color-error')
const styleOf = (selector: string) =>
	getComputedStyle(document.querySelector<HTMLElement>(selector)!)

/**
 * Every form control takes `issues`, the same `{ message: string }[]` TextField and Select
 * already accept, and shows an error state from it.
 */
describe('issues', async () => {
	test('Radio turns its icon to the error colour', async () => {
		await render(Radio, { name: 'r', value: 'a', 'aria-label': 'a', issues })

		expect(document.querySelector('.np-error')).not.toBeNull()
		expect(styleOf('.np-radio-icon').fill).toBe(errorColor())
	})

	test('Radio sets no aria-invalid, because role="radio" does not support it', async () => {
		await render(Radio, { name: 'r', value: 'a', 'aria-label': 'a', issues })

		expect(document.querySelector('input')!.hasAttribute('aria-invalid')).toBe(false)
	})

	test('Switch marks the input invalid and recolours the track', async () => {
		await render(Switch, { selected: true, issues })

		expect(document.querySelector('input')!.getAttribute('aria-invalid')).toBe('true')
		expect(styleOf('.np-track').backgroundColor).toBe(errorColor())
	})

	test('Slider marks the input invalid and recolours the active track', async () => {
		await render(Slider, { value: 50, issues })

		expect(document.querySelector('input')!.getAttribute('aria-invalid')).toBe('true')
		expect(styleOf('.np-slider-active').backgroundColor).toBe(errorColor())
	})

	test('FilterChip marks its checkbox invalid', async () => {
		await render(FilterChip, { label: 'Fruit', issues })

		expect(document.querySelector('input')!.getAttribute('aria-invalid')).toBe('true')
		expect(document.querySelector('.np-chip-error')).not.toBeNull()
	})

	test('InputChip shows the error state without an unsupported aria-invalid', async () => {
		await render(InputChip, { label: 'a@b.c', issues })

		expect(document.querySelector('.np-chip-error')).not.toBeNull()
		expect(document.querySelector('button')!.hasAttribute('aria-invalid')).toBe(false)
	})

	test('SegmentedButton recolours its border', async () => {
		await render(SegmentedButton, {
			name: 's',
			options: [{ label: 'One' }, { label: 'Two' }],
			issues,
		})

		expect(styleOf('.np-segmented-buttons').borderTopColor).toBe(errorColor())
	})

	test('no error state without issues', async () => {
		await render(Switch, { selected: true })

		expect(document.querySelector('.np-error')).toBeNull()
		expect(styleOf('.np-track').backgroundColor).not.toBe(errorColor())
	})
})
