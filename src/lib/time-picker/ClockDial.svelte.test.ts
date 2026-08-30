import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './ClockDialHarness.test.svelte'

const OUTER_RATIO = 0.454
const INNER_RATIO = 0.3021
const HANDLE_RADIUS = 24

/**
 * How far a ring sits from the centre. The handle's own radius comes off the ratio, which is what
 * keeps the 48dp handle and the numbers inside the 256dp dial rather than over its edge.
 */
const ringRadius = (ratio: number, size: number) => ratio * size - HANDLE_RADIUS

const setup = (props: Record<string, unknown> = {}) =>
	render(Harness, { locale: 'en-US', value: 0, ...props })

const dial = () => document.querySelector<HTMLElement>('.np-clock-dial')!
const boundValue = () => page.getByTestId('bound-value')
const ends = () => page.getByTestId('ends')
const lastSource = () => page.getByTestId('last-source')
const option = (name: string) => page.getByRole('option', { name, exact: true })

// The numbers carry `pointer-events: none` because the dial itself reads every pointer position, so
// a real click cannot land on one. Activating them the way a keyboard does is what these tests need.
const activate = (name: string) => {
	const target = option(name).element() as HTMLElement
	target.focus()
	target.click()
}

const centre = () => {
	const box = dial().getBoundingClientRect()
	return { x: box.x + box.width / 2, y: box.y + box.height / 2, size: box.width }
}

/** A point on a ring, measured the way the dial reads it: 0 at the top, going clockwise. */
const pointAt = (turns: number, ratio = OUTER_RATIO) => {
	const { x, y, size } = centre()
	const angle = turns * 2 * Math.PI - Math.PI / 2
	const radius = ringRadius(ratio, size)
	return {
		clientX: x + Math.cos(angle) * radius,
		clientY: y + Math.sin(angle) * radius,
	}
}

let nextPointer = 1

const gesture = (points: { clientX: number; clientY: number }[]) => {
	const pointerId = nextPointer++
	const shared = { pointerId, pointerType: 'touch', isPrimary: true, bubbles: true }
	const [first, ...rest] = points
	dial().dispatchEvent(new PointerEvent('pointerdown', { ...shared, ...first }))
	for (const point of rest) {
		dial().dispatchEvent(new PointerEvent('pointermove', { ...shared, ...point }))
	}
	dial().dispatchEvent(new PointerEvent('pointerup', { ...shared, ...points.at(-1)! }))
}

const tap = (turns: number, ratio = OUTER_RATIO) => gesture([pointAt(turns, ratio)])

describe('geometry', async () => {
	test('is the 256dp dial of the spec, with a 48dp handle and a 2dp track', async () => {
		await setup()
		const box = dial().getBoundingClientRect()
		expect(Math.round(box.width)).toBe(256)
		expect(Math.round(box.height)).toBe(256)

		const handle = document.querySelector<HTMLElement>('.np-clock-dial-handle')!
		expect(Math.round(handle.getBoundingClientRect().width)).toBe(48)

		// The track lives inside the rotated selector, so its own box is what carries the 2dp.
		const track = document.querySelector<HTMLElement>('.np-clock-dial-track')!
		expect(track.offsetHeight).toBe(2)

		const dot = document.querySelector<HTMLElement>('.np-clock-dial-center')!
		expect(Math.round(dot.getBoundingClientRect().width)).toBe(8)
	})

	test('keeps the handle and every number inside the dial, so nothing has to scroll', async () => {
		await setup({ hour12: true, value: 3 * 60 })
		const target = dial()
		expect(target.scrollWidth).toBe(target.clientWidth)
		expect(target.scrollHeight).toBe(target.clientHeight)

		const dialBox = target.getBoundingClientRect()
		const parts = [
			...document.querySelectorAll<HTMLElement>('.np-clock-dial-option'),
			document.querySelector<HTMLElement>('.np-clock-dial-handle')!,
		]
		for (const part of parts) {
			const box = part.getBoundingClientRect()
			expect(box.top).toBeGreaterThanOrEqual(Math.floor(dialBox.top))
			expect(box.left).toBeGreaterThanOrEqual(Math.floor(dialBox.left))
			expect(box.right).toBeLessThanOrEqual(Math.ceil(dialBox.right))
			expect(box.bottom).toBeLessThanOrEqual(Math.ceil(dialBox.bottom))
		}
	})

	test('puts 12 at the top and 3 to the right, on the outer ring', async () => {
		await setup({ hour12: true })
		const { x, y, size } = centre()

		const twelve = option('12 hours of 12').element().getBoundingClientRect()
		expect(Math.round(twelve.x + twelve.width / 2)).toBe(Math.round(x))
		expect(Math.round(twelve.y + twelve.height / 2)).toBe(
			Math.round(y - ringRadius(OUTER_RATIO, size)),
		)

		const three = option('3 hours of 12').element().getBoundingClientRect()
		expect(Math.round(three.x + three.width / 2)).toBe(
			Math.round(x + ringRadius(OUTER_RATIO, size)),
		)
		expect(Math.round(three.y + three.height / 2)).toBe(Math.round(y))
	})

	test('sends the second half of a 24 hour day to the inner ring', async () => {
		await setup()
		const { x, size } = centre()

		const outer = option('3 hours of 24').element().getBoundingClientRect()
		expect(Math.round(outer.x + outer.width / 2)).toBe(
			Math.round(x + ringRadius(OUTER_RATIO, size)),
		)

		const inner = option('15 hours of 24').element().getBoundingClientRect()
		expect(Math.round(inner.x + inner.width / 2)).toBe(
			Math.round(x + ringRadius(INNER_RATIO, size)),
		)
	})
})

describe('pointer', async () => {
	test('a tap picks the hour under it', async () => {
		await setup({ hour12: true })
		tap(3 / 12)
		await expect.element(boundValue()).toHaveTextContent('180')

		tap(0)
		await expect.element(boundValue()).toHaveTextContent('0')
	})

	test('a tap on the minute ring lands on a whole five minutes', async () => {
		await setup({ selection: 'minute', value: 0 })
		// Just past the 7 minute mark, which rounds to 5 rather than to 7.
		tap(7.4 / 60)
		await expect.element(boundValue()).toHaveTextContent('5')
	})

	test('a drag keeps the full minute step', async () => {
		await setup({ selection: 'minute', value: 0 })
		gesture([pointAt(0), pointAt(3 / 60), pointAt(7 / 60)])
		await expect.element(boundValue()).toHaveTextContent('7')
	})

	test('follows the finger rather than waiting for it to lift', async () => {
		await setup({ selection: 'minute', value: 0 })
		const pointerId = nextPointer++
		const shared = { pointerId, pointerType: 'touch', isPrimary: true, bubbles: true }
		const move = (turns: number) =>
			dial().dispatchEvent(new PointerEvent('pointermove', { ...shared, ...pointAt(turns) }))

		dial().dispatchEvent(new PointerEvent('pointerdown', { ...shared, ...pointAt(0) }))
		move(10 / 60)
		await expect.element(boundValue()).toHaveTextContent('10')
		move(25 / 60)
		await expect.element(boundValue()).toHaveTextContent('25')
		dial().dispatchEvent(new PointerEvent('pointerup', { ...shared, ...pointAt(25 / 60) }))
		await expect.element(ends()).toHaveTextContent('1')
	})

	test('the distance from the centre chooses the ring of a 24 hour dial', async () => {
		await setup()
		tap(3 / 12, OUTER_RATIO)
		await expect.element(boundValue()).toHaveTextContent('180')

		tap(3 / 12, INNER_RATIO)
		await expect.element(boundValue()).toHaveTextContent('900')
	})

	test('reports the end of the gesture once, as a pointer', async () => {
		await setup({ hour12: true })
		gesture([pointAt(0), pointAt(2 / 12), pointAt(4 / 12)])
		await expect.element(ends()).toHaveTextContent('1')
		await expect.element(lastSource()).toHaveTextContent('pointer')
	})

	test('holds the hour while the minute is being dragged', async () => {
		await setup({ selection: 'minute', value: 14 * 60 + 30 })
		gesture([pointAt(30 / 60), pointAt(50 / 60)])
		await expect.element(boundValue()).toHaveTextContent(`${14 * 60 + 50}`)
	})
})

describe('keyboard', async () => {
	test('walks the ring and wraps around both ends', async () => {
		await setup({ hour12: true, value: 0 })
		activate('12 hours of 12')
		await expect.element(boundValue()).toHaveTextContent('0')

		await userEvent.keyboard('{ArrowRight}')
		await expect.element(boundValue()).toHaveTextContent('60')

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
		await expect.element(boundValue()).toHaveTextContent(`${11 * 60}`)

		await userEvent.keyboard('{ArrowRight}')
		await expect.element(boundValue()).toHaveTextContent('0')
	})

	test('reaches the ends of the ring with Home and End', async () => {
		await setup({ hour12: true, value: 5 * 60 })
		activate('5 hours of 12')

		await userEvent.keyboard('{End}')
		await expect.element(boundValue()).toHaveTextContent(`${11 * 60}`)

		await userEvent.keyboard('{Home}')
		await expect.element(boundValue()).toHaveTextContent('0')
	})

	test('does not hand the turn on, so the hour can still be adjusted', async () => {
		await setup({ hour12: true, value: 0 })
		activate('3 hours of 12')
		await expect.element(lastSource()).toHaveTextContent('keyboard')

		await userEvent.keyboard('{ArrowRight}')
		await expect.element(ends()).toHaveTextContent('1')
	})

	test('carries one tab stop, on the selected number', async () => {
		await setup({ hour12: true, value: 3 * 60 })
		const stops = document.querySelectorAll('.np-clock-dial-option[tabindex="0"]')
		expect(stops).toHaveLength(1)
		expect(stops[0].getAttribute('aria-label')).toBe('3 hours of 12')
	})
})

describe('reach', async () => {
	test('greys out an hour no minute of which is within the bounds', async () => {
		await setup({ hour12: true, min: 9 * 60, max: 17 * 60, value: 10 * 60 })
		await expect.element(option('9 hours of 12')).not.toHaveAttribute('aria-disabled', 'true')
		await expect.element(option('7 hours of 12')).toHaveAttribute('aria-disabled', 'true')
	})

	test('refuses to select a number that is out of reach', async () => {
		await setup({ hour12: true, min: 9 * 60, max: 17 * 60, value: 10 * 60 })
		activate('7 hours of 12')
		await expect.element(boundValue()).toHaveTextContent(`${10 * 60}`)
	})

	test('takes a time out of reach through isTimeEnabled', async () => {
		await setup({
			selection: 'minute',
			value: 0,
			isTimeEnabled: (minutes: number) => minutes % 60 < 30,
		})
		await expect.element(option('45 minutes of 60')).toHaveAttribute('aria-disabled', 'true')
		await expect.element(option('15 minutes of 60')).not.toHaveAttribute('aria-disabled', 'true')
	})
})

describe('a11y', async () => {
	test('is a listbox that names the field it is editing', async () => {
		await setup({ hour12: true })
		await expect.element(page.getByRole('listbox', { name: 'Select hour' })).toBeInTheDocument()
	})

	test('renames itself when it moves on to the minute', async () => {
		await setup({ selection: 'minute' })
		await expect.element(page.getByRole('listbox', { name: 'Select minute' })).toBeInTheDocument()
	})

	test('marks the number the handle rests on as the selected one', async () => {
		await setup({ hour12: true, value: 3 * 60 })
		await expect.element(option('3 hours of 12')).toHaveAttribute('aria-selected', 'true')
		await expect.element(option('4 hours of 12')).toHaveAttribute('aria-selected', 'false')
	})

	test('announces the time once the gesture is over', async () => {
		await setup({ hour12: true, value: 0 })
		const live = document.querySelector<HTMLElement>('.np-clock-dial-sr-only')!
		expect(live.textContent).toBe('')

		tap(3 / 12)
		await expect.poll(() => live.textContent).toBe('03:00 AM')
	})

	test('shows a number on every fifth minute and leaves the rest unlabelled', async () => {
		await setup({ selection: 'minute', value: 0 })
		const labelled = [...document.querySelectorAll('.np-clock-dial-option')].filter(
			(each) => (each.textContent ?? '').trim() !== '',
		)
		expect(labelled).toHaveLength(12)
		expect(labelled.map((each) => each.textContent?.trim())).toContain('35')
	})
})
