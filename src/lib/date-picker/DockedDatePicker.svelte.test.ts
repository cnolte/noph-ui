import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Form from './DockedDatePickerForm.test.svelte'
import Harness from './DockedDatePickerHarness.test.svelte'
import Layout from './DockedDatePickerLayout.test.svelte'

const VALUE = '2025-08-17'

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', value: VALUE, ...props })

const setupForm = (props: Record<string, unknown> = {}) =>
	render(Form, { locale: 'en-US', ...props })

const field = () => page.getByRole('textbox')
const input = () => field().element() as HTMLInputElement
const boundValue = () => page.getByTestId('bound-value')
const grid = (name: string) => page.getByRole('grid', { name })
const action = (name: string) => page.getByRole('button', { name, exact: true })
const container = () => document.querySelector<HTMLElement>('.np-docked-date-picker-container')
const count = (selector: string) => document.querySelectorAll(selector).length

const openCalendar = async () => {
	await page.getByRole('button', { name: 'Show date picker' }).click()
	await expect.poll(() => !!container()).toBe(true)
}

const expectClosed = () => expect.poll(() => !!container()).toBe(false)

// The boxes that clip a day, by class, where they cut into its focus ring. The ring reaches 8px past
// the day's circle at the peak of its pulse.
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

// Opening moves focus to the day once the menu shows, so a test that moves it on waits for that.
const dayFocused = () =>
	expect.poll(() => document.activeElement?.classList.contains('np-calendar-day')).toBe(true)

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
	test('stays editable while a date is being typed', async () => {
		await setup()
		await expect.element(field()).toHaveValue('08/17/2025')

		await field().click()
		await expect.element(field()).toHaveFocus()
		await userEvent.keyboard('{End}')
		await userEvent.keyboard('{Backspace}')
		await expect.element(field()).toHaveValue('08/17/202')

		await userEvent.keyboard('{Backspace}')
		await expect.element(field()).toHaveValue('08/17/20')

		await userEvent.keyboard('25')
		await expect.element(field()).toHaveValue('08/17/2025')
		await expect.element(boundValue()).toHaveTextContent('2025-08-17')
	})

	test('commits a loosely typed date and normalises it on blur', async () => {
		await setup({ value: undefined })
		await field().fill('8/1/2025')
		await expect.element(boundValue()).toHaveTextContent('2025-08-01')

		input().blur()
		await expect.element(field()).toHaveValue('08/01/2025')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
	})

	test('clears the value when the field is emptied', async () => {
		await setup()
		await field().fill('')
		input().blur()
		await expect.element(boundValue()).toHaveTextContent('undefined')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
	})

	test('keeps text that is not a real date and flags it on blur', async () => {
		await setup()
		await field().fill('99/99/2025')
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')

		input().blur()
		await expect.element(field()).toHaveValue('99/99/2025')
		await expect.element(field()).toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('undefined')
	})

	test('rejects a date outside min and max without discarding the text', async () => {
		await setup({ value: undefined, min: '2025-01-01', max: '2025-12-31' })

		await field().fill('06/15/2024')
		input().blur()
		await expect.element(field()).toHaveValue('06/15/2024')
		await expect.element(field()).toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('undefined')

		await field().fill('06/15/2025')
		input().blur()
		await expect.element(field()).not.toHaveAttribute('aria-invalid', 'true')
		await expect.element(boundValue()).toHaveTextContent('2025-06-15')
	})

	test('parses the field order of the picker locale', async () => {
		await setup({ locale: 'de-DE', value: undefined })
		await field().fill('24.12.2025')
		input().blur()
		await expect.element(boundValue()).toHaveTextContent('2025-12-24')
	})
})

describe('calendar', async () => {
	test('commits the selection on OK and leaves it on Cancel', async () => {
		await setup()
		await openCalendar()

		await action('Friday, August 8, 2025').click()
		await action('Cancel').click()
		await expectClosed()
		await expect.element(field()).toHaveValue('08/17/2025')

		await openCalendar()
		await action('Friday, August 8, 2025').click()
		await action('OK').click()
		await expect.element(field()).toHaveValue('08/08/2025')
		await expect.element(boundValue()).toHaveTextContent('2025-08-08')
	})

	test('names the selected day as selected', async () => {
		await setup()
		await openCalendar()

		await expect
			.element(action('Sunday, August 17, 2025, selected'))
			.toHaveAttribute('tabindex', '0')
	})

	test('reopens on the month of the value rather than the last one browsed', async () => {
		await setup()
		await openCalendar()
		await expect.element(grid('August 2025')).toBeVisible()

		await action('Next month').click()
		await action('Next month').click()
		await expect.element(grid('October 2025')).toBeVisible()

		await action('Cancel').click()
		await expectClosed()

		await openCalendar()
		await expect.element(grid('August 2025')).toBeVisible()
	})

	test('keeps the M3 date grid measurements', async () => {
		await setup()
		await openCalendar()

		await expect.poll(() => Math.round(container()!.getBoundingClientRect().width)).toBe(360)

		const cell = document.querySelector('.np-calendar-cell')!.getBoundingClientRect()
		expect(Math.round(cell.width)).toBe(48)
		expect(Math.round(cell.height)).toBe(48)

		const layer = document.querySelector('.np-calendar-day-container')!.getBoundingClientRect()
		expect(Math.round(layer.width)).toBe(40)
		expect(Math.round(layer.height)).toBe(40)
	})

	test('sizes itself to the week rows the month needs', async () => {
		await setup()
		await openCalendar()

		await expect.poll(() => count('.np-calendar tbody tr')).toBe(6)
		const tall = container()!.getBoundingClientRect().height

		await action('Next month').click()
		await expect.poll(() => count('.np-calendar tbody tr')).toBe(5)

		await expect.poll(() => Math.round(tall - container()!.getBoundingClientRect().height)).toBe(48)
	})

	test('shows only the days of the displayed month', async () => {
		await setup()
		await openCalendar()

		await expect.poll(() => count('.np-calendar-day')).toBe(31)
		expect(count('.np-calendar-day.outside')).toBe(0)
	})

	test('fills the neighbouring cells when asked to', async () => {
		await setup({ adjacentMonthDays: true })
		await openCalendar()

		await expect.poll(() => count('.np-calendar-day')).toBe(42)
		expect(count('.np-calendar-day.outside')).toBe(11)
	})
})

describe('month and year menus', async () => {
	test('disables the opposite button and hides the steppers', async () => {
		await setup()
		await openCalendar()

		await page.getByRole('button', { name: /^Select month/ }).click()
		await expect.element(page.getByRole('button', { name: /^Select year/ })).toBeDisabled()

		await expect.poll(() => count('.np-date-picker-stepper.hidden')).toBe(4)
		const stepper = document.querySelector('.np-date-picker-stepper')!
		await expect.poll(() => getComputedStyle(stepper).visibility).toBe('hidden')
	})

	test('picking a month returns to the day grid', async () => {
		await setup()
		await openCalendar()

		await page.getByRole('button', { name: /^Select month/ }).click()
		await page.getByRole('option', { name: 'February' }).click()

		await expect.element(grid('February 2025')).toBeVisible()
	})

	test('offers the configured year range', async () => {
		await setup({ yearRange: [1920, 2000] })
		await openCalendar()

		await page.getByRole('button', { name: /^Select year/ }).click()
		await expect.element(page.getByRole('option').first()).toHaveTextContent('1920')
	})

	test('the calendar under the list is out of reach', async () => {
		await setup()
		await openCalendar()
		await page.getByRole('button', { name: /^Select year/ }).click()

		const stops: string[] = []
		for (let i = 0; i < 3; i += 1) {
			await userEvent.tab()
			stops.push((document.activeElement as HTMLElement).className)
		}

		expect(stops.some((stop) => stop.includes('np-calendar-day'))).toBe(false)
		expect(stops[0]).toContain('np-date-picker-selection-option')
	})

	test('picking a year hands focus on to the calendar', async () => {
		await setup()
		await openCalendar()
		await page.getByRole('button', { name: /^Select year/ }).click()
		await page.getByRole('option', { name: '2027' }).click()

		await expect
			.poll(() => (document.activeElement as HTMLElement).className)
			.toContain('np-calendar-day')
	})

	test('the list never covers the focus ring of the header buttons', async () => {
		await setup()
		await openCalendar()
		await page.getByRole('button', { name: /^Select year/ }).click()

		const header = document.querySelector('.np-date-picker-menu-button')!.getBoundingClientRect()
		const covered = document.querySelector('.np-month-panel-views')!.getBoundingClientRect()
		expect(covered.top).toBeGreaterThanOrEqual(header.bottom + 5)
	})

	test('the panel keeps its height through every view, so nothing jumps', async () => {
		await setup()
		await openCalendar()
		const days = height()
		const months = () => page.getByRole('button', { name: /^Select month/ }).click()
		const years = () => page.getByRole('button', { name: /^Select year/ }).click()

		expect(await heightsWhile(months)).toEqual([days, days])
		expect(await heightsWhile(months)).toEqual([days, days])
		expect(await heightsWhile(years)).toEqual([days, days])
		expect(await heightsWhile(years)).toEqual([days, days])
	})
})

describe('keyboard and pointer', async () => {
	test('arrow keys move across the month boundary and keep focus', async () => {
		await setup()
		await openCalendar()

		document.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')!.focus()
		for (let step = 0; step < 20; step++) await userEvent.keyboard('{ArrowLeft}')

		await expect.element(grid('July 2025')).toBeVisible()
		await expect
			.poll(() => document.querySelector('.np-calendar-day:focus')?.getAttribute('aria-label'))
			.toBe('Monday, July 28, 2025')

		// Enter saves the day and closes, as the spec's keyboard table asks.
		await userEvent.keyboard('{Enter}')
		await expect.element(boundValue()).toHaveTextContent('2025-07-28')
		await expect.poll(() => document.querySelector('.np-calendar')).toBeNull()
	})

	test('a horizontal swipe pages between months', async () => {
		await setup()
		await openCalendar()

		const calendar = document.querySelector<HTMLElement>('.np-calendar')!
		const box = calendar.getBoundingClientRect()
		const swipe = (fromX: number, toX: number, pointerId: number) => {
			const shared = {
				pointerId,
				pointerType: 'touch',
				isPrimary: true,
				bubbles: true,
				clientY: box.y + box.height / 2,
			}
			calendar.dispatchEvent(new PointerEvent('pointerdown', { ...shared, clientX: fromX }))
			calendar.dispatchEvent(new PointerEvent('pointerup', { ...shared, clientX: toX }))
		}

		swipe(box.right - 20, box.x + 20, 1)
		await expect.element(grid('September 2025')).toBeVisible()

		swipe(box.x + 20, box.right - 20, 2)
		await expect.element(grid('August 2025')).toBeVisible()
	})

	test('open is bindable in both directions', async () => {
		await setup()
		const state = page.getByTestId('bound-open')
		await expect.element(state).toHaveTextContent('false')

		await action('Open the calendar').click()
		await expect.poll(() => !!container()).toBe(true)
		await expect.element(state).toHaveTextContent('true')

		await userEvent.keyboard('{Escape}')
		await expectClosed()
		await expect.element(state).toHaveTextContent('false')
	})

	test('displayMonth reports where the calendar was browsed and is restored on close', async () => {
		await setup({ displayMonth: '2025-12-01' })
		await openCalendar()
		await expect.element(grid('December 2025')).toBeVisible()

		await action('Next month').click()
		await expect.element(page.getByTestId('bound-month')).toHaveTextContent('2026-01-01')

		await action('Cancel').click()
		await expectClosed()
		await expect.element(page.getByTestId('bound-month')).toHaveTextContent('2025-12-01')
	})
})

describe('placement', async () => {
	test('shows the whole calendar over a field in the middle of the window', async () => {
		await setup({ style: 'margin-top:400px' })
		await openCalendar()

		const menu = document.querySelector<HTMLElement>('.np-docked-date-picker-menu')!
		const panel = menu.getBoundingClientRect()
		const anchor = document
			.querySelector<HTMLElement>('.np-docked-date-picker')!
			.getBoundingClientRect()

		expect(panel.top).toBeLessThan(anchor.top)
		expect(panel.bottom).toBeGreaterThan(anchor.bottom)
		expect(menu.scrollHeight).toBeLessThanOrEqual(menu.clientHeight)
	})
})

describe('forms', async () => {
	test('submits the ISO value and surfaces issues', async () => {
		await setupForm()

		await action('Submit').click()
		await expect.element(page.getByRole('alert')).toHaveTextContent('Pick a delivery date.')

		await field().fill('12/24/2026')
		await action('Submit').click()
		await expect
			.element(page.getByTestId('submitted'))
			.toHaveTextContent('Submitted deliveryDate=2026-12-24')
	})

	test('matches native :user-invalid semantics on a novalidate form', async () => {
		await setupForm({ required: true })
		const userInvalid = () => input().matches(':user-invalid')

		await expect.poll(userInvalid).toBe(false)

		await field().fill('99/99/2026')
		await expect.poll(userInvalid).toBe(false)

		await action('Submit').click()
		await expect.poll(userInvalid).toBe(true)

		await field().fill('12/24/2026')
		input().blur()
		await expect.poll(userInvalid).toBe(false)
	})

	test('a required picker reports against the visible field, not the hidden value', async () => {
		await setupForm({ required: true })

		await expect.element(field()).toHaveAttribute('required', '')
		const hidden = document.querySelector<HTMLInputElement>('.np-docked-date-picker-value')!
		expect(hidden.type).toBe('hidden')

		await expect.poll(() => input().validity.valueMissing).toBe(true)
	})

	test('the calendar actions do not submit the form around the picker', async () => {
		await setupForm()
		await openCalendar()

		await action('Cancel').click()
		await expectClosed()
		expect(count('[role="alert"]')).toBe(0)

		await openCalendar()
		document.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')!.click()
		await action('OK').click()
		await expectClosed()
		expect(page.getByTestId('submitted').element().textContent).toBe('')
	})

	test('an unusable date sets a validation message the browser can report', async () => {
		await setupForm()
		const message = () => input().validationMessage

		await field().fill('99/99/2026')
		await expect.poll(message).toBe('Enter a valid date.')

		await field().fill('12/24/2026')
		await expect.poll(message).toBe('')
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

describe('keyboard and targets of the spec', async () => {
	test('Shift+M and Shift+Y open the month and year lists on the chosen entry', async () => {
		await setup()
		await openCalendar()

		await userEvent.keyboard('{Shift>}M{/Shift}')
		await expect
			.poll(
				() =>
					document.activeElement?.getAttribute('role') === 'option' &&
					document.activeElement.textContent?.trim(),
			)
			.toBe('August')

		await page.getByRole('option', { name: 'August' }).click()
		await expect.element(grid('August 2025')).toBeVisible()
		document.querySelector<HTMLElement>('.np-calendar-day[tabindex="0"]')!.focus()
		await userEvent.keyboard('{Shift>}Y{/Shift}')
		await expect
			.poll(
				() =>
					document.activeElement?.getAttribute('role') === 'option' &&
					document.activeElement.textContent?.trim(),
			)
			.toBe('2025')
	})

	test('takes Shift+M and Shift+Y from anywhere in the picker, not only from the days', async () => {
		await setup()
		await openCalendar()
		await dayFocused()
		const focusedOption = () =>
			document.activeElement?.getAttribute('role') === 'option' &&
			document.activeElement.textContent?.trim()

		action('Next month').element().focus()
		await userEvent.keyboard('{Shift>}M{/Shift}')
		await expect.poll(focusedOption).toBe('August')

		await userEvent.keyboard('{Shift>}Y{/Shift}')
		await expect.poll(focusedOption).toBe('2025')

		await page.getByRole('option', { name: '2025', exact: true }).click()
		await expect.element(grid('August 2025')).toBeVisible()
		action('Cancel').element().focus()
		await userEvent.keyboard('{Shift>}M{/Shift}')
		await expect.poll(focusedOption).toBe('August')
	})

	test('Shift+M and Shift+Y leave their list again, as their buttons do', async () => {
		await setup()
		await openCalendar()
		await dayFocused()
		const listOpen = () => count('.np-month-panel-list.open')

		await userEvent.keyboard('{Shift>}M{/Shift}')
		await expect.poll(listOpen).toBe(1)
		await userEvent.keyboard('{Shift>}M{/Shift}')
		await expect.poll(listOpen).toBe(0)
		await dayFocused()

		await userEvent.keyboard('{Shift>}Y{/Shift}')
		await expect.poll(listOpen).toBe(1)
		await userEvent.keyboard('{Shift>}Y{/Shift}')
		await expect.poll(listOpen).toBe(0)
		await dayFocused()
	})

	test('Escape in a list goes back to the days, a second one closes the picker', async () => {
		await setup()
		await openCalendar()
		await dayFocused()

		await userEvent.keyboard('{Shift>}Y{/Shift}')
		await expect.poll(() => count('.np-month-panel-list.open')).toBe(1)
		await userEvent.keyboard('{Escape}')
		await expect.poll(() => count('.np-month-panel-list.open')).toBe(0)
		await dayFocused()
		expect(container()).not.toBeNull()

		await userEvent.keyboard('{Escape}')
		await expectClosed()
	})

	test('keeps its keys after a click on a bare part of it', async () => {
		await setup()
		await openCalendar()
		await dayFocused()

		// Beside the buttons, below the room the calendar keeps for its focus ring.
		await userEvent.click(container()!.querySelector('.np-docked-date-picker-actions')!, {
			position: { x: 4, y: 20 },
		})
		await expect
			.poll(() => document.activeElement?.classList.contains('np-docked-picker-menu'))
			.toBe(true)
		await userEvent.keyboard('{Shift>}Y{/Shift}')

		await expect
			.poll(
				() =>
					document.activeElement?.getAttribute('role') === 'option' &&
					document.activeElement.textContent?.trim(),
			)
			.toBe('2025')
	})

	test('reopened while it fades out, it starts over on the days of its month', async () => {
		await setup()
		await openCalendar()
		await dayFocused()
		await userEvent.keyboard('{PageDown}{Shift>}Y{/Shift}')
		await expect.poll(() => count('.np-month-panel-list.open')).toBe(1)

		const toggle = page.getByRole('button', { name: 'Show date picker' }).element() as HTMLElement
		document
			.querySelector('.np-docked-picker-menu')!
			.addEventListener('toggle', () => setTimeout(() => toggle.click()), { once: true })
		toggle.click()

		await expect.element(grid('August 2025')).toBeVisible()
		expect(count('.np-month-panel-list.open')).toBe(0)
		await dayFocused()
	})

	test('keeps the focus ring of its outer arrows inside the picker', async () => {
		await setup()
		await openCalendar()
		const menu = document.querySelector('.np-docked-picker-menu')!.getBoundingClientRect()

		for (const name of ['Previous month', 'Next year']) {
			const arrow = action(name).element() as HTMLElement
			arrow.focus({ focusVisible: true })
			const style = getComputedStyle(arrow)
			const reach = parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth)
			const rect = arrow.getBoundingClientRect()
			expect(Math.min(rect.left - menu.left, menu.right - rect.right), name).toBeGreaterThanOrEqual(
				reach,
			)
		}
	})

	test('leaves the focus ring of the days at its edges whole', async () => {
		await setup()
		await openCalendar()

		for (const name of ['Sunday, August 3', 'Saturday, August 9', 'Sunday, August 31']) {
			const day = document.querySelector(`.np-calendar-day[aria-label^="${name}"]`)!
			expect(clipsOfRing(day), name).toEqual([])
		}
	})

	test('takes Page up and Page down on the header arrows, which keep focus', async () => {
		await setup()
		await openCalendar()
		await dayFocused()
		const arrow = action('Next month').element()
		arrow.focus()

		await userEvent.keyboard('{PageDown}')
		await expect.element(grid('September 2025')).toBeVisible()
		await userEvent.keyboard('{Shift>}{PageUp}{/Shift}')
		await expect.element(grid('September 2024')).toBeVisible()
		expect(document.activeElement).toBe(arrow)
	})

	test('gives its arrows a 48dp target and names their keys', async () => {
		await setup()
		await openCalendar()

		const arrow = action('Previous year').element()
		const touch = arrow.querySelector('.np-touch')!.getBoundingClientRect()
		expect([Math.round(touch.width), Math.round(touch.height)]).toEqual([48, 48])
		const tip = document.getElementById(arrow.getAttribute('aria-describedby')!)
		expect(tip?.textContent?.trim()).toBe('Previous year (Shift+Page up)')
	})

	test('shows the full weekday on hover', async () => {
		await setup()
		await openCalendar()

		const short = document.querySelector<HTMLElement>('.np-calendar-weekday-short')!
		expect(short.title).toBe('Sunday')
		expect(short.getAttribute('aria-hidden')).toBe('true')
	})

	test('reads digits typed without separators and formats them on Enter', async () => {
		await setup({ value: undefined })

		await field().fill('09012025')
		await userEvent.keyboard('{Enter}')

		await expect.element(field()).toHaveValue('09/01/2025')
		await expect.element(boundValue()).toHaveTextContent('2025-09-01')
	})
})

test('opens its calendar without a shadow, as M3 date pickers do', async () => {
	await setup()
	await openCalendar()

	expect(getComputedStyle(document.querySelector('.np-docked-date-picker-menu')!).boxShadow).toBe(
		'none',
	)
})
