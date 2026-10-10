import { createRawSnippet } from 'svelte'
import { describe, expect, test, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Button from './Button.svelte'
import ButtonGroup from './ButtonGroupHarness.test.svelte'
import Selection from './ButtonGroupSelectionHarness.test.svelte'
import IconButton from './IconButton.svelte'
import SegmentedButton from './SegmentedButton.svelte'

const byId = (id: string) => document.getElementById(id)!
const pressed = (id: string) => byId(id).getAttribute('aria-pressed')
const value = () => JSON.parse(page.getByTestId('value').element().textContent!)

describe('Button', async () => {
	test('a selected square toggle turns round, a selected round one square', async () => {
		await render(Button, { toggle: true, selected: true, shape: 'square', children: undefined })
		expect(document.querySelector('.np-button')!.classList).toContain('round')
	})

	test('the visible label names the button, the title only describes it', async () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Save</span>' }))
		await render(Button, { title: 'Save the file', id: 'b', children } as never)
		await expect.element(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible()
		expect(byId('b').getAttribute('aria-describedby')).toBe(byId('b').getAttribute('interestfor'))
	})

	test('an extra small button keeps a 48px tall target', async () => {
		await render(Button, { size: 'xs', id: 'b' } as never)
		const touch = byId('b').querySelector('.np-touch')!.getBoundingClientRect()
		expect(touch.height).toBe(48)
	})

	test('keeps its label whole and centered when stretched', async () => {
		await render(Button, { id: 'b', style: 'width: 400px' } as never)
		expect(getComputedStyle(byId('b')).justifyContent).toBe('center')
		await render(Button, { id: 'c', style: 'width: 10px' } as never)
		expect(byId('c').getBoundingClientRect().width).toBeGreaterThan(10)
	})
})

describe('IconButton', async () => {
	test('the title names it once, without describing it again', async () => {
		await render(IconButton, { title: 'Add to favorites', id: 'i' } as never)
		await expect
			.element(page.getByRole('button', { name: 'Add to favorites' }))
			.not.toHaveAttribute('aria-describedby')
	})

	test('a selected square toggle turns round', async () => {
		await render(IconButton, { toggle: true, selected: true, shape: 'square', id: 'i' } as never)
		expect(byId('i').classList).toContain('round')
	})
})

describe('ButtonGroup', async () => {
	test('the space between the buttons follows their size', async () => {
		await render(ButtonGroup, { variant: 'standard', size: 'xs' })
		expect(getComputedStyle(document.querySelector('.np-button-group')!).columnGap).toBe('18px')
		await render(ButtonGroup, { variant: 'standard', size: 'm' })
		expect(getComputedStyle(document.querySelectorAll('.np-button-group')[1]).columnGap).toBe('8px')
	})

	test('a connected group of large buttons meets with 16px corners', async () => {
		await render(ButtonGroup, { variant: 'connected', size: 'l' })
		expect(getComputedStyle(byId('middle')).borderStartStartRadius).toBe('16px')
	})

	test('a connected square group rounds every corner by the size', async () => {
		await render(ButtonGroup, { variant: 'connected', size: 'xl', shape: 'square' })
		expect(getComputedStyle(byId('first')).borderStartStartRadius).toBe('20px')
		expect(getComputedStyle(byId('first')).borderStartEndRadius).toBe('20px')
	})

	test('the buttons share one tab stop and follow the arrow keys', async () => {
		await render(ButtonGroup, { variant: 'standard' })
		byId('first').focus()
		await userEvent.keyboard('{ArrowRight}')
		expect(document.activeElement).toBe(byId('middle'))
		expect(byId('first').tabIndex).toBe(-1)
	})
})

describe('ButtonGroup selection', async () => {
	test('single keeps one button selected', async () => {
		await render(Selection, { selection: 'single', value: 'work' })
		expect(pressed('work')).toBe('true')

		await userEvent.click(byId('home'))

		expect(value()).toBe('home')
		expect(pressed('work')).toBe('false')
		expect(pressed('home')).toBe('true')
	})

	test('multiple toggles each button on its own', async () => {
		await render(Selection, { selection: 'multiple', value: ['work'] })

		await userEvent.click(byId('cafe'))
		expect(value()).toEqual(['work', 'cafe'])
		await userEvent.click(byId('work'))
		expect(value()).toEqual(['cafe'])
	})

	test('required keeps the last selected button on', async () => {
		await render(Selection, { selection: 'single', value: 'work', required: true })

		await userEvent.click(byId('work'))

		expect(value()).toBe('work')
	})

	test('submits and resets with its form', async () => {
		const onsubmit = vi.fn()
		await render(Selection, { selection: 'multiple', value: ['work'], name: 'place', onsubmit })

		await userEvent.click(byId('home'))
		await userEvent.click(byId('submit'))
		expect(onsubmit.mock.calls[0][0].getAll('place')).toEqual(['work', 'home'])

		await userEvent.click(byId('reset'))
		await expect.poll(value).toEqual(['work'])
	})

	test('required blocks a submit without a selection', async () => {
		const onsubmit = vi.fn()
		await render(Selection, { selection: 'single', name: 'place', required: true, onsubmit })

		await userEvent.click(byId('submit'))

		expect(onsubmit).not.toHaveBeenCalled()
	})
})

describe('SegmentedButton', async () => {
	const options = [{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]

	test('is 40px high, hugs its labels and keeps 48px targets', async () => {
		await render(SegmentedButton, { name: 'range', options, style: 'width: auto' } as never)
		const box = document.querySelector('.np-segmented-buttons')!.getBoundingClientRect()
		expect(box.height).toBe(40)
		expect(box.width).toBeLessThan(window.innerWidth / 2)
		expect(document.querySelector('.np-touch')!.getBoundingClientRect().height).toBe(48)
	})

	test('single-select is a radio group, Enter picks without submitting', async () => {
		await render(SegmentedButton, { name: 'range', options, 'aria-label': 'Range' } as never)
		await expect.element(page.getByRole('radiogroup', { name: 'Range' })).toBeVisible()

		const day = page.getByRole('radio', { name: 'Day' })
		;(day.element() as HTMLElement).focus()
		await userEvent.keyboard('{Enter}')
		await expect.element(day).toBeChecked()
	})

	test('multi-select moves between segments with the arrow keys', async () => {
		await render(SegmentedButton, { name: 'range', options, multiSelect: true } as never)
		const boxes = [...document.querySelectorAll<HTMLInputElement>('input')]
		boxes[0].focus()

		await userEvent.keyboard('{ArrowRight}')

		expect(document.activeElement).toBe(boxes[1])
		expect(boxes[0].tabIndex).toBe(-1)
	})
})
