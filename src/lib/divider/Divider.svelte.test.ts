import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './DividerHarness.test.svelte'

const divider = (id: string) => document.querySelector<HTMLElement>(`[data-testid="${id}"]`)!

describe('Divider', async () => {
	test('a horizontal divider is a 1px rule across its container', async () => {
		await render(Harness)

		const rule = divider('horizontal').getBoundingClientRect()
		expect(rule.height).toBe(1)
		expect(rule.width).toBe(300)
		expect(divider('horizontal').getAttribute('aria-orientation')).toBeNull()
	})

	test('a vertical divider is 1px wide and takes the height of its row', async () => {
		await render(Harness)

		const rule = divider('vertical').getBoundingClientRect()
		expect(rule.width).toBe(1)
		expect(rule.height).toBe(64)
		expect(divider('vertical').getAttribute('role')).toBe('separator')
		expect(divider('vertical').getAttribute('aria-orientation')).toBe('vertical')
	})

	test('a vertical inset-middle divider is indented at top and bottom', async () => {
		await render(Harness)

		expect(divider('vertical-inset').getBoundingClientRect().height).toBe(32)
	})
})
