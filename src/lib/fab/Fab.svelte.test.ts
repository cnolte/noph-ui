import { tick } from 'svelte'
import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import ExtendedFab from './ExtendedFab.svelte'
import Fab from './Fab.svelte'
import Harness from './FabHarness.test.svelte'

const root = () => document.querySelector<HTMLElement>('.np-fab, .np-extended-fab')!
const at = (id: string) => document.querySelector<HTMLElement>(`[data-testid="${id}"]`)!
const box = (id: string) => at(id).getBoundingClientRect()
/**
 * Resolves the corner radius to pixels whichever form the CSS uses. `border-radius` percentages
 * are not resolved by `getComputedStyle`, so a raw string comparison would silently compare a
 * percentage against a length.
 */
const cornerPx = (id: string) => {
	const declared = getComputedStyle(at(id)).borderTopLeftRadius
	const value = Number.parseFloat(declared)
	return declared.endsWith('%') ? (value / 100) * box(id).width : value
}

describe('Fab', async () => {
	test('renders a button by default and a link with href', async () => {
		await render(Fab, { label: 'Add' })
		expect(document.querySelector('button.np-fab')).not.toBeNull()
		expect(document.querySelector('a.np-fab')).toBeNull()
	})

	test('renders a link when given an href', async () => {
		await render(Fab, { label: 'Add', href: '/new' })
		expect(document.querySelector('a.np-fab')).not.toBeNull()
		expect(document.querySelector('button.np-fab')).toBeNull()
	})

	test('a disabled fab with an href stays a button, so it is not followable', async () => {
		await render(Fab, { label: 'Add', href: '/new', disabled: true })
		expect(document.querySelector('button.np-fab')).not.toBeNull()
		expect(document.querySelector('a.np-fab')).toBeNull()
	})

	test('names itself from label, since it shows no text', async () => {
		await render(Fab, { label: 'Add item' })
		expect(root().getAttribute('aria-label')).toBe('Add item')
	})

	test('defaults to type="button", so it cannot submit a form by accident', async () => {
		await render(Fab, { label: 'Add' })
		expect(root().getAttribute('type')).toBe('button')
	})

	test('keeps an explicit type', async () => {
		await render(Fab, { label: 'Save', type: 'submit' })
		expect(root().getAttribute('type')).toBe('submit')
	})

	test('matches the M3 sizes: 56, 80 and 96 device-independent pixels', async () => {
		await render(Harness)

		expect(box('s').width).toBe(56)
		expect(box('m').width).toBe(80)
		expect(box('l').width).toBe(96)
		// Square aspect: a FAB is as tall as it is wide.
		expect(box('m').height).toBe(80)
		// M3's baseline FAB is the 56 pixel one, so that is the default rather than the middle size.
		expect(box('default').width).toBe(56)
	})

	test('the icon scales with the size, 24, 28 and 36 pixels', async () => {
		await render(Harness)

		const iconPx = (id: string) =>
			Number.parseFloat(getComputedStyle(at(id)).getPropertyValue('--np-icon-size')) * 16
		expect(iconPx('s')).toBe(24)
		expect(iconPx('m')).toBe(28)
		expect(iconPx('l')).toBe(36)
	})

	test('tone and container color styles map to their own tokens', async () => {
		await render(Harness)

		// Resolved through a probe rather than hardcoded, so the theme stays free to change.
		const resolve = (token: string) => {
			const probe = document.createElement('div')
			probe.style.color = `var(${token})`
			document.body.append(probe)
			const value = getComputedStyle(probe).color
			probe.remove()
			return value
		}

		expect(getComputedStyle(at('tone')).backgroundColor).toBe(resolve('--np-color-primary'))
		expect(getComputedStyle(at('container')).backgroundColor).toBe(
			resolve('--np-color-primary-container'),
		)
		// The softer pair stays the default look, so `primary` naming the tone is not a silent swap.
		expect(getComputedStyle(at('default')).backgroundColor).toBe(
			resolve('--np-color-primary-container'),
		)
	})

	test('a click holds a pressed class, so the corner morph outlasts the pointer lift', async () => {
		await render(Fab, { label: 'Add' })

		root().click()
		await tick()
		expect(root().classList.contains('pressed')).toBe(true)

		await expect.poll(() => root().classList.contains('pressed'), { timeout: 400 }).toBe(false)
	})

	test('a click still reaches the handler', async () => {
		let clicked = 0
		await render(Fab, { label: 'Add', onclick: () => (clicked += 1) })

		await page.getByRole('button', { name: 'Add' }).click()

		expect(clicked).toBe(1)
	})

	test('round is fully rounded, square is a smaller radius, matching Button', async () => {
		await render(Harness)

		const half = box('round').width / 2

		// Round covers at least half the box, so it renders as a circle; square is tighter.
		expect(cornerPx('round')).toBeGreaterThanOrEqual(half)
		expect(cornerPx('square')).toBeLessThan(half)
	})
})

describe('ExtendedFab', async () => {
	test('shows its label as text, so it needs no aria-label', async () => {
		await render(ExtendedFab, { label: 'Compose' })
		expect(root().textContent).toContain('Compose')
		expect(root().hasAttribute('aria-label')).toBe(false)
	})

	test('collapsed hides the text, so the label moves to aria-label', async () => {
		await render(ExtendedFab, { label: 'Compose', collapsed: true })
		expect(root().getAttribute('aria-label')).toBe('Compose')
	})

	test('collapsed is narrower than expanded, and square', async () => {
		await render(Harness)

		expect(box('collapsed').width).toBeLessThan(box('expanded').width)
		// Collapsed is the icon-only FAB, so it is as wide as it is tall.
		expect(box('collapsed').width).toBe(box('collapsed').height)
	})

	test('the collapse is a CSS width transition, not a measured pixel value', async () => {
		await render(ExtendedFab, { label: 'Compose' })
		const style = getComputedStyle(root())

		expect(style.getPropertyValue('interpolate-size')).toBe('allow-keywords')
		expect(root().style.width).toBe('')
	})

	test('a click reaches the handler', async () => {
		let clicked = 0
		await render(ExtendedFab, { label: 'Compose', onclick: () => (clicked += 1) })

		await page.getByRole('button', { name: 'Compose' }).click()

		expect(clicked).toBe(1)
	})

	test('a click holds a pressed class, so the corner morph outlasts the pointer lift', async () => {
		await render(ExtendedFab, { label: 'Compose' })

		root().click()
		await tick()
		expect(root().classList.contains('pressed')).toBe(true)

		await expect.poll(() => root().classList.contains('pressed'), { timeout: 400 }).toBe(false)
	})
})
