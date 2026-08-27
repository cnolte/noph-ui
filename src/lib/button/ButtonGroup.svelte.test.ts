import { afterEach, describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './ButtonGroupHarness.test.svelte'
import { resolveItem } from './buttonGroup.ts'

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

describe('resolveItem', () => {
	// getComputedStyle only reports display:contents for an element in the document
	const rows: HTMLElement[] = []
	afterEach(() => {
		for (const row of rows.splice(0)) row.remove()
	})

	const child = (parent: HTMLElement, tag: string, style = '') => {
		const element = document.createElement(tag)
		element.setAttribute('style', style)
		parent.append(element)
		return element as HTMLElement
	}
	const row = () => {
		const element = child(document.body, 'div')
		rows.push(element)
		return element
	}

	test('keeps an element that generates a box of its own', () => {
		const button = child(row(), 'button')

		expect(resolveItem(button)).toBe(button)
	})

	test('stands in the button for a display:contents wrapper', () => {
		const wrapper = child(row(), 'span', 'display: contents')
		const button = child(wrapper, 'button')

		expect(resolveItem(wrapper)).toBe(button)
	})

	test('skips a popover the wrapper holds next to its button', () => {
		const wrapper = child(row(), 'span', 'display: contents')
		child(wrapper, 'div').setAttribute('popover', '')
		const button = child(wrapper, 'button')

		expect(resolveItem(wrapper)).toBe(button)
	})

	test('walks through nested wrappers', () => {
		const outer = child(row(), 'span', 'display: contents')
		const button = child(child(outer, 'span', 'display: contents'), 'button')

		expect(resolveItem(outer)).toBe(button)
	})

	test('keeps a wrapper that holds nothing to measure', () => {
		const wrapper = child(row(), 'span', 'display: contents')

		expect(resolveItem(wrapper)).toBe(wrapper)
	})
})
