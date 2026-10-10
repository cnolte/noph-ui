import { expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import AutoComplete from '#lib/autocomplete/AutoComplete.svelte'
import Select from './Select.svelte'

const options = Array.from({ length: 400 }, (_, index) => ({
	value: index,
	label: `Option ${index}`,
	supportingText: index % 2 ? 'With a second line' : undefined,
}))

test('a long select scrolls the option it focuses fully into view', async () => {
	await render(Select, { label: 'Pick', options, value: 0 })

	document.querySelector<HTMLElement>('[role="combobox"]')!.focus()
	await userEvent.keyboard('{ArrowDown}')
	for (let i = 0; i < 12; i++) await userEvent.keyboard('{ArrowDown}')

	await expect
		.poll(() => document.activeElement?.querySelector('.np-item-headline')?.textContent?.trim())
		.toBe('Option 12')
	const viewport = document.querySelector('svelte-virtual-list-viewport')!.getBoundingClientRect()
	const option = document.activeElement!.getBoundingClientRect()
	expect(option.top).toBeGreaterThanOrEqual(viewport.top - 1)
	expect(option.bottom).toBeLessThanOrEqual(viewport.bottom + 1)
})

test('a long autocomplete fills its list when only some options have a second line', async () => {
	await render(AutoComplete, {
		label: 'Pick',
		options: options.map((option, index) => ({
			...option,
			supportingText: index === 399 ? 'Only this one' : undefined,
		})),
	})

	await userEvent.click(document.querySelector('input')!)

	await expect
		.poll(() => {
			const viewport = document.querySelector('svelte-virtual-list-viewport')
			const rows = [...(viewport?.querySelectorAll('[role="option"]') ?? [])]
			const filled = rows.reduce((sum, row) => sum + row.getBoundingClientRect().height, 0)
			return viewport ? filled >= viewport.getBoundingClientRect().height : false
		})
		.toBe(true)
})
