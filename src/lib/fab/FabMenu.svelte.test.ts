import { tick } from 'svelte'
import { describe, expect, onTestFinished, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './FabMenuHarness.test.svelte'
import PairHarness from './FabMenuPairHarness.test.svelte'

const list = () => document.querySelector<HTMLElement>('.np-fab-menu-list')!
const trigger = () => document.querySelector<HTMLElement>('.np-fab-menu-trigger')!
const entries = () => [...list().querySelectorAll<HTMLElement>('.np-button')]

describe('FabMenu', async () => {
	test('names the trigger and the menu, since the trigger shows no text', async () => {
		await render(Harness)

		expect(trigger().getAttribute('aria-label')).toBe('Create')
		expect(list().getAttribute('role')).toBe('menu')
		expect(list().getAttribute('aria-label')).toBe('Create')
	})

	test('starts closed', async () => {
		await render(Harness)

		expect(list().matches(':popover-open')).toBe(false)
		expect(trigger().getAttribute('aria-expanded')).toBe('false')
	})

	test('the trigger opens it', async () => {
		await render(Harness)

		await page.getByRole('button', { name: 'Create' }).click()

		await expect.poll(() => list().matches(':popover-open')).toBe(true)
		await expect.poll(() => trigger().getAttribute('aria-expanded')).toBe('true')
	})

	test('bind:open opens it from the app', async () => {
		const { rerender } = await render(Harness, { open: false })

		await rerender({ open: true })

		await expect.poll(() => list().matches(':popover-open')).toBe(true)
	})

	test('the trigger becomes square while open, matching M3', async () => {
		const { rerender } = await render(Harness, { open: false })
		expect(trigger().classList.contains('round')).toBe(true)

		await rerender({ open: true })

		await expect.poll(() => trigger().classList.contains('square')).toBe(true)
	})

	test('both trigger icons stay mounted, so the swap can animate', async () => {
		const icons = () => [...document.querySelectorAll('.np-fab-menu-icons > *')]
		const { rerender } = await render(Harness, { open: false })

		// A swap cannot animate: the icon arriving has no previous state to move from.
		expect(icons()).toHaveLength(2)
		expect(icons().filter((i) => i.classList.contains('np-fab-menu-icon-away'))).toHaveLength(1)

		await rerender({ open: true })

		await expect
			.poll(() => icons().findIndex((i) => i.classList.contains('np-fab-menu-icon-away')))
			.toBe(0)
		expect(icons()).toHaveLength(2)
	})

	test('opening the menu does not bring the trigger tooltip back', async () => {
		const tooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]')!
		if (!('interestForElement' in HTMLButtonElement.prototype)) {
			// Without interest invokers the tooltip runs on its own mouse handlers, which this is
			// not about.
			expect(tooltip).toBeTypeOf('function')
			return
		}
		await render(Harness)
		// The tooltip would otherwise take its full interest delay to appear.
		const style = document.createElement('style')
		style.textContent = '[interestfor] { interest-delay: 0s }'
		document.head.append(style)
		onTestFinished(() => style.remove())

		const create = page.getByRole('button', { name: 'Create' })
		await create.hover()
		await expect.poll(() => tooltip().matches(':popover-open'), { timeout: 3000 }).toBe(true)

		await create.click()
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		/*
		 * The menu's `auto` popover closes the tooltip's `hint` popover, and it has to stay closed.
		 * It came back when the trigger's icon could be a hit target: swapping the icon on open
		 * moved the pointer onto a different element, and the trigger gained interest again on the
		 * way.
		 */
		let reopened = false
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 25))
			if (tooltip().matches(':popover-open')) reopened = true
		}
		expect(reopened).toBe(false)
	})

	test('the trigger morphs straight to square, without the press morph fighting it', async () => {
		await render(Harness, { open: false })

		trigger().click()

		await expect.poll(() => trigger().classList.contains('square')).toBe(true)
		// The pressed radius is the shape the trigger is not, so holding it through the change
		// would cancel the change out until the press timer ran down.
		expect(trigger().classList.contains('pressed')).toBe(false)
	})

	test('a closed menu is not displayed, so it cannot swallow clicks on the page', async () => {
		await render(Harness, { open: false })

		// Setting `display` on the base rule would beat the user agent's `display: none` and leave
		// an invisible sheet over the page.
		expect(getComputedStyle(list()).display).toBe('none')
	})

	test('items animate in rather than appearing, and each starts after the last', async () => {
		const { rerender } = await render(Harness, { open: false })

		await rerender({ open: true })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		const styles = entries().map((e) => getComputedStyle(e))
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			// The rise is decoration, so it is gated. The items still have to be usable.
			expect(styles.every((s) => Number(s.opacity) === 1)).toBe(true)
			return
		}
		// Keyframes, not a transition: a popover has no start value to transition from, so a
		// transition would leave the items simply appearing.
		expect(styles[0].animationName).toContain('np-fab-menu-item-in')
		const delays = styles.map((s) => Number.parseFloat(s.animationDelay))
		expect(delays[1]).toBeGreaterThan(delays[0])
		expect(delays[2]).toBeGreaterThan(delays[1])
	})

	test('each menu anchors to its own trigger, not to the last one on the page', async () => {
		await render(PairHarness, { open: true })
		const menus = [...document.querySelectorAll<HTMLElement>('.np-fab-menu')]
		const lists = [...document.querySelectorAll<HTMLElement>('.np-fab-menu-list')]
		await expect.poll(() => lists[0].matches(':popover-open')).toBe(true)

		// A fixed `anchor-name` in the stylesheet is shared, and a duplicated anchor name resolves
		// to the last one in tree order, so both menus opened on the second trigger.
		expect(menus[0].getBoundingClientRect().x).not.toBe(menus[1].getBoundingClientRect().x)
		expect(Math.round(lists[0].getBoundingClientRect().x)).toBe(
			Math.round(menus[0].getBoundingClientRect().x),
		)
	})

	test('a consumer style survives the anchor name the menu sets', async () => {
		await render(PairHarness)
		const second = document.querySelectorAll<HTMLElement>('.np-fab-menu')[1]
		const item = second.querySelector<HTMLElement>('.np-button')!

		expect(getComputedStyle(second).getPropertyValue('anchor-name')).toContain('--np-fab-menu-')
		// The tonal token the consumer set has to still reach the items.
		expect(getComputedStyle(item).backgroundColor).toBe('rgb(232, 175, 254)')
	})

	test('picking an action closes the menu', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		// Clicked directly rather than through the page, so the assertion is about the handler and
		// not about where the menu happens to land in the test viewport.
		entries()[0].click()

		await expect.poll(() => list().matches(':popover-open')).toBe(false)
		await expect.poll(() => trigger().getAttribute('aria-expanded')).toBe('false')
	})

	/*
	 * Closing the menu means `display: none` on the popover, so closing on the same click would
	 * cut the item's own corner morph off before a frame of it is seen. The close waits for it,
	 * except under reduced motion where there is no morph to wait for. Note the test browser runs
	 * with `prefers-reduced-motion: reduce`, so the hold itself is only asserted where a browser
	 * says otherwise.
	 */
	test('the item stays displayed for its own press animation, unless motion is reduced', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		entries()[0].click()
		// Read on the next tick rather than by polling: the hold is brief enough that a poll could
		// well first look after it has already elapsed.
		await tick()

		// The press class is set either way, it is only the hold that is conditional.
		expect(entries()[0].classList.contains('pressed')).toBe(true)
		expect(list().matches(':popover-open')).toBe(
			!matchMedia('(prefers-reduced-motion: reduce)').matches,
		)

		await expect.poll(() => list().matches(':popover-open')).toBe(false)
	})

	test('the menu is one tab stop, with the arrows moving between actions', async () => {
		await render(Harness, { open: true })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		expect(list().getAttribute('role')).toBe('menu')
		await expect.poll(() => entries().filter((e) => e.tabIndex === 0).length).toBe(1)
	})

	test('placement decides which side the items fan out to', async () => {
		const { rerender } = await render(Harness, { open: true, placement: 'block-start' })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)
		const above = list().getBoundingClientRect().top < trigger().getBoundingClientRect().top

		await rerender({ open: true, placement: 'block-end' })
		await expect.poll(() => list().matches(':popover-open')).toBe(true)

		expect(above).toBe(true)
		expect(list().getBoundingClientRect().top).toBeGreaterThan(
			trigger().getBoundingClientRect().top,
		)
	})
})
