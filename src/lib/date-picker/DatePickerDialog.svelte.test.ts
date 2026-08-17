import { expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './DatePickerDialogHarness.test.svelte'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', ...props })

const grid = (name: string) => page.getByRole('grid', { name })
const action = (name: string) => page.getByRole('button', { name, exact: true })
const count = (selector: string) => document.querySelectorAll(selector).length

const openDialog = async () => {
	await action('Open the dialog').click()
	await expect.poll(() => count('.np-date-picker-dialog-content')).toBe(1)
}

test('reserves six week rows whatever the month needs and toggles to keyboard entry', async () => {
	// September 2025 fits in five rows, so a six row grid can only come from the reserved height.
	setup({ value: '2025-09-15', modeToggle: true })
	await openDialog()

	await expect.poll(() => count('.np-calendar tbody tr')).toBe(6)

	await action('Switch to text input mode').click()
	await expect.element(page.getByRole('textbox')).toHaveValue('09/15/2025')

	await action('Switch to calendar mode').click()
	await expect.element(grid('September 2025')).toBeVisible()
})

test('moves focus into the grid on open', async () => {
	setup({ value: '2025-08-17' })
	await openDialog()

	await expect.element(action('Sunday, August 17, 2025, selected')).toHaveFocus()

	await userEvent.keyboard('{ArrowRight}')
	await expect
		.poll(() => document.querySelector('.np-calendar-day:focus')?.getAttribute('aria-label'))
		.toBe('Monday, August 18, 2025')
})

test('the year grid replaces the calendar and returns to it', async () => {
	setup({ value: '2025-08-17' })
	await openDialog()

	await page.getByRole('button', { name: /^Select year/ }).click()
	await expect.element(page.getByRole('listbox', { name: 'Select year' })).toBeVisible()
	expect(count('.np-calendar')).toBe(0)

	await page.getByRole('option', { name: '2027', exact: true }).click()
	await expect.element(grid('August 2027')).toBeVisible()
	await expect.element(page.getByRole('button', { name: 'Select year, August 2027' })).toBeVisible()
})

test('confirm commits the pending day and cancel leaves the value alone', async () => {
	setup({ value: '2025-08-17' })
	await openDialog()

	await action('Friday, August 8, 2025').click()
	await action('Cancel').click()
	await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2025-08-17')

	await openDialog()
	await action('Friday, August 8, 2025').click()
	await action('OK').click()
	await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2025-08-08')
	await expect.element(page.getByTestId('bound-open')).toHaveTextContent('false')
})
