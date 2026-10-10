import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import NavigationRail from './NavigationRail.svelte'
import Harness from './NavigationRailHarness.test.svelte'

const rail = () => document.querySelector<HTMLElement>('nav')!

describe('NavigationRail', async () => {
	test('renders no "undefined" class when none is passed', async () => {
		await render(NavigationRail)

		expect(rail().className).not.toContain('undefined')
		expect(rail().classList.contains('np-navigation-rail')).toBe(true)
	})

	test('keeps a consumer class alongside its own', async () => {
		await render(NavigationRail, { class: 'mine' })

		expect(rail().classList.contains('np-navigation-rail')).toBe(true)
		expect(rail().classList.contains('mine')).toBe(true)
		expect(rail().className).not.toContain('undefined')
	})
})

describe('NavigationRail layout', async () => {
	const box = (el: Element) => {
		const nav = rail().getBoundingClientRect()
		const r = el.getBoundingClientRect()
		return { left: r.left - nav.left, top: r.top - nav.top, width: r.width, height: r.height }
	}
	const items = () => [...rail().querySelectorAll('.np-navigation-action')]
	const indicators = () => [...rail().querySelectorAll('.np-navigation-action-indicator')]

	test('collapsed: 96px wide, menu icon 36px in, items 64px tall and 4px apart', async () => {
		await render(Harness)

		expect(rail().getBoundingClientRect().width).toBe(96)
		const menuIcon = box(rail().querySelector('.np-navigation-rail-menu svg')!)
		expect(menuIcon.left).toBe(36)
		expect(menuIcon.top + menuIcon.height / 2).toBe(72)
		expect(box(items()[0]).top).toBe(140)
		expect(box(items()[0]).height).toBe(64)
		expect(box(items()[1]).top - box(items()[0]).top).toBe(68)
		expect(box(indicators()[0])).toMatchObject({ left: 20, width: 56, height: 32 })
	})

	test('a FAB sits 4px below the menu and 40px above the destinations', async () => {
		await render(Harness, { withFab: true })

		const fab = box(rail().querySelector('.np-fab')!)
		expect(fab).toMatchObject({ left: 20, top: 104, height: 56 })
		expect(box(items()[0]).top).toBe(200)
	})

	test('the menu button is named without a tooltip popping up on focus', async () => {
		await render(Harness)

		const menu = page.getByRole('button', { name: 'Menu' })
		await expect.element(menu).toBeVisible()
		expect(menu.element().getAttribute('interestfor')).toBeNull()
		expect(rail().parentElement!.querySelector('[role="tooltip"]')).toBeNull()
	})

	test('the menu button toggles the expanded rail', async () => {
		await render(Harness)
		const menu = page.getByRole('button', { name: 'Menu' })
		await expect.element(menu).toHaveAttribute('aria-expanded', 'false')

		await menu.click()

		await expect.element(menu).toHaveAttribute('aria-expanded', 'true')
		await expect.poll(() => rail().getBoundingClientRect().width).toBeGreaterThanOrEqual(220)
	})

	test('expanded: items are 56px tall and the indicator hugs icon and label', async () => {
		await render(Harness, { expanded: true })

		expect(rail().getBoundingClientRect().width).toBeGreaterThanOrEqual(220)
		expect(box(items()[0]).height).toBe(56)
		expect(box(items()[0]).width).toBe(rail().getBoundingClientRect().width)
		const indicator = box(indicators()[0])
		expect(indicator).toMatchObject({ left: 20, height: 56 })
		const icon = box(items()[0].querySelector('.np-navigation-action-icon')!)
		expect(icon.left).toBe(36)
		const label = items()[0].querySelector('.np-label-beside')!.getBoundingClientRect()
		expect(label.top).toBeLessThan(items()[0].getBoundingClientRect().bottom)
		expect(indicator.left + indicator.width).toBeLessThan(rail().getBoundingClientRect().width)
	})

	test('the badge stays on the icon when the rail expands', async () => {
		const { rerender } = await render(Harness)
		const offset = () => {
			const icon = items()[1].querySelector('.np-navigation-action-icon')!.getBoundingClientRect()
			const badge = items()[1].querySelector('.np-badge-container')!.getBoundingClientRect()
			return [badge.left - icon.left, badge.top - icon.top]
		}
		const collapsed = offset()

		await rerender({ expanded: true })

		expect(items()[1].querySelectorAll('.np-badge-container')).toHaveLength(1)
		expect(offset()).toEqual(collapsed)
	})

	test('alignment="center" groups the destinations in the middle', async () => {
		await render(Harness, { alignment: 'center' })

		const first = items()[0].getBoundingClientRect()
		const last = items()[2].getBoundingClientRect()
		const nav = rail().getBoundingClientRect()
		const header = rail().querySelector('.np-navigation-rail-header')!.getBoundingClientRect()
		const above = first.top - (header.bottom + 40)
		const below = nav.bottom - 8 - last.bottom
		expect(Math.abs(above - below)).toBeLessThanOrEqual(1)
	})
})

describe('NavigationRail modal', async () => {
	const inline = () =>
		document.querySelector<HTMLElement>('nav.np-navigation-rail:not(.np-navigation-rail-modal)')!
	const dialog = () => document.querySelector<HTMLDialogElement>('dialog')!
	const modalRail = () => document.querySelector<HTMLElement>('.np-navigation-rail-modal')

	test('opens the expanded rail over the content and leaves the collapsed rail in place', async () => {
		await render(Harness, { modal: true })

		await page.getByRole('button', { name: 'Menu' }).click()

		await expect.poll(() => dialog().matches(':modal')).toBe(true)
		expect(inline().getBoundingClientRect().width).toBe(96)
		expect(inline().querySelector('.np-navigation-action')).toBeNull()
		expect(modalRail()!.querySelectorAll('.np-navigation-action')).toHaveLength(4)
		await expect.poll(() => modalRail()!.getBoundingClientRect().width).toBeGreaterThanOrEqual(220)
		expect(modalRail()!.getBoundingClientRect().left).toBe(0)
	})

	test('opens right over the collapsed rail, so it grows out of it', async () => {
		await render(Harness, { modal: true })
		const collapsed = inline().getBoundingClientRect()

		await page.getByRole('button', { name: 'Menu' }).click()

		await expect.poll(() => dialog().open).toBe(true)
		const open = modalRail()!.getBoundingClientRect()
		expect(open.left).toBe(collapsed.left)
		expect(open.top).toBe(collapsed.top)
		expect(open.height).toBe(collapsed.height)
	})

	test('hidden when collapsed, it opens from the window edge at full height', async () => {
		await render(Harness, { modal: true, hideWhenCollapsed: true, expanded: true })

		await expect.poll(() => dialog().open).toBe(true)
		const open = modalRail()!.getBoundingClientRect()
		expect(open.left).toBe(0)
		expect(open.top).toBe(0)
		expect(open.height).toBe(window.innerHeight)
	})

	test('moves focus into the modal rail', async () => {
		await render(Harness, { modal: true })

		await page.getByRole('button', { name: 'Menu' }).click()

		await expect.poll(() => modalRail()?.contains(document.activeElement)).toBe(true)
	})

	test('Escape closes it and the destinations return to the collapsed rail', async () => {
		await render(Harness, { modal: true, expanded: true })
		await expect.poll(() => dialog().open).toBe(true)

		await userEvent.keyboard('{Escape}')

		await expect.poll(() => dialog().open).toBe(false)
		expect(inline().querySelectorAll('.np-navigation-action')).toHaveLength(4)
		expect(page.getByRole('button', { name: 'Menu' }).element().getAttribute('aria-expanded')).toBe(
			'false',
		)
	})

	test('closing gives focus back to the menu button of the collapsed rail', async () => {
		await render(Harness, { modal: true })
		await page.getByRole('button', { name: 'Menu' }).click()
		await expect.poll(() => modalRail()?.contains(document.activeElement)).toBe(true)

		await userEvent.keyboard('{Escape}')

		await expect
			.poll(
				() =>
					document.activeElement?.closest('.np-navigation-rail-menu') !== null &&
					inline().contains(document.activeElement),
			)
			.toBe(true)
	})

	test('picking a destination leaves it open, closing is up to the app', async () => {
		await render(Harness, { modal: true, expanded: true })
		await expect.poll(() => dialog().open).toBe(true)

		await page.getByRole('button', { name: 'Mail', exact: true }).click()

		expect(dialog().open).toBe(true)
	})

	test('hideWhenCollapsed hides the collapsed rail and opens from expanded', async () => {
		const { rerender } = await render(Harness, { modal: true, hideWhenCollapsed: true })
		expect(getComputedStyle(inline()).display).toBe('none')

		await rerender({ modal: true, hideWhenCollapsed: true, expanded: true })

		await expect.poll(() => dialog().matches(':modal')).toBe(true)
		expect(getComputedStyle(inline()).display).toBe('none')
	})

	test('hideWhenCollapsed without modal shows the expanded rail in place', async () => {
		const { rerender } = await render(Harness, { hideWhenCollapsed: true })
		expect(getComputedStyle(inline()).display).toBe('none')

		await rerender({ hideWhenCollapsed: true, expanded: true })

		await expect.poll(() => getComputedStyle(inline()).display).toBe('flex')
		expect(inline().getBoundingClientRect().width).toBeGreaterThanOrEqual(220)
	})
})

describe('NavigationRail labels', async () => {
	test('the item is named by its label once, in either layout', async () => {
		const { rerender } = await render(Harness)
		await expect.element(page.getByRole('button', { name: 'Home', exact: true })).toBeVisible()

		await rerender({ expanded: true })

		await expect.element(page.getByRole('button', { name: 'Home', exact: true })).toBeVisible()
	})

	test('only the label of the current layout is visible', async () => {
		const { rerender } = await render(Harness)
		const visible = () =>
			[...document.querySelectorAll('.np-navigation-action')][0]
				.querySelectorAll('.np-navigation-action-label')
				.values()
				.filter((label) => getComputedStyle(label).visibility === 'visible')
				.map((label) => label.className)
				.toArray()
		expect(visible().join()).toContain('np-label-below')
		expect(visible()).toHaveLength(1)

		await rerender({ expanded: true })

		await expect.poll(() => visible().join()).toContain('np-label-beside')
		expect(visible()).toHaveLength(1)
	})
})

describe('NavigationRailSection', async () => {
	test('its secondary destinations show only in the expanded rail', async () => {
		const { rerender } = await render(Harness)
		await expect.element(page.getByRole('group', { name: 'Library' })).not.toBeInTheDocument()
		await expect.element(page.getByRole('button', { name: 'Saved' })).not.toBeInTheDocument()

		await rerender({ expanded: true })

		const group = page.getByRole('group', { name: 'Library' })
		await expect.element(group).toBeVisible()
		await expect.element(group.getByRole('button', { name: 'Saved' })).toBeVisible()
	})

	test('the header sits 20px below the last destination, its text in line with the icons', async () => {
		await render(Harness, { expanded: true })

		const label = document.querySelector('.np-navigation-rail-section-label')!
		const text = getComputedStyle(label)
		expect(text.paddingTop).toBe('20px')
		expect(text.paddingBottom).toBe('8px')
		expect(text.paddingLeft).toBe('36px')
	})

	test('the arrow keys skip destinations of a hidden section', async () => {
		await render(Harness)
		page.getByRole('button', { name: 'Settings' }).element().focus()

		await userEvent.keyboard('{ArrowDown}')

		await expect.element(page.getByRole('button', { name: 'Home' })).toHaveFocus()
	})
})
