import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './TimePickerDialogHarness.test.svelte'

const VALUE = '14:30'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', value: VALUE, ...props })

const boundValue = () => page.getByTestId('bound-value')
const action = (name: string) => page.getByRole('button', { name, exact: true })
const panel = () => document.querySelector<HTMLElement>('.np-time-picker')
const dial = () => document.querySelector<HTMLElement>('.np-clock-dial')
const selector = (name: string) => page.getByRole('radio', { name, exact: true })
const box = (selectorText: string) => {
	const found = document.querySelector<HTMLElement>(selectorText)!
	const rect = found.getBoundingClientRect()
	return { width: Math.round(rect.width), height: Math.round(rect.height) }
}

const openPicker = async () => {
	await action('Open the picker').click()
	await expect.poll(() => !!panel()).toBe(true)
}

const expectClosed = () => expect.poll(() => !!panel()).toBe(false)

let nextPointer = 1

/** A tap on a ring position, 0 at the top going clockwise. */
const tap = (turns: number, ratio = 0.454) => {
	const target = dial()!
	const rect = target.getBoundingClientRect()
	const angle = turns * 2 * Math.PI - Math.PI / 2
	// The handle's radius comes off the ring, as it does in the dial itself.
	const radius = ratio * rect.width - 24
	const shared = {
		pointerId: nextPointer++,
		pointerType: 'touch',
		isPrimary: true,
		bubbles: true,
		clientX: rect.x + rect.width / 2 + Math.cos(angle) * radius,
		clientY: rect.y + rect.height / 2 + Math.sin(angle) * radius,
	}
	target.dispatchEvent(new PointerEvent('pointerdown', shared))
	target.dispatchEvent(new PointerEvent('pointerup', shared))
}

describe('layout and geometry', async () => {
	test('is the vertical 12 hour picker of the spec', async () => {
		await setup({ hour12: true })
		await openPicker()

		expect(box('.np-time-selector')).toEqual({ width: 96, height: 80 })
		expect(box('.np-period-selector')).toEqual({ width: 52, height: 80 })
		expect(box('.np-clock-dial')).toEqual({ width: 256, height: 256 })
	})

	test('widens the fields of a 24 hour vertical dial, which has no period selector', async () => {
		await setup({ hour12: false })
		await openPicker()

		expect(box('.np-time-selector')).toEqual({ width: 114, height: 80 })
		expect(document.querySelector('.np-period-selector')).toBeNull()
	})

	test('lays the period selector out along the bottom when horizontal', async () => {
		await setup({ hour12: true, layout: 'horizontal' })
		await openPicker()

		expect(panel()!.classList.contains('np-horizontal')).toBe(true)
		expect(box('.np-period-selector')).toEqual({ width: 216, height: 38 })
	})

	test('fits its panel, so nothing scrolls', async () => {
		await setup({ hour12: true })
		await openPicker()
		const scroller = document.querySelector<HTMLElement>('.np-dialog-scroller')!
		expect(scroller.scrollWidth).toBe(scroller.clientWidth)
		expect(scroller.scrollHeight).toBe(scroller.clientHeight)
	})

	test('gives the container the 24dp padding of the spec', async () => {
		await setup()
		await openPicker()
		const surface = document.querySelector<HTMLElement>('.np-time-picker-dialog .np-dialog')!
		expect(getComputedStyle(surface).padding).toBe('24px')
	})

	test('stays vertical on a tall window when the layout is left to itself', async () => {
		await setup({ hour12: true, layout: 'auto' })
		await openPicker()
		expect(panel()!.classList.contains('np-horizontal')).toBe(false)
	})
})

describe('dial', async () => {
	test('opens on the value it was given', async () => {
		await setup({ hour12: true })
		await openPicker()
		await expect.element(selector('Hour, 02')).toBeInTheDocument()
		await expect.element(selector('Minute, 30')).toBeInTheDocument()
	})

	test('opens on the hour, then moves on to the minute once the finger lifts', async () => {
		await setup({ hour12: true })
		await openPicker()
		await expect.element(selector('Hour, 02')).toHaveAttribute('aria-checked', 'true')

		tap(3 / 12)
		await expect.element(selector('Hour, 03')).toHaveAttribute('aria-checked', 'false')
		await expect.element(selector('Minute, 30')).toHaveAttribute('aria-checked', 'true')
	})

	test('leaves the hour alone for a keyboard user, who may still be adjusting it', async () => {
		await setup({ hour12: true })
		await openPicker()

		const five = page.getByRole('option', { name: '5 hours of 12', exact: true }).element()
		;(five as HTMLElement).focus()
		;(five as HTMLElement).click()

		await expect.element(selector('Hour, 05')).toHaveAttribute('aria-checked', 'true')
	})

	test('switching field by hand moves the dial to that field', async () => {
		await setup({ hour12: true })
		await openPicker()
		await selector('Minute, 30').click()
		await expect.element(page.getByRole('listbox', { name: 'Select minute' })).toBeInTheDocument()
	})

	test('the period selector moves the value across the half of the day', async () => {
		await setup({ hour12: true })
		await openPicker()
		await selector('AM').click()
		await expect.element(selector('Hour, 02')).toBeInTheDocument()

		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('02:30')
	})
})

describe('input mode', async () => {
	test('swaps the dial for two fields, and back again', async () => {
		await setup({ hour12: true })
		await openPicker()
		await expect.poll(() => !!dial()).toBe(true)

		await action('Switch to text input mode').click()
		await expect.poll(() => !!dial()).toBe(false)
		await expect.element(page.getByRole('textbox', { name: 'Hour' })).toBeInTheDocument()
		await expect.element(page.getByRole('textbox', { name: 'Minute' })).toBeInTheDocument()

		await action('Switch to dial mode').click()
		await expect.poll(() => !!dial()).toBe(true)
	})

	test('renames the headline, because the entry is typed rather than picked', async () => {
		await setup()
		await openPicker()
		await expect.element(page.getByText('Select time')).toBeInTheDocument()

		await action('Switch to text input mode').click()
		await expect.element(page.getByText('Enter time')).toBeInTheDocument()
	})

	test('is the 96 by 72 field of the spec', async () => {
		await setup({ mode: 'input', hour12: true })
		await openPicker()
		expect(box('.np-time-input')).toEqual({ width: 96, height: 72 })
	})

	test('widens the fields when there is no period selector beside them', async () => {
		await setup({ mode: 'input', hour12: false })
		await openPicker()
		expect(box('.np-time-input')).toEqual({ width: 114, height: 72 })
	})

	test('takes a typed hour and minute', async () => {
		await setup({ mode: 'input', hour12: false, value: '00:00' })
		await openPicker()

		await page.getByRole('textbox', { name: 'Hour' }).fill('18')
		await page.getByRole('textbox', { name: 'Minute' }).fill('45')
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('18:45')
	})

	test('holds an hour the clock cannot reach out of the value', async () => {
		await setup({ mode: 'input', hour12: false, value: '10:00' })
		await openPicker()

		const hour = page.getByRole('textbox', { name: 'Hour' })
		await hour.fill('99')
		await expect.element(hour).toHaveAttribute('aria-invalid', 'true')

		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('10:00')
	})

	test('moves on to the minute once the hour is whole', async () => {
		await setup({ mode: 'input', hour12: false, value: '00:00' })
		await openPicker()

		await page.getByRole('textbox', { name: 'Hour' }).fill('11')
		await expect.poll(() => document.activeElement?.getAttribute('aria-label')).toBe('Minute')
	})
})

describe('bounds', async () => {
	test('pulls a pick back inside the range rather than taking it', async () => {
		await setup({ hour12: false, min: '09:00', max: '17:00', value: '10:00' })
		await openPicker()

		tap(3 / 12, 0.454)
		await expect.element(selector('Hour, 09')).toBeInTheDocument()
	})

	test('takes a half of the day out of reach when no hour of it is left', async () => {
		await setup({ hour12: true, min: '13:00', max: '17:00', value: '14:00' })
		await openPicker()
		await expect.element(selector('AM')).toBeDisabled()
		await expect.element(selector('PM')).not.toBeDisabled()
	})

	test('refuses a time that isTimeEnabled turns down', async () => {
		await setup({
			hour12: false,
			value: '10:00',
			isTimeEnabled: (minutes: number) => minutes % 60 === 0,
		})
		await openPicker()
		await expect
			.element(page.getByRole('option', { name: '10 hours of 24', exact: true }))
			.not.toHaveAttribute('aria-disabled', 'true')
	})
})

describe('confirming', async () => {
	test('holds the value back until OK, and reports each change on the way', async () => {
		await setup({ hour12: true })
		await openPicker()

		tap(5 / 12)
		await expect.element(boundValue()).toHaveTextContent('14:30')
		await expect.element(page.getByTestId('changes')).not.toHaveTextContent('0')
		await expect.element(page.getByTestId('last-change')).toHaveTextContent('17:30')

		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('17:30')
		await expect.element(page.getByTestId('confirms')).toHaveTextContent('1')
	})

	test('leaves the value as it was on cancel', async () => {
		await setup({ hour12: true })
		await openPicker()

		tap(5 / 12)
		await action('Cancel').click()
		await expectClosed()
		await expect.element(boundValue()).toHaveTextContent('14:30')
		await expect.element(page.getByTestId('cancels')).toHaveTextContent('1')
	})

	test('reopens on the committed value rather than the one that was abandoned', async () => {
		await setup({ hour12: true })
		await openPicker()
		tap(5 / 12)
		await action('Cancel').click()
		await expectClosed()

		await openPicker()
		await expect.element(selector('Hour, 02')).toBeInTheDocument()
	})

	test('carries the value in a hidden input for a form to submit', async () => {
		await setup({ name: 'meeting' })
		const hidden = document.querySelector<HTMLInputElement>('input.np-time-picker-value')!
		expect(hidden.name).toBe('meeting')
		expect(hidden.value).toBe('14:30')
	})
})

describe('open and close', async () => {
	test('open is bindable in both directions', async () => {
		await setup()
		const state = page.getByTestId('bound-open')
		await expect.element(state).toHaveTextContent('false')

		await openPicker()
		await expect.element(state).toHaveTextContent('true')

		await userEvent.keyboard('{Escape}')
		await expectClosed()
		await expect.element(state).toHaveTextContent('false')
	})

	test('keeps the panel in place until the closing animation is over', async () => {
		await setup()
		await openPicker()
		const dialog = document.querySelector<HTMLDialogElement>('.np-time-picker-dialog')!

		await action('Cancel').click()
		await expectClosed()
		expect(dialog.getAnimations()).toHaveLength(0)
	})

	test('shows the issues it is handed', async () => {
		await setup({ issues: [{ message: 'Outside opening hours.' }] })
		await openPicker()
		await expect.element(page.getByRole('alert')).toHaveTextContent('Outside opening hours.')
	})
})
