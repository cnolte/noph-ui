import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Form from './DockedTimePickerForm.test.svelte'
import Harness from './DockedTimePickerHarness.test.svelte'

const VALUE = '14:30'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', value: VALUE, ...props })

const field = () => page.getByRole('textbox', { name: 'Time' })
const input = () => field().element() as HTMLInputElement
const boundValue = () => page.getByTestId('bound-value')
const action = (name: string) => page.getByRole('button', { name, exact: true })
const container = () => document.querySelector<HTMLElement>('.np-docked-time-picker-container')

const openPicker = async () => {
	await action('Show time picker').click()
	await expect.poll(() => !!container()).toBe(true)
}

const expectClosed = () => expect.poll(() => !!container()).toBe(false)

describe('text field', async () => {
	test('shows the value as a time of the locale, with the pattern as a hint', async () => {
		await setup()
		await expect.element(field()).toHaveValue('02:30 PM')
		await expect.element(page.getByText('hh:mm AM/PM')).toBeInTheDocument()
	})

	test('reads a 24 hour locale the way that locale writes it', async () => {
		await setup({ locale: 'de-DE' })
		await expect.element(page.getByRole('textbox', { name: 'Time' })).toHaveValue('14:30')
		await expect.element(page.getByText('HH:mm')).toBeInTheDocument()
	})

	test('commits a loosely typed entry and tidies it up on blur', async () => {
		await setup({ value: undefined })
		await field().fill('2:05 pm')
		await expect.element(boundValue()).toHaveTextContent('14:05')

		input().blur()
		await expect.element(field()).toHaveValue('02:05 PM')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
	})

	test('waits for the day period rather than guessing a half of the day', async () => {
		await setup({ value: undefined })
		await field().fill('02:30')
		await expect.element(boundValue()).toHaveTextContent('undefined')

		await field().fill('02:30 PM')
		await expect.element(boundValue()).toHaveTextContent('14:30')
	})

	test('keeps unusable text on screen and only calls it out once the field is left', async () => {
		await setup({ value: undefined })
		await field().fill('99:99')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')

		input().blur()
		await expect.element(field()).toHaveValue('99:99')
		await expect.element(field()).toHaveAttribute('aria-invalid', 'true')
	})

	test('tells the form why the entry cannot be used', async () => {
		await setup({ value: undefined, invalidTimeMessage: 'That is not a time.' })
		await field().fill('half past two')
		await expect.poll(() => input().validationMessage).toBe('That is not a time.')

		await field().fill('02:30 PM')
		await expect.poll(() => input().validationMessage).toBe('')
	})

	test('turns down a time outside the range', async () => {
		await setup({ value: undefined, min: '09:00', max: '17:00' })
		await field().fill('08:00 PM')
		await expect.element(boundValue()).toHaveTextContent('undefined')

		await field().fill('10:00 AM')
		await expect.element(boundValue()).toHaveTextContent('10:00')
	})
})

describe('picker', async () => {
	test('opens under the field, anchored to it', async () => {
		await setup()
		await openPicker()
		const anchor = input().closest('.np-text-field')!.getBoundingClientRect()
		const menu = container()!.getBoundingClientRect()
		expect(menu.top).toBeGreaterThanOrEqual(Math.floor(anchor.top))
	})

	test('fits its panel, so nothing scrolls', async () => {
		await setup()
		await openPicker()
		for (const selector of ['.np-menu', '.np-docked-time-picker-container', '.np-clock-dial']) {
			const node = document.querySelector<HTMLElement>(selector)!
			expect(node.scrollWidth, selector).toBe(node.clientWidth)
			expect(node.scrollHeight, selector).toBe(node.clientHeight)
		}
	})

	test('opens on the value already in the field', async () => {
		await setup()
		await openPicker()
		await expect.element(page.getByRole('radio', { name: 'Hour, 02' })).toBeInTheDocument()
		await expect.element(page.getByRole('radio', { name: 'Minute, 30' })).toBeInTheDocument()
	})

	test('commits what was picked on OK', async () => {
		await setup()
		await openPicker()

		const five = page.getByRole('option', { name: '5 hours of 12', exact: true }).element()
		;(five as HTMLElement).focus()
		;(five as HTMLElement).click()

		await action('OK').click()
		await expectClosed()
		await expect.element(boundValue()).toHaveTextContent('17:30')
		await expect.element(field()).toHaveValue('05:30 PM')
	})

	test('leaves the value as it was on cancel', async () => {
		await setup()
		await openPicker()

		const five = page.getByRole('option', { name: '5 hours of 12', exact: true }).element()
		;(five as HTMLElement).focus()
		;(five as HTMLElement).click()

		await action('Cancel').click()
		await expectClosed()
		await expect.element(boundValue()).toHaveTextContent('14:30')
	})

	test('hands focus to the dial on open and back to the field on close', async () => {
		await setup()
		await openPicker()
		await expect
			.poll(() => document.activeElement?.classList.contains('np-clock-dial-option'))
			.toBe(true)

		await action('Cancel').click()
		await expectClosed()
		await expect.poll(() => document.activeElement).toBe(input())
	})

	test('swaps the dial for typed fields and back', async () => {
		await setup()
		await openPicker()
		await action('Switch to text input mode').click()
		await expect.element(page.getByRole('textbox', { name: 'Hour' })).toBeInTheDocument()

		await action('Switch to dial mode').click()
		await expect.poll(() => !!document.querySelector('.np-clock-dial')).toBe(true)
	})

	test('open is bindable in both directions', async () => {
		await setup()
		const state = page.getByTestId('bound-open')
		await expect.element(state).toHaveTextContent('false')

		await action('Open the picker').click()
		await expect.poll(() => !!container()).toBe(true)
		await expect.element(state).toHaveTextContent('true')

		await userEvent.keyboard('{Escape}')
		await expectClosed()
		await expect.element(state).toHaveTextContent('false')
	})

	test('stays shut while it is read only', async () => {
		await setup({ readonly: true })
		await action('Show time picker').click()
		await expectClosed()
	})
})

describe('forms', async () => {
	test('submits the value as an ISO time', async () => {
		render(Form, { locale: 'en-US', value: VALUE })
		await page.getByRole('button', { name: 'Submit' }).click()
		await expect
			.element(page.getByTestId('submitted'))
			.toHaveTextContent('Submitted pickupTime=14:30')
	})

	test('reports the issue it is handed when there is nothing to submit', async () => {
		render(Form, { locale: 'en-US', value: undefined })
		await page.getByRole('button', { name: 'Submit' }).click()
		await expect.element(page.getByRole('alert')).toHaveTextContent('Pick a pickup time.')
	})

	test('a form reset goes back to the default value', async () => {
		render(Form, { locale: 'en-US', value: '18:45', defaultValue: '09:00' })
		await expect.element(page.getByRole('textbox', { name: 'Time' })).toHaveValue('06:45 PM')

		await page.getByRole('button', { name: 'Reset' }).click()
		await expect.element(page.getByRole('textbox', { name: 'Time' })).toHaveValue('09:00 AM')
	})
})
