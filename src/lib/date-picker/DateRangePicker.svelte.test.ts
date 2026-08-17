import { expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './DateRangePickerHarness.test.svelte'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', ...props })

const action = (name: string) => page.getByRole('button', { name, exact: true })
const count = (selector: string) => document.querySelectorAll(selector).length

const openRange = async () => {
	await action('Open the range picker').click()
	await expect.poll(() => count('.np-calendar')).toBeGreaterThan(0)
}

test('fills the days between the two ends', async () => {
	// A one month window, so the days that are clicked never depend on the day the test runs.
	setup({ min: '2025-08-01', max: '2025-08-31' })
	await openRange()

	await action('Tuesday, August 5, 2025').click()
	await action('Wednesday, August 13, 2025').click()

	expect(count('.np-calendar-cell.in-range')).toBe(7)
	expect(count('.np-calendar-cell.range-start')).toBe(1)
	expect(count('.np-calendar-cell.range-end')).toBe(1)

	await action('Save').click()
	await expect
		.element(page.getByTestId('bound-value'))
		.toHaveTextContent('2025-08-05 to 2025-08-13')
})

test('shares one tab stop and carries focus from one month into the next', async () => {
	setup({ value: { start: '2025-08-17' } })
	await openRange()

	// One tab stop for the whole list. Asserting which day it is rules out passing against a month
	// list that has not been anchored yet.
	await expect.poll(() => count('.np-calendar-day[tabindex="0"]')).toBe(1)
	const stop = document.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')!
	expect(stop.getAttribute('aria-label')).toBe('Sunday, August 17, 2025, selected')

	stop.focus()
	await userEvent.keyboard('{PageDown}')
	await expect
		.poll(() => document.querySelector('.np-calendar-day:focus')?.getAttribute('aria-label'))
		.toBe('Wednesday, September 17, 2025')
})

test('opens on the current month', async () => {
	setup()
	await openRange()

	const thisMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
	await expect.element(page.getByRole('grid', { name: thisMonth })).toBeInViewport()
})
