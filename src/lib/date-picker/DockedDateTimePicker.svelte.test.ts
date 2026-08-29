import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Form from './DockedDateTimePickerForm.test.svelte'
import Harness from './DockedDateTimePickerHarness.test.svelte'
import Layout from './DockedDateTimePickerLayout.test.svelte'

const VALUE = '2025-08-17T14:30'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', value: VALUE, ...props })

const field = () => page.getByRole('textbox')
const input = () => field().element() as HTMLInputElement
const boundValue = () => page.getByTestId('bound-value')
const action = (name: string) => page.getByRole('button', { name, exact: true })
const column = (name: string) => page.getByRole('listbox', { name })
const option = (name: string, columnName: string) =>
	column(columnName).getByRole('option', { name, exact: true })
const container = () => document.querySelector<HTMLElement>('.np-docked-date-time-picker-container')

const openPicker = async () => {
	await page.getByRole('button', { name: 'Show date and time picker' }).click()
	await expect.poll(() => !!container()).toBe(true)
}

const expectClosed = () => expect.poll(() => !!container()).toBe(false)

const height = () => Math.round(container()!.getBoundingClientRect().height)

const heightsWhile = async (swap: () => Promise<void>) => {
	const seen: number[] = []
	let frame: number
	const sample = () => {
		if (!container()) return
		seen.push(height())
		frame = requestAnimationFrame(sample)
	}
	frame = requestAnimationFrame(sample)
	await swap()
	await new Promise((resolve) => setTimeout(resolve, 500))
	cancelAnimationFrame(frame)
	return [Math.min(...seen), Math.max(...seen)]
}

describe('text field', async () => {
	test('shows the value as a date and a time of the locale', async () => {
		await setup()
		await expect.element(field()).toHaveValue('08/17/2025, 02:30 PM')
		await expect.element(page.getByText('MM/DD/YYYY, hh:mm AM/PM')).toBeInTheDocument()
	})

	test('commits a loosely typed entry and normalises it on blur', async () => {
		await setup({ value: undefined })
		await field().fill('8/1/2025 2:05 pm')
		await expect.element(boundValue()).toHaveTextContent('2025-08-01T14:05')

		input().blur()
		await expect.element(field()).toHaveValue('08/01/2025, 02:05 PM')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
	})

	test('holds the value back until the time is there too', async () => {
		await setup({ value: undefined })
		await field().fill('08/17/2025')
		await expect.element(boundValue()).toHaveTextContent('undefined')

		await field().fill('08/17/2025, 02:30 PM')
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T14:30')
	})

	test('keeps text that is not a real moment and flags it on blur', async () => {
		await setup()
		await field().fill('08/17/2025, 25:99 PM')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')

		input().blur()
		await expect.element(field()).toHaveValue('08/17/2025, 25:99 PM')
		await expect.element(field()).toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('undefined')
	})

	test('rejects a moment outside min and max', async () => {
		await setup({ value: undefined, min: '2025-08-17T09:00', max: '2025-08-17T17:00' })

		await field().fill('08/17/2025, 08:30 AM')
		input().blur()
		await expect.element(field()).toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('undefined')

		await field().fill('08/17/2025, 09:30 AM')
		input().blur()
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T09:30')
	})
})

describe('time columns', async () => {
	test('opens on the time of the value', async () => {
		await setup()
		await openPicker()

		await expect.element(option('02', 'Hour')).toHaveAttribute('aria-selected', 'true')
		await expect.element(option('30', 'Minute')).toHaveAttribute('aria-selected', 'true')
		await expect.element(option('PM', 'AM or PM')).toHaveAttribute('aria-selected', 'true')
	})

	test('commits the day and the time together on OK', async () => {
		await setup()
		await openPicker()

		await action('Friday, August 8, 2025').click()
		await option('09', 'Hour').click()
		await option('45', 'Minute').click()
		await option('AM', 'AM or PM').click()
		await expect.element(boundValue()).toHaveTextContent(VALUE)

		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-08T09:45')
		await expect.element(field()).toHaveValue('08/08/2025, 09:45 AM')
	})

	test('leaves the value alone on Cancel', async () => {
		await setup()
		await openPicker()

		await option('45', 'Minute').click()
		await action('Cancel').click()
		await expectClosed()
		await expect.element(boundValue()).toHaveTextContent(VALUE)
	})

	test('keeps the minute while the hour and the half day move', async () => {
		await setup()
		await openPicker()

		await option('11', 'Hour').click()
		await option('AM', 'AM or PM').click()
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T11:30')
	})

	test('reads midnight as the twelfth hour of AM', async () => {
		await setup()
		await openPicker()

		await option('12', 'Hour').click()
		await option('00', 'Minute').click()
		await option('AM', 'AM or PM').click()
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T00:00')
	})

	test('steps the minutes as asked', async () => {
		await setup({ minuteStep: 15 })
		await openPicker()

		await expect.poll(() => column('Minute').getByRole('option').all().length).toBe(4)
		await option('45', 'Minute').click()
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T14:45')
	})

	test('moves between the values of a column with the arrow keys', async () => {
		await setup()
		await openPicker()

		await option('30', 'Minute').click()
		await userEvent.keyboard('{ArrowDown}')
		await userEvent.keyboard('{Enter}')
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T14:35')
	})

	test('drops the day period column on a 24 hour locale', async () => {
		await setup({ locale: 'de-DE' })
		await expect.element(field()).toHaveValue('17.08.2025, 14:30')
		await openPicker()

		await expect.poll(() => column('Hour').getByRole('option').all().length).toBe(24)
		await expect.poll(() => document.querySelectorAll('.np-time-column').length).toBe(2)
		await option('23', 'Hour').click()
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T23:30')
	})
})

describe('bounds', async () => {
	test('offers only the hours a boundary day still has', async () => {
		await setup({ locale: 'de-DE', value: '2025-08-17T12:00', min: '2025-08-17T09:00' })
		await openPicker()

		await expect.element(option('08', 'Hour')).toHaveAttribute('aria-disabled', 'true')
		await expect.element(option('09', 'Hour')).not.toHaveAttribute('aria-disabled', 'true')
	})

	test('pulls the time up to the first minute a newly picked day allows', async () => {
		await setup({ locale: 'de-DE', value: '2025-08-18T08:00', min: '2025-08-17T09:30' })
		await openPicker()

		await action('Sonntag, 17. August 2025').click()
		await action('OK').click()
		await expect.element(boundValue()).toHaveTextContent('2025-08-17T09:30')
	})

	test('leaves the hours of a day inside the range alone', async () => {
		await setup({ locale: 'de-DE', value: '2025-08-18T08:00', min: '2025-08-17T09:30' })
		await openPicker()

		await expect.element(option('00', 'Hour')).not.toHaveAttribute('aria-disabled', 'true')
	})
})

describe('month and year menus', async () => {
	test('the calendar under the list is out of reach', async () => {
		await setup()
		await openPicker()
		await page.getByRole('button', { name: /^Select month/ }).click()

		const stops: string[] = []
		for (let i = 0; i < 3; i += 1) {
			await userEvent.tab()
			stops.push((document.activeElement as HTMLElement).className)
		}

		expect(stops.some((stop) => stop.includes('np-calendar-day'))).toBe(false)
		expect(stops[0]).toContain('np-date-picker-selection-option')
	})

	test('the panel keeps its height through every view, so the time columns hold still', async () => {
		await setup()
		await openPicker()
		const days = height()
		const months = () => page.getByRole('button', { name: /^Select month/ }).click()
		const years = () => page.getByRole('button', { name: /^Select year/ }).click()

		expect(await heightsWhile(months)).toEqual([days, days])
		expect(await heightsWhile(months)).toEqual([days, days])
		expect(await heightsWhile(years)).toEqual([days, days])
		expect(await heightsWhile(years)).toEqual([days, days])
	})
})

describe('placement', async () => {
	test('shows the whole panel over a field in the middle of the window', async () => {
		await setup({ style: 'margin-top:400px' })
		await openPicker()

		const menu = document.querySelector<HTMLElement>('.np-docked-date-time-picker-menu')!
		const panel = menu.getBoundingClientRect()
		const anchor = document
			.querySelector<HTMLElement>('.np-docked-date-time-picker')!
			.getBoundingClientRect()

		expect(panel.top).toBeLessThan(anchor.top)
		expect(panel.bottom).toBeGreaterThan(anchor.bottom)
		expect(menu.scrollHeight).toBeLessThanOrEqual(menu.clientHeight)
	})
})

describe('form', async () => {
	test('submits the moment through a hidden input', async () => {
		await render(Form, { locale: 'en-US', value: VALUE })
		await page.getByRole('button', { name: 'Submit' }).click()
		await expect
			.element(page.getByTestId('submitted'))
			.toHaveTextContent('Submitted startsAt=2025-08-17T14:30')
	})
})

describe('layout', async () => {
	test('fills a stretching flex column like a plain text field', async () => {
		await render(Layout)

		const widths = [...document.querySelectorAll<HTMLElement>('.np-text-field')].map((field) =>
			Math.round(field.getBoundingClientRect().width),
		)

		expect(widths).toEqual([480, 480])
	})
})
