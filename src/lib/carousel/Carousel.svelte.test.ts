import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './CarouselHarness.test.svelte'
import NamesHarness from './CarouselNamesHarness.test.svelte'
import TokensHarness from './CarouselTokensHarness.test.svelte'

const carousel = () => document.querySelector<HTMLElement>('.np-carousel')!
const scroller = () => document.querySelector<HTMLElement>('.np-carousel-scroller')!
const track = () => document.querySelector<HTMLElement>('.np-carousel-track')!
const items = () => [...document.querySelectorAll<HTMLElement>('.np-carousel-item')]
const labels = () => [...document.querySelectorAll<HTMLElement>('.np-carousel-item-label')]

const arrow = (key: string) => {
	const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
	document.activeElement?.dispatchEvent(event)
	return event
}

const resolve = (token: string) => {
	const probe = document.createElement('div')
	probe.style.color = `var(${token})`
	document.body.append(probe)
	const value = getComputedStyle(probe).color
	probe.remove()
	return value
}

const widths = () => items().map((item) => Math.round(item.getBoundingClientRect().width))

describe('Carousel', async () => {
	test('renders a group that describes itself as a carousel', async () => {
		await render(Harness)

		expect(carousel().getAttribute('role')).toBe('group')
		expect(carousel().getAttribute('aria-roledescription')).toBe('carousel')
		expect(carousel().getAttribute('aria-label')).toBe('Featured photos')
	})

	test('the container is not a focus target', async () => {
		await render(Harness)

		expect(carousel().hasAttribute('tabindex')).toBe(false)
		expect(scroller().hasAttribute('tabindex')).toBe(false)
	})

	test('every item stays in the tab sequence, so this is not a roving tabindex', async () => {
		await render(Harness, { count: 4 })

		expect(items()).toHaveLength(4)
		expect(items().map((item) => item.tabIndex)).toEqual([0, 0, 0, 0])
	})

	test('a button type renders a button', async () => {
		await render(Harness, { type: 'button' })

		expect(document.querySelectorAll('button.np-carousel-item')).toHaveLength(5)
	})

	test('a link type renders an anchor', async () => {
		await render(Harness, { type: 'link' })

		expect(document.querySelectorAll('a.np-carousel-item')).toHaveLength(5)
	})

	test('a text type renders a plain div', async () => {
		await render(Harness, { type: 'text' })

		expect(document.querySelectorAll('div.np-carousel-item')).toHaveLength(5)
	})

	test('a plain item has no state layer and is not focusable', async () => {
		await render(Harness, { type: 'text' })

		expect(items()[0].querySelector('.np-ripple-surface')).toBe(null)
		expect(items()[0].tabIndex).toBe(-1)
	})

	test("an item's accessible name carries its position and the total", async () => {
		await render(Harness, { count: 5 })

		await expect.poll(() => items()[2].getAttribute('aria-label')).toBe('Market, 3 of 5')
		await expect.poll(() => items()[4].getAttribute('aria-label')).toBe('Garden, 5 of 5')
	})

	test("a consumer's own aria-label is left exactly as given", async () => {
		await render(NamesHarness)

		await expect.poll(() => items()[1].getAttribute('aria-label')).toBe('A harbour at dawn')
	})

	test('an item with no label of its own gets no name of its own', async () => {
		await render(NamesHarness)

		expect(items()[2].hasAttribute('aria-label')).toBe(false)
	})

	test('itemLabel replaces the default wording', async () => {
		await render(Harness, {
			count: 3,
			itemLabel: (text: string, position: number, total: number) =>
				`${text} (${position}/${total})`,
		})

		await expect.poll(() => items()[0].getAttribute('aria-label')).toBe('Sunset (1/3)')
	})

	test('removing an item renumbers the rest', async () => {
		const { rerender } = await render(Harness, { count: 5 })
		await expect.poll(() => items()[4].getAttribute('aria-label')).toBe('Garden, 5 of 5')

		await rerender({ count: 4 })

		await expect.poll(() => items()[3].getAttribute('aria-label')).toBe('Bridge, 4 of 4')
	})

	test('the visible label is hidden from assistive technology once the name repeats it', async () => {
		await render(Harness, { count: 3 })

		await expect.poll(() => labels()[0].getAttribute('aria-hidden')).toBe('true')
	})

	test('a plain item keeps its label readable, because it carries no name of its own', async () => {
		await render(NamesHarness, { plain: true })

		expect(labels()[0].hasAttribute('aria-hidden')).toBe(false)
	})

	test('an arrow key along the scroll axis moves focus to the next item', async () => {
		await render(Harness, { count: 4 })
		items()[0].focus()

		arrow('ArrowRight')

		await expect.poll(() => document.activeElement).toBe(items()[1])
	})

	test('focus does not wrap past either end, which would fling the scroll position', async () => {
		await render(Harness, { count: 3 })

		items()[0].focus()
		arrow('ArrowLeft')
		expect(document.activeElement).toBe(items()[0])

		items()[2].focus()
		arrow('ArrowRight')
		expect(document.activeElement).toBe(items()[2])
	})

	test('Home and End jump to the ends', async () => {
		await render(Harness, { count: 4 })
		items()[2].focus()

		arrow('Home')
		expect(document.activeElement).toBe(items()[0])

		arrow('End')
		expect(document.activeElement).toBe(items()[3])
	})

	test('a cross-axis arrow is left alone, so it can leave the carousel', async () => {
		await render(Harness, { count: 4 })
		items()[1].focus()

		const event = arrow('ArrowDown')

		expect(event.defaultPrevented).toBe(false)
		expect(document.activeElement).toBe(items()[1])
	})

	test('a full-screen carousel swaps the axis it claims', async () => {
		await render(Harness, { variant: 'full-screen', count: 4 })
		items()[0].focus()

		expect(arrow('ArrowRight').defaultPrevented).toBe(false)
		arrow('ArrowDown')

		await expect.poll(() => document.activeElement).toBe(items()[1])
	})

	test('a keydown handler passed in runs first and may take the key', async () => {
		await render(Harness, {
			count: 3,
			onkeydown: (event: KeyboardEvent) => event.preventDefault(),
		})
		items()[0].focus()

		arrow('ArrowRight')

		expect(document.activeElement).toBe(items()[0])
	})

	test('focusing an item off to the side brings it into view', async () => {
		await render(Harness, { count: 12 })
		const last = items()[11]
		expect(last.getBoundingClientRect().right).toBeGreaterThan(
			scroller().getBoundingClientRect().right,
		)

		last.focus()

		await expect
			.poll(() => Math.round(last.getBoundingClientRect().right), { timeout: 600 })
			.toBeLessThanOrEqual(Math.round(scroller().getBoundingClientRect().right) + 1)
	})

	test('hover raises the item by one elevation step', async () => {
		await render(Harness, { count: 3 })

		await page.elementLocator(items()[0]).hover()

		await expect.poll(() => getComputedStyle(items()[0]).boxShadow).not.toBe('none')
	})

	test('a press holds a pressed class past the pointer lift', async () => {
		await render(Harness, { count: 3 })

		items()[0].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))

		await expect.poll(() => items()[0].classList.contains('np-carousel-item-pressed')).toBe(true)
		await expect
			.poll(() => items()[0].classList.contains('np-carousel-item-pressed'), { timeout: 600 })
			.toBe(false)
	})

	test('a focused item draws a three pixel secondary ring inside its own edge', async () => {
		await render(Harness, { count: 3 })

		items()[0].focus()

		const ring = getComputedStyle(items()[0], '::after')
		expect(ring.outlineWidth).toBe('3px')
		expect(ring.outlineOffset).toBe('-3px')
		expect(ring.outlineColor).toBe(resolve('--np-color-secondary'))
	})

	test('a focused item gives back the hover lift', async () => {
		await render(Harness, { count: 3 })

		items()[0].focus()

		expect(getComputedStyle(items()[0]).boxShadow).toBe('none')
	})

	test('a disabled item is dimmed, unreachable and has no state layer', async () => {
		await render(Harness, { count: 3, disabledIndex: 1 })
		const disabled = items()[1]

		expect(disabled.getAttribute('aria-disabled')).toBe('true')
		expect(disabled.hasAttribute('disabled')).toBe(true)
		expect(getComputedStyle(disabled).opacity).toBe('0.38')
		expect(getComputedStyle(disabled).pointerEvents).toBe('none')
		expect(disabled.querySelector('.np-ripple-surface')).toBe(null)
	})

	test('a disabled link is not followable', async () => {
		await render(Harness, { count: 3, type: 'link', disabledIndex: 0 })

		expect(items()[0].tabIndex).toBe(-1)
		expect(items()[0].getAttribute('aria-disabled')).toBe('true')
	})

	test('a disabled item dims rather than repainting its container', async () => {
		await render(Harness, { count: 3, disabledIndex: 0 })

		expect(getComputedStyle(items()[0]).backgroundColor).toBe('rgba(0, 0, 0, 0)')
	})

	test('the container is transparent and unoutlined until asked otherwise', async () => {
		await render(TokensHarness)
		const bare = document.querySelector<HTMLElement>('[data-testid="bare"]')!

		expect(getComputedStyle(bare).backgroundColor).toBe('rgba(0, 0, 0, 0)')
		expect(getComputedStyle(bare, '::after').outlineWidth).toBe('0px')
	})

	test('shape, colour, outline and label colour follow their custom properties', async () => {
		await render(TokensHarness)
		const themed = document.querySelector<HTMLElement>('[data-testid="themed"]')!
		const label = themed.querySelector<HTMLElement>('.np-carousel-item-label')!

		expect(getComputedStyle(themed).borderTopLeftRadius).toBe('4px')
		expect(getComputedStyle(themed).backgroundColor).toBe('rgb(1, 2, 3)')
		expect(getComputedStyle(themed, '::after').outlineWidth).toBe('1px')
		expect(getComputedStyle(label).color).toBe('rgb(4, 5, 6)')
	})

	test('the label sits along the bottom leading edge over a scrim', async () => {
		await render(Harness, { count: 3 })
		const item = items()[0].getBoundingClientRect()
		const label = labels()[0].getBoundingClientRect()

		expect(Math.round(label.bottom)).toBe(Math.round(item.bottom))
		expect(Math.round(label.left)).toBe(Math.round(item.left))
		expect(getComputedStyle(labels()[0]).backgroundImage).toContain('linear-gradient')
	})

	test('under reduced motion every item is the same size', async () => {
		await render(Harness, { count: 6 })

		expect(new Set(widths()).size).toBe(1)
	})

	test('under reduced motion a hero carousel is uniform too', async () => {
		await render(Harness, { variant: 'hero', count: 6 })

		expect(new Set(widths()).size).toBe(1)
	})

	test('under reduced motion the engine never runs and nothing is morphed', async () => {
		await render(Harness, { count: 6 })

		expect(scroller().classList.contains('np-carousel-morphing')).toBe(false)
		expect(items()[0].style.getPropertyValue('--_x')).toBe('')
		expect(items()[0].style.getPropertyValue('--_i')).toBe('')
		expect(getComputedStyle(items()[0]).position).toBe('relative')
	})

	test('under reduced motion the items reach the edges of the scroller', async () => {
		await render(Harness, { count: 6 })

		expect(getComputedStyle(track()).paddingInlineStart).toBe('0px')
		expect(Math.round(items()[0].getBoundingClientRect().left)).toBe(
			Math.round(scroller().getBoundingClientRect().left),
		)
	})

	const startMorphing = () => {
		scroller().classList.add('np-carousel-morphing', 'np-carousel-morphing-inline')
		track().style.setProperty('--_item', '200px')
		track().style.setProperty('--_track', '900px')
	}

	test('the morphing layout keeps the height the items give the track', async () => {
		await render(Harness, { count: 6 })
		const before = Math.round(track().getBoundingClientRect().height)
		expect(before).toBeGreaterThan(0)

		startMorphing()

		expect(Math.round(track().getBoundingClientRect().height)).toBe(before)
		expect(Math.round(items()[0].getBoundingClientRect().height)).toBeGreaterThan(0)
		expect(Math.round(items()[0].getBoundingClientRect().width)).toBe(200)
	})

	test('the morphing layout caps the scrollable area to the arrangement, not the item boxes', async () => {
		await render(Harness, { count: 6 })

		startMorphing()

		expect(scroller().scrollWidth).toBeLessThan(1000)
		expect(getComputedStyle(track()).overflow).toBe('clip')
	})

	test('a full-screen item fills the scrollport on both axes', async () => {
		await render(Harness, { variant: 'full-screen', count: 3 })
		const port = scroller().getBoundingClientRect()
		const item = items()[0].getBoundingClientRect()

		expect(Math.round(item.height)).toBe(Math.round(port.height))
		expect(Math.round(item.width)).toBe(Math.round(port.width))
	})

	test('a vertical track is as wide as the scrollport, so item percentages resolve', async () => {
		await render(Harness, { orientation: 'vertical', count: 3 })

		expect(Math.round(track().getBoundingClientRect().width)).toBe(
			Math.round(scroller().getBoundingClientRect().width),
		)
	})

	test('snapping is on by default', async () => {
		await render(Harness)

		expect(carousel().classList.contains('np-carousel-snap')).toBe(true)
		expect(getComputedStyle(scroller()).scrollSnapType).toBe('x mandatory')
		expect(getComputedStyle(items()[0]).scrollSnapAlign).toBe('start')
	})

	test('full-screen snaps decisively, because landing on one item is the point', async () => {
		await render(Harness, { variant: 'full-screen', count: 3 })

		expect(getComputedStyle(scroller()).scrollSnapType).toBe('y mandatory')
		expect(getComputedStyle(items()[0]).scrollSnapStop).toBe('always')
	})

	test('under reduced motion uncontained does not crop, so every item stays whole', async () => {
		await render(Harness, { variant: 'uncontained' })

		expect(carousel().classList.contains('np-carousel-cropping')).toBe(false)
		expect(getComputedStyle(items()[0]).clipPath).toBe('none')
	})

	test('uncontained does not snap, because its items are not keyed to keylines', async () => {
		await render(Harness, { variant: 'uncontained' })

		expect(carousel().classList.contains('np-carousel-snap')).toBe(false)
		expect(getComputedStyle(scroller()).scrollSnapType).toBe('none')
	})

	test('snapping can be turned on for uncontained anyway', async () => {
		await render(Harness, { variant: 'uncontained', snap: true })

		expect(carousel().classList.contains('np-carousel-snap')).toBe(true)
	})

	test('a role passed in is used instead of group', async () => {
		await render(Harness, { role: 'region' })

		expect(carousel().getAttribute('role')).toBe('region')
	})
})
