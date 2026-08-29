import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './AppBarHarness.test.svelte'
import AppBar from './AppBar.svelte'

const bar = () => document.querySelector<HTMLElement>('.np-app-bar')!
const secondRow = () => document.querySelector<HTMLElement>('.np-app-bar-second-row')
const inlineTitles = () => document.querySelector<HTMLElement>('.np-app-bar-inline')
/** Excludes the collapsed copy, which only exists for the crossfade. */
const headlines = () => [
	...document.querySelectorAll<HTMLElement>(
		'.np-app-bar-headline:not(.np-app-bar-inline .np-app-bar-headline)',
	),
]

const subtitles = () => [...document.querySelectorAll<HTMLElement>('.np-app-bar-subtitle')]

describe('AppBar', async () => {
	test('renders a header that sticks to the top', async () => {
		await render(AppBar, { headline: 'Inbox' })

		expect(bar().tagName).toBe('HEADER')
		expect(getComputedStyle(bar()).position).toBe('sticky')
	})

	test('a one-row variant puts the headline in the action row', async () => {
		await render(Harness, { variant: 'small' })

		expect(secondRow()).toBeNull()
		expect(headlines()).toHaveLength(1)
		expect(Math.round(bar().getBoundingClientRect().height)).toBe(64)
	})

	test('the search variant carries a field instead of a headline', async () => {
		await render(Harness, { variant: 'search' })

		expect(document.querySelector('.np-app-bar-search-field .np-search')).not.toBeNull()
		// A search app bar shows no headline, so none is rendered to be announced.
		expect(headlines()).toHaveLength(0)
	})

	test('the search field fills the row between the leading and trailing actions', async () => {
		await render(Harness, { variant: 'search' })

		const field = document.querySelector<HTMLElement>('.np-app-bar-search-field')!
		const row = document.querySelector<HTMLElement>('.np-app-bar-row')!
		expect(getComputedStyle(field).flexGrow).toBe('1')
		expect(field.getBoundingClientRect().width).toBeGreaterThan(
			row.getBoundingClientRect().width / 2,
		)
	})

	test('medium and large add a second row and are taller', async () => {
		await render(Harness, { variant: 'medium' })
		const medium = bar().getBoundingClientRect().height
		expect(secondRow()).not.toBeNull()
		expect(Math.round(medium)).toBe(112)
	})

	test('large is taller than medium', async () => {
		await render(Harness, { variant: 'large' })
		expect(Math.round(bar().getBoundingClientRect().height)).toBe(152)
	})

	test('the headline is announced once, even though it is rendered twice', async () => {
		await render(Harness, { variant: 'large' })

		// The collapsed copy exists for the crossfade but is hidden from assistive technology.
		expect(inlineTitles()!.getAttribute('aria-hidden')).toBe('true')
		const announced = [...document.querySelectorAll('*')].filter(
			(el) => el.textContent === 'Inbox' && el.closest('[aria-hidden="true"]') === null,
		)
		expect(announced.length).toBeGreaterThan(0)
		expect(headlines()).toHaveLength(1)
	})

	test('the collapsed headline starts hidden', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		expect(getComputedStyle(inlineTitles()!).opacity).toBe('0')
	})

	test('collapsing is driven by a scroll timeline, not a scroll listener', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		const style = getComputedStyle(secondRow()!)
		expect(style.animationTimeline).toContain('scroll')
		// Svelte scopes keyframe names, so the declared name carries a hash prefix.
		expect(style.animationName).toContain('np-app-bar-collapse')
	})

	test('a one-row bar has nothing to collapse, so it declares no animation', async () => {
		await render(Harness, { variant: 'small', collapsible: true, scrollable: true })

		expect(bar().classList.contains('np-app-bar-collapsible')).toBe(false)
	})

	test('collapsible without scroll support leaves the bar expanded', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		// The second row keeps its height until the scroll timeline advances it.
		expect(Math.round(secondRow()!.getBoundingClientRect().height)).toBe(88)
	})

	test('a subtitle sits under the headline and is not rendered when absent', async () => {
		await render(Harness, { variant: 'small' })
		expect(subtitles()).toHaveLength(0)

		await render(Harness, { variant: 'small', subtitle: 'Subtitle' })
		const headline = headlines()[0].getBoundingClientRect()
		const sub = subtitles()[0].getBoundingClientRect()
		expect(sub.top).toBeGreaterThanOrEqual(headline.bottom - 1)
	})

	test('a two-row bar grows to fit a subtitle rather than clipping the headline', async () => {
		await render(Harness, { variant: 'medium', subtitle: 'Subtitle' })

		const headline = headlines()[0]
		const row = document.querySelector<HTMLElement>('.np-app-bar-second-row')!
		// Fully inside the row it sits in, so nothing is cut off by the row's `overflow: hidden`.
		expect(headline.getBoundingClientRect().top).toBeGreaterThanOrEqual(
			row.getBoundingClientRect().top - 1,
		)
		expect(bar().getBoundingClientRect().height).toBeGreaterThan(112)
	})

	test('a collapsible bar turns off scroll anchoring on the scroller', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		// Without this the shrinking bar and the browser's scroll compensation fight to a
		// standstill and the bar never collapses at all.
		expect(getComputedStyle(document.documentElement).overflowAnchor).toBe('none')
	})

	test('a bar that does not collapse leaves scroll anchoring alone', async () => {
		await render(Harness, { variant: 'large', scrollable: true })

		expect(getComputedStyle(document.documentElement).overflowAnchor).not.toBe('none')
	})
})
