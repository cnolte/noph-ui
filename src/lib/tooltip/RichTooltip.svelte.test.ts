import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './RichTooltipHarness.test.svelte'

const byId = (id: string) => document.getElementById(id)!
const isOpen = (el: HTMLElement) => el.matches(':popover-open')
const hover = (el: HTMLElement) => page.elementLocator(el).hover()
const click = (el: HTMLElement) => page.elementLocator(el).click()
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const settled = (el: HTMLElement) => Promise.all(el.getAnimations().map((a) => a.finished))

const parts = () => ({ anchor: byId('rich-anchor'), tooltip: byId('rich-tip') })

describe('opening and dismissing', async () => {
	test('a click opens it below the control and keeps it open', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await settled(tooltip)

		const a = anchor.getBoundingClientRect()
		const t = tooltip.getBoundingClientRect()
		expect(t.top).toBeGreaterThanOrEqual(a.bottom)
		expect(t.top - a.bottom).toBeLessThan(16)
		expect(Math.abs((t.left + t.right) / 2 - (a.left + a.right) / 2)).toBeLessThan(2)

		await click(anchor)
		await wait(200)
		expect(isOpen(tooltip)).toBe(true)
	})

	test('the keyboard opens it the way a click does, and focus alone does not', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(byId('away'))
		await userEvent.tab()
		expect(document.activeElement).toBe(anchor)
		await wait(600)
		expect(isOpen(tooltip)).toBe(false)

		await userEvent.keyboard('{Enter}')
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
	})

	test('hovering the control is not a trigger', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await hover(anchor)
		await wait(800)
		expect(isOpen(tooltip)).toBe(false)
	})

	test('once open it stays when the pointer leaves the control', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)

		await hover(byId('away'))
		await wait(800)
		expect(isOpen(tooltip)).toBe(true)
	})

	test('setting open opens it, anchored to the control all the same', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(byId('open-it'))
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await settled(tooltip)

		const a = anchor.getBoundingClientRect()
		const t = tooltip.getBoundingClientRect()
		expect(t.top).toBeGreaterThanOrEqual(a.bottom)
		expect(Math.abs((t.left + t.right) / 2 - (a.left + a.right) / 2)).toBeLessThan(2)
	})

	test('a control that renders after the tooltip still anchors a scripted open', async () => {
		await render(Harness)
		const tooltip = byId('late-tip')

		await click(byId('open-late'))
		const anchor = byId('late-anchor')
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await settled(tooltip)

		const a = anchor.getBoundingClientRect()
		const t = tooltip.getBoundingClientRect()
		expect(t.top).toBeGreaterThanOrEqual(a.bottom)
		expect(Math.abs((t.left + t.right) / 2 - (a.left + a.right) / 2)).toBeLessThan(2)
	})

	test('escape dismisses it, and so does a click outside', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await userEvent.keyboard('{Escape}')
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(false)

		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await click(byId('away'))
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(false)
	})

	test('open reflects the state it is in', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		expect(byId('open-state').textContent).toBe('false')
		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		await expect.poll(() => byId('open-state').textContent, { timeout: 400 }).toBe('true')
		await userEvent.keyboard('{Escape}')
		await expect.poll(() => byId('open-state').textContent, { timeout: 400 }).toBe('false')
	})
})

describe('content and semantics', async () => {
	test('carries the tooltip role, its subhead and an action', async () => {
		await render(Harness)
		const { tooltip } = parts()

		expect(tooltip.getAttribute('role')).toBe('tooltip')
		expect(tooltip.getAttribute('popover')).toBe('auto')
		expect(tooltip.hasAttribute('aria-labelledby')).toBe(false)
		expect(tooltip.textContent).toContain('Rich tooltip')
		expect(tooltip.contains(byId('rich-action'))).toBe(true)
	})

	test('the keyboard reaches the action inside it', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		await click(anchor)
		await expect.poll(() => isOpen(tooltip), { timeout: 400 }).toBe(true)
		anchor.focus()
		await userEvent.tab()

		expect(tooltip.contains(document.activeElement)).toBe(true)
	})

	test('needs no JavaScript: a copy of the markup with no listeners still opens', async () => {
		await render(Harness)
		const { anchor, tooltip } = parts()

		const control = anchor.cloneNode(true) as HTMLElement
		const panel = tooltip.cloneNode(true) as HTMLElement
		control.id = 'copied-anchor'
		panel.id = 'copied-tip'
		control.removeAttribute('command')
		control.removeAttribute('commandfor')
		control.setAttribute('popovertarget', panel.id)
		control.setAttribute('popovertargetaction', 'show')
		const room = document.createElement('div')
		room.style.padding = '2rem 20rem'
		room.append(control, panel)
		document.body.prepend(room)

		await click(control)
		await expect.poll(() => isOpen(panel), { timeout: 400 }).toBe(true)
		const a = control.getBoundingClientRect()
		const t = panel.getBoundingClientRect()
		expect(t.top).toBeGreaterThanOrEqual(a.bottom)
		expect(Math.abs((t.left + t.right) / 2 - (a.left + a.right) / 2)).toBeLessThan(2)
	})
})
