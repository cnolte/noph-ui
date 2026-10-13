import { describe, expect, onTestFinished, test } from 'vitest'
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

test('heads the range with month and day on one line, as M3 shows it', async () => {
	await setup({ value: { start: '2025-08-17', end: '2025-08-23' } })
	await openRange()

	const headline = document.querySelector<HTMLElement>('.np-date-range-picker-headline')!
	expect(headline.textContent?.replace(/\s+/g, ' ').trim()).toBe('Aug 17 – Aug 23')
	expect(headline.getClientRects()[0].height).toBeLessThanOrEqual(
		parseFloat(getComputedStyle(headline).lineHeight),
	)
})

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

test('keeps the month in view when earlier months load above it', async () => {
	await setup({ value: { start: '2025-08-10' } })
	await openRange()
	const scroller = document.querySelector<HTMLElement>('.np-date-range-picker-months')!
	const firstVisible = () => {
		const top = scroller.getBoundingClientRect().top
		const month = [...scroller.querySelectorAll<HTMLElement>('[data-month]')].find(
			(month) => month.getBoundingClientRect().bottom > top + 1,
		)!
		return {
			month: month.dataset.month,
			offset: Math.round(month.getBoundingClientRect().top - top),
		}
	}
	const loaded = () => count('[data-month]')
	await expect.poll(() => scroller.scrollTop).toBeGreaterThan(0)
	await new Promise((resolve) => requestAnimationFrame(resolve))

	scroller.scrollTop = 200
	const before = firstVisible()
	const months = loaded()
	await expect.poll(loaded).toBeGreaterThan(months)
	await new Promise((resolve) => requestAnimationFrame(resolve))

	expect(firstVisible()).toEqual(before)
})

describe('input mode', () => {
	const field = (name: string) => page.getByRole('textbox', { name, exact: true })

	test('switches to two fields from the edit icon and saves what is typed', async () => {
		await setup({ min: '2025-01-01', max: '2025-12-31' })
		await action('Open the range picker').click()
		await action('Switch to text input mode').click()

		await field('Start date').fill('08/05/2025')
		await field('End date').fill('08/13/2025')
		await action('Save').click()

		await expect
			.element(page.getByTestId('bound-value'))
			.toHaveTextContent('2025-08-05 to 2025-08-13')
	})

	test('opens in the input mode and goes back to the calendar', async () => {
		await setup({ mode: 'input', value: { start: '2025-08-05', end: '2025-08-13' } })
		await action('Open the range picker').click()

		await expect.element(field('Start date')).toHaveValue('08/05/2025')
		await expect.element(field('End date')).toHaveValue('08/13/2025')
		expect(count('.np-calendar')).toBe(0)

		await action('Switch to calendar mode').click()
		await expect.poll(() => count('.np-calendar')).toBeGreaterThan(0)
	})

	test('marks an end before the start once it is left', async () => {
		await setup()
		await action('Open the range picker').click()
		await action('Switch to text input mode').click()

		await field('Start date').fill('08/13/2025')
		await field('End date').fill('08/05/2025')
		await userEvent.keyboard('{Enter}')

		await expect.element(field('End date')).toHaveAttribute('aria-invalid', 'true')
		await expect
			.element(page.getByTestId('bound-value'))
			.toHaveTextContent('undefined to undefined')
	})
})
