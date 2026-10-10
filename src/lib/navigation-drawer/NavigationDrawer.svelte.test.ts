import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './NavigationDrawerHarness.test.svelte'

const dialog = () => document.querySelector<HTMLDialogElement>('dialog')!
const nav = () => document.querySelector<HTMLElement>('.np-navigation-drawer-container')!

describe('NavigationDrawer', async () => {
	test('is 360px wide', async () => {
		await render(Harness)

		expect(nav().getBoundingClientRect().width).toBe(360)
	})

	test('a modal drawer dims the page with a scrim by default', async () => {
		await render(Harness, { modal: true, open: true })
		await expect.poll(() => dialog().open).toBe(true)

		expect(getComputedStyle(dialog(), '::backdrop').backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
	})

	test('backdrop={false} leaves the page undimmed', async () => {
		await render(Harness, { modal: true, open: true, backdrop: false })
		await expect.poll(() => dialog().open).toBe(true)

		expect(getComputedStyle(dialog(), '::backdrop').backgroundColor).toBe('rgba(0, 0, 0, 0)')
	})

	test('opening moves focus to the first destination', async () => {
		await render(Harness, { modal: true, open: true })

		await expect.element(page.getByRole('button', { name: 'Inbox' })).toHaveFocus()
	})

	test('picking a destination leaves a modal drawer open, closing is up to the app', async () => {
		await render(Harness, { modal: true, open: true })
		await expect.poll(() => dialog().open).toBe(true)

		await page.getByRole('button', { name: 'Sent' }).click()

		expect(dialog().open).toBe(true)
	})

	test('Escape closes a modal drawer and reports it through open', async () => {
		let open: boolean | undefined = true
		await render(Harness, {
			modal: true,
			get open() {
				return open
			},
			set open(value) {
				open = value
			},
		})
		await expect.poll(() => dialog().open).toBe(true)

		await userEvent.keyboard('{Escape}')

		await expect.poll(() => dialog().open).toBe(false)
		expect(open).toBe(false)
	})

	test('a standard drawer without open is always there', async () => {
		await render(Harness)

		expect(getComputedStyle(nav()).visibility).toBe('visible')
	})

	test('open={false} dismisses a standard drawer and gives its width back', async () => {
		const { rerender } = await render(Harness, { open: true })
		const content = document.querySelector('[data-testid="content"]')!

		await rerender({ open: false })

		expect(nav().getBoundingClientRect().width).toBe(0)
		expect(getComputedStyle(nav()).visibility).toBe('hidden')
		expect(content.getBoundingClientRect().left).toBe(nav().getBoundingClientRect().left)
	})

	test('the headline names the navigation', async () => {
		await render(Harness, { headline: 'Mail' })

		await expect.element(page.getByRole('navigation', { name: 'Mail' })).toBeVisible()
	})

	test('a section is a group named by its label', async () => {
		await render(Harness)

		const group = page.getByRole('group', { name: 'Labels' })
		await expect.element(group).toBeVisible()
		await expect.element(group.getByRole('button', { name: 'Work' })).toBeVisible()
	})
})
