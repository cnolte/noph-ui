import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './SearchHarness.test.svelte'

const root = () => document.querySelector<HTMLElement>('.np-search')!
const container = () => document.querySelector<HTMLElement>('.np-search-container')!
const bar = () => document.querySelector<HTMLElement>('.np-search-bar')!
const input = () => document.querySelector<HTMLInputElement>('.np-search-input')!
const results = () => document.querySelector<HTMLElement>('.np-search-results')!
const clear = () => page.getByRole('button', { name: 'Clear search' })
const px = (value: string) => Number.parseFloat(value)

describe('Search', async () => {
	test('is a search field with hinted text and a leading search icon', async () => {
		await render(Harness)

		expect(input().type).toBe('search')
		expect(input().placeholder).toBe('Search product')
		expect(document.querySelector('.np-search-leading-icon svg')).not.toBeNull()
	})

	test('the results carry no role of their own, and neither does the field', async () => {
		await render(Harness)

		expect(results().getAttribute('role')).toBeNull()
		expect(input().getAttribute('role')).toBeNull()
		expect(input().getAttribute('aria-expanded')).toBeNull()
		expect(input().getAttribute('aria-controls')).toBe(results().id)
	})

	test('results that say they are a listbox make the field a combobox', async () => {
		await render(Harness, { resultsRole: 'listbox' })

		expect(results().getAttribute('role')).toBe('listbox')
		expect(input().getAttribute('role')).toBe('combobox')
		expect(input().getAttribute('aria-expanded')).toBe('false')

		input().focus()

		await expect.poll(() => input().getAttribute('aria-expanded')).toBe('true')
	})

	test('results are out of the layout until it expands', async () => {
		const { rerender } = await render(Harness, { expanded: false })
		expect(getComputedStyle(results()).display).toBe('none')

		await rerender({ expanded: true })

		await expect.poll(() => getComputedStyle(results()).display).not.toBe('none')
	})

	test('focusing opens it', async () => {
		await render(Harness)

		input().focus()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)
	})

	test('a clear button appears only with a query, and empties it', async () => {
		const { rerender } = await render(Harness, { value: '' })
		expect(document.querySelector('[title="Clear search"]')).toBeNull()

		await rerender({ value: 'tacos' })
		await clear().click()

		await expect.poll(() => input().value).toBe('')
	})

	test('Enter reports the query', async () => {
		await render(Harness, { value: 'tacos' })
		const searched = () => document.querySelector('[data-testid="searched"]')!.textContent

		input().focus()
		input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

		await expect.poll(searched).toBe('tacos')
	})

	test('Escape closes it', async () => {
		await render(Harness, { expanded: true })

		input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(false)
	})

	test('the focus ring is for the keyboard, not for a click or a touch', async () => {
		await render(Harness)

		input().focus()
		await expect.poll(() => bar().classList.contains('np-search-focus-ring')).toBe(true)

		input().blur()
		input().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
		input().focus()

		await expect.poll(() => bar().classList.contains('np-search-focus-ring')).toBe(false)
	})

	test('clearing with the mouse does not raise the ring on the way back', async () => {
		await render(Harness, { value: 'tacos' })

		await clear().click()

		await expect.poll(() => input().value).toBe('')
		expect(document.activeElement).toBe(input())
		expect(bar().classList.contains('np-search-focus-ring')).toBe(false)
	})

	test('the docked view floats over the page rather than pushing it down', async () => {
		const { rerender } = await render(Harness, { expanded: false })
		expect(px(getComputedStyle(root()).height)).toBe(56)

		await rerender({ expanded: true })

		await expect.poll(() => getComputedStyle(container()).position).toBe('absolute')
		expect(px(getComputedStyle(root()).height)).toBe(56)
		expect(results().getBoundingClientRect().height).toBeGreaterThan(0)
	})

	test('a docked view never outgrows a narrow host', async () => {
		await render(Harness, { expanded: true, width: '20rem' })

		const host = root().getBoundingClientRect()
		const floating = container().getBoundingClientRect()

		expect(floating.left).toBeGreaterThanOrEqual(host.left)
		expect(floating.right).toBeLessThanOrEqual(host.right)
	})

	test('focus leaving closes it', async () => {
		await render(Harness)
		const outside = document.createElement('button')
		document.body.append(outside)

		input().focus()
		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)

		outside.focus()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(false)
		outside.remove()
	})

	test('a tap on a result keeps it open long enough for the click, the way iOS blurs first', async () => {
		await render(Harness, { expanded: true })
		const result = document.querySelector<HTMLElement>('.np-search-results button')!
		let clicked = false
		result.addEventListener('click', () => (clicked = true))

		input().focus()
		result.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
		input().blur()

		expect(root().classList.contains('np-search-expanded')).toBe(true)
		result.click()
		expect(clicked).toBe(true)
	})

	test('a tap outside still closes it once the field is blurred', async () => {
		await render(Harness, { expanded: true })

		input().focus()
		document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
		input().blur()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(false)
	})

	test('focus moving into the results keeps it open', async () => {
		await render(Harness, { expanded: true })

		input().focus()
		document.querySelector<HTMLElement>('.np-search-results button')!.focus()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)
	})

	test('contained keeps the pill while expanded; divided squares it off', async () => {
		const { rerender } = await render(Harness, { expanded: true, variant: 'contained' })
		const contained = px(getComputedStyle(bar()).borderTopLeftRadius)
		expect(contained).toBeGreaterThan(0)

		await rerender({ expanded: true, variant: 'divided' })

		await expect.poll(() => px(getComputedStyle(bar()).borderTopLeftRadius)).toBe(0)
		expect(px(getComputedStyle(bar()).borderBottomWidth)).toBeGreaterThan(0)
	})

	test('contained docks the results as their own 12dp pane', async () => {
		await render(Harness, { expanded: true, variant: 'contained' })

		expect(px(getComputedStyle(results()).borderTopLeftRadius)).toBe(12)
		expect(px(getComputedStyle(container()).rowGap)).toBe(2)
	})

	test('divided folds the field and the results into one 28dp container', async () => {
		await render(Harness, { expanded: true, variant: 'divided' })

		await expect.poll(() => px(getComputedStyle(container()).borderTopLeftRadius)).toBe(28)
		expect(px(getComputedStyle(results()).borderTopLeftRadius)).toBe(0)
	})

	test('opening a contained view shrinks the pane margins from 24dp to 12dp', async () => {
		const { rerender } = await render(Harness, { expanded: false, variant: 'contained' })
		expect(px(getComputedStyle(container()).insetInlineStart)).toBe(24)

		await rerender({ expanded: true, variant: 'contained' })

		await expect.poll(() => px(getComputedStyle(container()).insetInlineStart)).toBe(12)
	})

	test('full screen takes over the viewport once expanded', async () => {
		const { rerender } = await render(Harness, { expanded: false, view: 'full-screen' })
		expect(getComputedStyle(root()).position).not.toBe('fixed')

		await rerender({ expanded: true, view: 'full-screen' })

		await expect.poll(() => getComputedStyle(root()).position).toBe('fixed')
	})

	test('a trigger outside the bar opens the view and puts the caret in the field', async () => {
		await render(Harness)

		await page.getByRole('button', { name: 'Trigger open' }).click()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)
		await expect.poll(() => document.activeElement).toBe(input())
	})

	test('a trigger reaches the field even when the host is hidden until it opens', async () => {
		await render(Harness, { hiddenAtRest: true })

		await page.getByRole('button', { name: 'Trigger open' }).click()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)
		expect(document.activeElement).toBe(input())
	})

	test('a trigger outside the bar closes the view and lets the field go', async () => {
		await render(Harness)
		await page.getByRole('button', { name: 'Trigger open' }).click()
		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(true)

		await page.getByRole('button', { name: 'Trigger close' }).click()

		await expect.poll(() => root().classList.contains('np-search-expanded')).toBe(false)
		await expect.poll(() => document.activeElement).not.toBe(input())
	})

	test('a trigger leaves no focus ring behind, the way a click on the bar does not', async () => {
		await render(Harness)

		await page.getByRole('button', { name: 'Trigger open' }).click()

		await expect.poll(() => bar().classList.contains('np-search-focus-ring')).toBe(false)
	})

	test('only the divided full screen header grows to 72dp', async () => {
		const { rerender } = await render(Harness, {
			expanded: true,
			view: 'full-screen',
			variant: 'contained',
		})
		await expect.poll(() => px(getComputedStyle(bar()).height)).toBe(56)

		await rerender({ expanded: true, view: 'full-screen', variant: 'divided' })

		await expect.poll(() => px(getComputedStyle(bar()).height)).toBe(72)
	})
})
