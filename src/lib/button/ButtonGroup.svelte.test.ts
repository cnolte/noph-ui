import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './ButtonGroupHarness.test.svelte'

const byId = (id: string) => document.getElementById(id)!
const group = () => document.querySelector<HTMLElement>('.np-button-group')!
const corners = (id: string) => {
	const style = getComputedStyle(byId(id))
	return {
		start: style.borderStartStartRadius,
		end: style.borderStartEndRadius,
	}
}

describe('ButtonGroup', () => {
	test('groups its buttons', () => {
		render(Harness)

		expect(group().getAttribute('role')).toBe('group')
		expect(group().getAttribute('aria-label')).toBe('Text style')
		expect(byId('first').textContent).toContain('Work')
	})

	test('a standard group keeps the space of the spec between its buttons', () => {
		render(Harness)

		expect(getComputedStyle(group()).columnGap).toBe('12px')
		expect(corners('first').start).toBe(corners('first').end)
	})

	test('a connected group moves its buttons together', () => {
		render(Harness, { variant: 'connected' })

		expect(getComputedStyle(group()).columnGap).toBe('2px')
	})

	test('a connected group shortens the corners that meet another button', () => {
		render(Harness, { variant: 'connected' })

		expect(corners('first')).toEqual({ start: '20px', end: '8px' })
		expect(corners('middle')).toEqual({ start: '8px', end: '8px' })
		expect(corners('last')).toEqual({ start: '8px', end: '20px' })
	})

	test('the corners a person sees are rounded, not only the ones in the style sheet', () => {
		render(Harness, { variant: 'connected' })
		const first = byId('first')
		const box = first.getBoundingClientRect()
		const hit = (x: number, y: number) => document.elementFromPoint(x, y)?.closest('.np-button')

		expect(hit(box.right - 1, box.top + 1)).toBeNull()
		expect(hit(box.right - 6, box.top + 6)).toBe(first)
		expect(hit(box.left + 1, box.top + 1)).toBeNull()
		expect(hit(box.left + 1, box.top + box.height / 2)).toBe(first)
	})

	test('the inner corners follow a custom shape', () => {
		render(Harness, { variant: 'connected', style: '--np-button-group-inner-corner: 4px' })

		expect(corners('middle')).toEqual({ start: '4px', end: '4px' })
	})

	test('a focused button is lifted over its neighbours', () => {
		render(Harness, { variant: 'connected' })

		byId('first').focus()

		expect(byId('first').matches(':focus-visible')).toBe(true)
		expect(getComputedStyle(byId('first')).zIndex).toBe('1')
		expect(getComputedStyle(byId('middle')).zIndex).toBe('auto')
		expect(getComputedStyle(group()).isolation).toBe('isolate')
	})

	test('reduced motion leaves the widths of the buttons alone', async () => {
		render(Harness)
		const first = byId('first')
		const before = first.getBoundingClientRect().width

		first.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
		await new Promise((resolve) => requestAnimationFrame(resolve))

		expect(first.style.width).toBe('')
		expect(first.getBoundingClientRect().width).toBe(before)
	})
})
