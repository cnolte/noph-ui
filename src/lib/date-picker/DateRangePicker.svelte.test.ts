import { expect, onTestFinished, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './DateRangePickerHarness.test.svelte'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', ...props })

const action = (name: string) => page.getByRole('button', { name, exact: true })
const count = (selector: string) => document.querySelectorAll(selector).length
const style = (selector: string) => getComputedStyle(document.querySelector<HTMLElement>(selector)!)
const dialogBox = () =>
	document.querySelector<HTMLElement>('.np-date-range-picker .np-dialog')!.getBoundingClientRect()

const compactWindow = async () => {
	const { innerWidth, innerHeight } = window
	await page.viewport(400, 800)
	onTestFinished(() => page.viewport(innerWidth, innerHeight))
}

const openRange = async () => {
	await action('Open the range picker').click()
	await expect.poll(() => count('.np-calendar')).toBeGreaterThan(0)
}

test('fills the days between the two ends', async () => {
	await setup({ min: '2025-08-01', max: '2025-08-31' })
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

test('holds the content through the fade and keeps the form value behind it', async () => {
	await setup({ value: { start: '2025-08-05' } })
	await openRange()
	const dialog = document.querySelector<HTMLDialogElement>('dialog.np-date-range-picker')!

	await action('Save').click()
	await expect.poll(() => count('.np-date-range-picker-content')).toBe(0)
	expect(dialog.getAnimations()).toHaveLength(0)

	// The hidden inputs are what a form reads, so they outlast the calendar entirely.
	const values = [...document.querySelectorAll<HTMLInputElement>('.np-date-range-picker-value')]
	expect(values.map((input) => input.value)).toEqual(['2025-08-05', ''])
})

test('shares one tab stop and carries focus from one month into the next', async () => {
	await setup({ value: { start: '2025-08-17' } })
	await openRange()

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
	await setup()
	await openRange()

	const thisMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
	await expect.element(page.getByRole('grid', { name: thisMonth })).toBeInViewport()
})

test('is an ordinary modal on a wide window', async () => {
	await setup({ value: { start: '2025-08-17' } })
	await openRange()

	// The dialog is the calendar column and nothing more, and it stops short of the window on both
	// axes. Measured against the content rather than 360px, so a width regression fails here for the
	// right reason instead of as a bare number.
	const box = dialogBox()
	const content = document.querySelector<HTMLElement>('.np-date-range-picker-content')!
	expect(box.width).toBe(content.getBoundingClientRect().width)
	expect(box.width).toBeLessThan(document.documentElement.clientWidth / 2)
	expect(box.height).toBeLessThan(document.documentElement.clientHeight)
	expect(style('.np-date-range-picker .np-dialog').borderTopLeftRadius).not.toBe('0px')

	const months = document.querySelector<HTMLElement>('.np-date-range-picker-months')!
	expect(months.scrollHeight).toBeGreaterThan(months.clientHeight)

	expect(style('.np-date-range-picker-top-bar').display).toBe('none')
	await action('Save').click()
	await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2025-08-17 to undefined')
})

test('is full screen on a compact window', async () => {
	await compactWindow()
	await setup({ value: { start: '2025-08-17' } })
	await openRange()

	const box = dialogBox()
	expect(box.width).toBe(document.documentElement.clientWidth)
	expect(box.height).toBe(document.documentElement.clientHeight)
	expect(style('.np-date-range-picker .np-dialog').borderTopLeftRadius).toBe('0px')

	expect(style('.np-date-range-picker-top-bar').display).not.toBe('none')
	expect(style('.np-date-range-picker .np-dialog-actions').display).toBe('none')
	await action('Save').click()
	await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2025-08-17 to undefined')
})
