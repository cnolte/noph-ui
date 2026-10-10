import { createRawSnippet } from 'svelte'
import { describe, expect, test, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import AssistChip from './AssistChip.svelte'
import ChipSet from './ChipSet.svelte'
import Harness from './ChipsHarness.test.svelte'
import InputChip from './InputChip.svelte'
import SuggestionChip from './SuggestionChip.svelte'

const people = () => page.getByTestId('people').element().textContent
const icon = createRawSnippet(() => ({ render: () => '<svg viewBox="0 0 24 24"></svg>' }))

describe('InputChip', async () => {
	test('with remove as its only action, the chip is one tab stop named "Remove …"', async () => {
		await render(Harness)
		const ada = page.getByRole('button', { name: 'Remove Ada' })
		await expect.element(ada).toBeVisible()
		expect(page.getByRole('button', { name: 'Ada', exact: true }).elements()).toHaveLength(0)
	})

	test('with its own action, label and remove are two tab stops', async () => {
		await render(Harness)
		await expect.element(page.getByRole('button', { name: 'Editable', exact: true })).toBeVisible()
		await expect.element(page.getByRole('button', { name: 'Remove Editable' })).toBeVisible()
	})

	test('Delete and Backspace remove the focused chip and move focus on', async () => {
		await render(Harness)
		;(page.getByRole('button', { name: 'Remove Ada' }).element() as HTMLElement).focus()

		await userEvent.keyboard('{Delete}')
		await expect.poll(people).toBe('Grace,Linus')
		expect(document.activeElement?.getAttribute('aria-label')).toBe('Remove Grace')

		await userEvent.keyboard('{Backspace}')
		await expect.poll(people).toBe('Linus')
	})

	test('focused, a chip with remove as its only action shows the ring on the whole chip', async () => {
		await render(Harness)
		const remove = page.getByRole('button', { name: 'Remove Ada' }).element() as HTMLElement
		remove.focus()
		await userEvent.keyboard('{ArrowRight}{ArrowLeft}')

		const chip = getComputedStyle(remove.closest('.np-input-chip')!)
		expect(chip.outlineStyle).toBe('solid')
		expect(getComputedStyle(remove).outlineStyle).toBe('none')
	})

	test('focused, the remove button of a chip with its own action shows its own ring', async () => {
		await render(Harness)
		const remove = page.getByRole('button', { name: 'Remove Editable' }).element() as HTMLElement
		remove.focus()
		await userEvent.keyboard('{ArrowLeft}{ArrowRight}')

		expect(getComputedStyle(remove.closest('.np-input-chip')!).outlineStyle).toBe('none')
		expect(getComputedStyle(remove).outlineStyle).toBe('solid')
	})

	test('an avatar is 24px with 12px corners', async () => {
		const avatar = createRawSnippet(() => ({ render: () => '<img alt="" src="data:," />' }))
		await render(InputChip, { label: 'Ping', avatar })
		const box = document.querySelector<HTMLElement>('.np-chip-avatar')!
		expect(box.getBoundingClientRect().width).toBe(24)
		expect(getComputedStyle(box).borderRadius).toBe('12px')
	})

	test('a chip with its own action is at least 88px wide', async () => {
		await render(InputChip, { label: 'A', onclick: () => {} })
		expect(document.querySelector('.np-input-chip')!.getBoundingClientRect().width).toBe(88)
	})
})

describe('FilterChip', async () => {
	test('Enter selects it instead of submitting the form', async () => {
		const onsubmit = vi.fn()
		await render(Harness, { onsubmit })
		const vegan = page.getByRole('checkbox', { name: 'Vegan' })
		;(vegan.element() as HTMLElement).focus()

		await userEvent.keyboard('{Enter}')

		await expect.element(vegan).toBeChecked()
		expect(onsubmit).not.toHaveBeenCalled()
	})

	test('names its remove button after its label', async () => {
		await render(Harness)
		await expect.element(page.getByRole('button', { name: 'Remove Removable' })).toBeVisible()
	})

	test('keeps a 48px tall target', async () => {
		await render(Harness)
		const touch = document.querySelector('.np-filter-chip .np-touch')!
		expect(touch.getBoundingClientRect().height).toBe(48)
	})
})

describe('Assist and suggestion chips', async () => {
	test('keep a 48px tall target', async () => {
		await render(AssistChip, { label: 'Book' })
		expect(document.querySelector('.np-touch')!.getBoundingClientRect().height).toBe(48)
	})

	test('a suggestion chip takes a leading icon', async () => {
		await render(SuggestionChip, { label: 'Hotels', icon })
		expect(document.querySelector('.button-icon svg')).not.toBeNull()
	})
})

describe('ChipSet', async () => {
	test('↓ moves to the closest chip in the next row of a wrapped set', async () => {
		const children = createRawSnippet(() => ({
			render: () =>
				`<div style="display:contents">${['One', 'Two', 'Three', 'Four', 'Five', 'Six']
					.map((label) => `<button style="width:90px">${label}</button>`)
					.join('')}</div>`,
		}))
		await render(ChipSet, { children, style: 'width: 300px' } as never)
		const buttons = [...document.querySelectorAll<HTMLButtonElement>('.np-chip-set button')]
		const rows = new Set(buttons.map((b) => Math.round(b.getBoundingClientRect().top)))
		expect(rows.size).toBeGreaterThan(1)
		buttons[1].focus()

		await userEvent.keyboard('{ArrowDown}')

		const from = buttons[1].getBoundingClientRect()
		const to = (document.activeElement as HTMLElement).getBoundingClientRect()
		expect(to.top).toBeGreaterThan(from.top)
		expect(Math.abs(to.left - from.left)).toBeLessThan(5)
	})
})
