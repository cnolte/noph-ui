import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './AppBarHarness.test.svelte'
import AppBar from './AppBar.svelte'

const bar = () => document.querySelector<HTMLElement>('.np-app-bar')!
const secondRow = () => document.querySelector<HTMLElement>('.np-app-bar-second-row')
const inlineTitles = () => document.querySelector<HTMLElement>('.np-app-bar-inline')
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
		expect(Math.round(bar().getBoundingClientRect().height)).toBe(120)
	})

	test('the headline is announced once, even though it is rendered twice', async () => {
		await render(Harness, { variant: 'large' })

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
		expect(style.animationName).toContain('np-app-bar-collapse')
	})

	test('a one-row bar has nothing to collapse, so it declares no animation', async () => {
		await render(Harness, { variant: 'small', collapsible: true, scrollable: true })

		expect(bar().classList.contains('np-app-bar-collapsible')).toBe(false)
	})

	test('collapsible without scroll support leaves the bar expanded', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		expect(Math.round(secondRow()!.getBoundingClientRect().height)).toBe(56)
	})

	test('the leading button is on surface, the trailing ones on surface variant', async () => {
		await render(Harness, { variant: 'small' })

		const color = (selector: string) =>
			getComputedStyle(document.querySelector(`${selector} .np-icon-button`)!).color
		expect(color('.np-app-bar-leading')).not.toBe(color('.np-app-bar-trailing'))
	})

	test('a search app bar keeps its leading button on surface variant', async () => {
		await render(Harness, { variant: 'search' })

		const color = (selector: string) =>
			getComputedStyle(document.querySelector(`${selector} .np-icon-button`)!).color
		expect(color('.np-app-bar-leading')).toBe(color('.np-app-bar-trailing'))
	})

	test('the search fills its space up to 312px, then half of it', async () => {
		await render(Harness, { variant: 'search', width: '1000px' })

		const field = document.querySelector<HTMLElement>('.np-app-bar-search-field')!
		const search = field.querySelector<HTMLElement>('.np-search')!
		const space = Number.parseFloat(getComputedStyle(field).width)
		expect(Math.round(search.getBoundingClientRect().width)).toBe(Math.round(space / 2))
	})

	test('the search bar sits 8px from the buttons beside it', async () => {
		await render(Harness, { variant: 'search', width: '360px' })

		const button = document.querySelector('.np-app-bar-leading')!.getBoundingClientRect()
		const searchBar = document.querySelector('.np-search-bar')!.getBoundingClientRect()
		expect(searchBar.left - button.right).toBe(8)
	})

	test('a narrow search app bar gives the search all of its space', async () => {
		await render(Harness, { variant: 'search', width: '360px' })

		const field = document.querySelector<HTMLElement>('.np-app-bar-search-field')!
		const search = field.querySelector<HTMLElement>('.np-search')!
		const space = Number.parseFloat(getComputedStyle(field).width)
		expect(search.getBoundingClientRect().width).toBe(space)
	})

	test('centred, the headline sits in the middle of the bar', async () => {
		await render(Harness, { variant: 'small', alignment: 'center', width: '600px' })

		const box = headlines()[0].getBoundingClientRect()
		const frame = bar().getBoundingClientRect()
		expect(Math.abs(box.left + box.width / 2 - (frame.left + frame.width / 2))).toBeLessThan(1)
	})

	test('centred, a medium bar centres its second row', async () => {
		await render(Harness, { variant: 'medium', alignment: 'center', width: '600px' })

		const box = headlines()[0].getBoundingClientRect()
		const frame = bar().getBoundingClientRect()
		expect(Math.abs(box.left + box.width / 2 - (frame.left + frame.width / 2))).toBeLessThan(1)
	})

	test('headlineLevel makes the visible headline a heading, once', async () => {
		await render(Harness, { variant: 'medium', headlineLevel: 1 })

		const headings = [...document.querySelectorAll('h1')]
		expect(headings).toHaveLength(1)
		expect(headings[0].closest('.np-app-bar-inline')).toBeNull()
	})

	test('without headlineLevel there is no heading', async () => {
		await render(Harness, { variant: 'small' })

		expect(document.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull()
	})

	test('an image replaces the headline of a small app bar', async () => {
		await render(Harness, { variant: 'small', image: true })

		expect(document.querySelector('.np-app-bar img')).not.toBeNull()
		expect(headlines()).toHaveLength(0)
	})

	test('an image sits above the headline of a medium app bar', async () => {
		await render(Harness, { variant: 'medium', image: true })

		const img = document.querySelector('.np-app-bar-second-row img')!.getBoundingClientRect()
		expect(img.bottom).toBeLessThanOrEqual(headlines()[0].getBoundingClientRect().top)
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
		expect(headline.getBoundingClientRect().top).toBeGreaterThanOrEqual(
			row.getBoundingClientRect().top - 1,
		)
		expect(bar().getBoundingClientRect().height).toBeGreaterThan(112)
	})

	test('the container fill is driven by a scroll timeline on every variant', async () => {
		await render(Harness, { variant: 'small', scrollable: true })

		const style = getComputedStyle(bar())
		expect(style.animationTimeline).toContain('scroll')
		expect(style.animationName).toContain('np-app-bar-fill')
	})

	test('the container fills with a different color once the page scrolls', async () => {
		await render(Harness, { variant: 'small', scrollable: true })
		const flat = getComputedStyle(bar()).backgroundColor

		window.scrollTo(0, 200)
		await new Promise(requestAnimationFrame)
		await new Promise(requestAnimationFrame)
		const scrolled = getComputedStyle(bar()).backgroundColor
		window.scrollTo(0, 0)

		expect(scrolled).not.toBe(flat)
	})

	test('the search field in a search bar changes color on scroll too', async () => {
		await render(Harness, { variant: 'search', scrollable: true })
		const field = document.querySelector<HTMLElement>('.np-app-bar-search-field .np-search-bar')!
		const flat = getComputedStyle(field).backgroundColor

		window.scrollTo(0, 200)
		await new Promise(requestAnimationFrame)
		await new Promise(requestAnimationFrame)
		const scrolled = getComputedStyle(field).backgroundColor
		window.scrollTo(0, 0)

		expect(getComputedStyle(field).animationName).toContain('np-app-bar-search-fill')
		expect(scrolled).not.toBe(flat)
		expect(scrolled).not.toBe(getComputedStyle(bar()).backgroundColor)
	})

	test('a bar that does not collapse leaves scroll anchoring alone in its own scroller', async () => {
		await render(AppBar, { headline: 'Inbox', scroller: 'nearest' })

		expect(bar().classList.contains('np-app-bar-scroller-nearest')).toBe(true)
		expect(getComputedStyle(bar().parentElement!).overflowAnchor).not.toBe('none')
	})

	test('a collapsible bar turns off scroll anchoring on the scroller', async () => {
		await render(Harness, { variant: 'large', collapsible: true, scrollable: true })

		expect(getComputedStyle(document.documentElement).overflowAnchor).toBe('none')
	})

	test('a bar that does not collapse leaves scroll anchoring alone', async () => {
		await render(Harness, { variant: 'large', scrollable: true })

		expect(getComputedStyle(document.documentElement).overflowAnchor).not.toBe('none')
	})
})
