import { expect, onTestFinished, test, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './DatePickerDialogHarness.test.svelte'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', ...props })

const grid = (name: string) => page.getByRole('grid', { name })
const action = (name: string) => page.getByRole('button', { name, exact: true })
const count = (selector: string) => document.querySelectorAll(selector).length

const clipsOfRing = (day: Element) => {
	const circle = day.querySelector('.np-calendar-day-container')!.getBoundingClientRect()
	const clips: string[] = []
	for (let box = day.parentElement; box && box !== document.body; box = box.parentElement) {
		const style = getComputedStyle(box)
		if (style.overflowX === 'visible' && style.overflowY === 'visible') continue
		const rect = box.getBoundingClientRect()
		const left = rect.left + box.clientLeft
		const top = rect.top + box.clientTop
		const room = Math.min(
			circle.left - left,
			left + box.clientWidth - circle.right,
			circle.top - top,
			top + box.clientHeight - circle.bottom,
		)
		if (room < 7.5) clips.push(box.className)
	}
	return clips
}

const openDialog = async () => {
	await action('Open the dialog').click()
	await expect.poll(() => count('.np-date-picker-dialog-content')).toBe(1)
}

test('reserves six week rows whatever the month needs and toggles to keyboard entry', async () => {
	await setup({ value: '2025-09-15', modeToggle: true })
	await openDialog()

	await expect.poll(() => count('.np-calendar tbody tr')).toBe(6)

	await action('Switch to text input mode').click()
	await expect.element(page.getByRole('textbox')).toHaveValue('09/15/2025')

	await action('Switch to calendar mode').click()
	await expect.element(grid('September 2025')).toBeVisible()
})

test('a switch of view morphs the height and opening in input mode does not', async () => {
	// The test browser runs with reduced motion, which skips the morph.
	const matchMedia = window.matchMedia.bind(window)
	vi.spyOn(window, 'matchMedia').mockImplementation((query) =>
		query.includes('reduce') ? { ...matchMedia(query), matches: false } : matchMedia(query),
	)
	onTestFinished(() => {
		vi.restoreAllMocks()
	})
	await setup({ value: '2025-09-15', mode: 'input' })
	await openDialog()
	const content = document.querySelector<HTMLElement>('.np-date-picker-dialog-content')!
	const heights = () =>
		content
			.getAnimations()
			.flatMap((animation) => (animation.effect as KeyframeEffect).getKeyframes())
			.map((frame) => frame.height)

	expect(document.querySelector('.np-date-picker-dialog-input.to-input')).toBeNull()
	expect(heights()).toEqual([])

	await action('Switch to calendar mode').click()

	const [from, to] = heights().map((height) => Number.parseFloat(String(height)))
	expect(to).toBeGreaterThan(from)
})

test('the content outlives the close instead of emptying the dialog before it fades', async () => {
	await setup({ value: '2025-08-17' })
	await openDialog()
	const dialog = document.querySelector<HTMLDialogElement>('dialog.np-date-picker-dialog')!

	await action('Cancel').click()
	await expect.poll(() => count('.np-date-picker-dialog-content')).toBe(0)

	expect(dialog.open).toBe(false)
	expect(dialog.getAnimations()).toHaveLength(0)
})

test('moves focus into the grid on open', async () => {
	await setup({ value: '2025-08-17' })
	await openDialog()

	await expect.element(action('Sunday, August 17, 2025, selected')).toHaveFocus()

	await userEvent.keyboard('{ArrowRight}')
	await expect
		.poll(() => document.querySelector('.np-calendar-day:focus')?.getAttribute('aria-label'))
		.toBe('Monday, August 18, 2025')
})

test('mirrors the left and right arrows right to left', async () => {
	document.documentElement.dir = 'rtl'
	try {
		await setup({ value: '2025-08-17' })
		await openDialog()
		await expect.element(action('Sunday, August 17, 2025, selected')).toHaveFocus()

		await userEvent.keyboard('{ArrowLeft}')
		await expect
			.poll(() => document.querySelector('.np-calendar-day:focus')?.getAttribute('aria-label'))
			.toBe('Monday, August 18, 2025')
	} finally {
		document.documentElement.dir = ''
	}
})

test('the year grid replaces the calendar and returns to it', async () => {
	await setup({ value: '2025-08-17' })
	await openDialog()

	await page.getByRole('button', { name: /^Select year/ }).click()
	await expect.element(page.getByRole('listbox', { name: 'Select year' })).toBeVisible()
	expect(count('.np-calendar')).toBe(0)

	await page.getByRole('option', { name: '2027', exact: true }).click()
	await expect.element(grid('August 2027')).toBeVisible()
	await expect.element(page.getByRole('button', { name: 'Select year, August 2027' })).toBeVisible()
})

test('confirm commits the pending day and cancel leaves the value alone', async () => {
	await setup({ value: '2025-08-17' })
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

test('offers the edit icon by default and opens in the view it is given', async () => {
	await setup({ value: '2025-09-15', mode: 'input' })
	await openDialog()

	await expect.element(page.getByRole('textbox')).toHaveValue('09/15/2025')
	await expect.element(page.getByRole('textbox')).toHaveFocus()
	await expect.element(action('Switch to calendar mode')).toBeVisible()
})

test('Enter on a day saves it and closes', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()

	await userEvent.keyboard('{ArrowRight}')
	await userEvent.keyboard('{Enter}')

	await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2025-09-16')
	await expect.poll(() => count('.np-date-picker-dialog-content')).toBe(0)
})

test('Shift+Y opens the year grid on the year shown', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()

	await userEvent.keyboard('{Shift>}Y{/Shift}')

	await expect
		.poll(() => document.activeElement?.closest('.np-date-picker-year')?.textContent?.trim())
		.toBe('2025')
})

test('takes Shift+Y and the page keys from its header and actions too', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()
	await expect.element(action('Monday, September 15, 2025, selected')).toHaveFocus()
	const arrow = action('Next month').element()
	arrow.focus()

	await userEvent.keyboard('{PageDown}')
	await expect.element(grid('October 2025')).toBeVisible()
	await userEvent.keyboard('{Shift>}{PageDown}{/Shift}')
	await expect.element(grid('October 2026')).toBeVisible()
	expect(document.activeElement).toBe(arrow)

	action('Cancel').element().focus()
	await userEvent.keyboard('{Shift>}Y{/Shift}')
	await expect
		.poll(() => document.activeElement?.closest('.np-date-picker-year')?.textContent?.trim())
		.toBe('2026')
})

test('leaves the years by Shift+Y, Escape or a picked year, with focus on the day', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()
	const day = action('Monday, September 15, 2025, selected')
	await expect.element(day).toHaveFocus()
	const years = () => count('.np-date-picker-year')

	await userEvent.keyboard('{Shift>}Y{/Shift}')
	await expect.poll(years).toBeGreaterThan(0)
	await userEvent.keyboard('{Shift>}Y{/Shift}')
	await expect.poll(years).toBe(0)
	await expect.element(day).toHaveFocus()

	await userEvent.keyboard('{Shift>}Y{/Shift}')
	await expect.poll(years).toBeGreaterThan(0)
	await userEvent.keyboard('{Escape}')
	await expect.poll(years).toBe(0)
	await expect.element(day).toHaveFocus()
	expect(count('.np-date-picker-dialog-content')).toBe(1)

	await userEvent.keyboard('{Shift>}Y{/Shift}')
	await expect.poll(years).toBeGreaterThan(0)
	await userEvent.keyboard('{ArrowRight}')
	await userEvent.keyboard('{Enter}')
	await expect.element(grid('September 2026')).toBeVisible()
	await expect.poll(() => document.activeElement?.classList.contains('np-calendar-day')).toBe(true)

	await userEvent.keyboard('{Escape}')
	await expect.poll(() => count('.np-date-picker-dialog-content')).toBe(0)
})

test('keeps its keys after a click on a bare part of it', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()
	await expect.element(action('Monday, September 15, 2025, selected')).toHaveFocus()

	await userEvent.click(document.querySelector<HTMLElement>('.np-date-picker-dialog-title')!)
	await userEvent.keyboard('{PageDown}')
	await expect.element(grid('October 2025')).toBeVisible()
	await userEvent.keyboard('{Shift>}Y{/Shift}')

	await expect
		.poll(() => document.activeElement?.closest('.np-date-picker-year')?.textContent?.trim())
		.toBe('2025')
})

test('reopened while it fades out, it starts over on the days of its month', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()
	await expect.element(action('Monday, September 15, 2025, selected')).toHaveFocus()
	await userEvent.keyboard('{PageDown}')
	await expect.element(grid('October 2025')).toBeVisible()

	const opener = action('Open the dialog').element() as HTMLElement
	const cancel = action('Cancel').element() as HTMLElement
	document
		.querySelector('dialog.np-date-picker-dialog')!
		.addEventListener('toggle', () => setTimeout(() => opener.click()), { once: true })
	cancel.click()

	await expect.element(grid('September 2025')).toBeVisible()
	await expect.element(action('Monday, September 15, 2025, selected')).toHaveFocus()
})

test('leaves Shift+Y to a typed date', async () => {
	await setup({ value: '2025-09-15', mode: 'input' })
	await openDialog()
	const textbox = page.getByRole('textbox')
	await expect.element(textbox).toHaveFocus()

	await userEvent.keyboard('{Shift>}Y{/Shift}')

	await expect.poll(() => (textbox.element() as HTMLInputElement).value).toContain('Y')
	expect(count('.np-date-picker-year')).toBe(0)
})

test('names the keys of its month arrows and year menu in their tooltips', async () => {
	await setup({ value: '2025-09-15', shortcutLabels: { previousMonth: 'Bild ↑' } })
	await openDialog()

	const description = (name: string) => {
		const ids = action(name).element().getAttribute('aria-describedby') ?? ''
		return document.getElementById(ids)?.textContent?.trim()
	}
	expect(description('Previous month')).toBe('Previous month (Bild ↑)')
	expect(description('Next month')).toBe('Next month (Page down)')
	const year = page.getByRole('button', { name: /^Select year/ }).element()
	expect(document.getElementById(year.getAttribute('aria-describedby')!)?.textContent?.trim()).toBe(
		'Select year (Shift+Y)',
	)
})

test('leaves the focus ring of the days at its edges whole', async () => {
	await setup({ value: '2025-08-17' })
	await openDialog()

	for (const name of ['Sunday, August 3', 'Saturday, August 9', 'Sunday, August 31']) {
		const day = document.querySelector(`.np-calendar-day[aria-label^="${name}"]`)!
		expect(clipsOfRing(day), name).toEqual([])
	}
})

test('heads with the weekday, month and day, as M3 shows it', async () => {
	await setup({ value: '2025-08-17' })
	await openDialog()

	await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('Sun, Aug 17')
})

test('casts no shadow, as M3 date pickers do not', async () => {
	await setup({ value: '2025-09-15' })
	await openDialog()

	expect(
		getComputedStyle(document.querySelector('.np-date-picker-dialog .np-dialog')!).boxShadow,
	).toBe('none')
})
