import { describe, expect, test, vi } from 'vitest'

vi.mock('#lib/media.js', () => ({
	reducedMotion: { current: false },
	forcedColors: { current: false },
	coarsePointer: { current: false },
}))

const { render } = await import('vitest-browser-svelte')
const Harness = (await import('./CarouselHarness.test.svelte')).default
const AspectHarness = (await import('./CarouselAspectHarness.test.svelte')).default

const frame = () => new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
const settle = async () => {
	await frame()
	await frame()
}

const scroller = () => document.querySelector<HTMLElement>('.np-carousel-scroller')!
const track = () => document.querySelector<HTMLElement>('.np-carousel-track')!
const items = () => [...document.querySelectorAll<HTMLElement>('.np-carousel-item')]

const clipOf = (item: HTMLElement) => {
	const match = /inset\(([^)]*)\)/.exec(getComputedStyle(item).clipPath)
	if (!match) return 0
	return Number.parseFloat(match[1].split(/\s+/)[1] ?? '0') || 0
}

const paintedSpans = () =>
	items().map((item) => {
		const rect = item.getBoundingClientRect()
		const clip = clipOf(item)
		return { left: rect.left + clip, right: rect.right - clip, width: rect.width - 2 * clip }
	})

const paintedWidths = () => paintedSpans().map((span) => span.width)

describe('the carousel keyline morph', async () => {
	test('installs itself and publishes an arrangement and keyframes', async () => {
		await render(Harness, { count: 6 })
		await settle()

		expect(scroller().classList.contains('np-carousel-morphing')).toBe(true)
		expect(scroller().classList.contains('np-carousel-morphing-inline')).toBe(true)
		expect(Number.parseFloat(scroller().style.getPropertyValue('--_item'))).toBeGreaterThan(0)
		expect(Number.parseFloat(scroller().style.getPropertyValue('--_track'))).toBeGreaterThan(0)
		expect(items()[0].style.getPropertyValue('--_morph')).toMatch(/-0$/)
		expect(items()[3].style.getPropertyValue('--_morph')).toMatch(/-3$/)
	})

	test('the morph is driven by a scroll timeline, not by JavaScript', async () => {
		await render(Harness, { count: 6 })
		await settle()

		const [animation] = items()[0].getAnimations()
		expect(animation).toBeDefined()
		expect(animation.timeline?.constructor.name).toBe('ScrollTimeline')
	})

	test('one animation carries the offset and the mask together', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()

		expect(items()[1].getAnimations()).toHaveLength(1)

		const css = [...document.adoptedStyleSheets.at(-1)!.cssRules]
			.map((rule) => rule.cssText)
			.join('')
		expect(css).toContain('inset-inline-start')
		expect(css).toContain('clip-path')
		expect(css).toContain('--np-carousel-clip')
		expect(css).not.toContain('translate')
		expect(css).not.toContain('scale')
	})

	test('items morph continuously, so scrolling never jumps a keyline at once', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const max = scroller().scrollWidth - scroller().clientWidth
		expect(max).toBeGreaterThan(0)

		let previous = paintedWidths()
		let worst = 0
		for (let offset = 3; offset <= max; offset += 3) {
			scroller().scrollLeft = offset
			await settle()
			const current = paintedWidths()
			for (const [index, width] of current.entries()) {
				worst = Math.max(worst, Math.abs(width - previous[index]))
			}
			previous = current
		}

		expect(worst).toBeLessThan(8)
	})

	test('the gap between items holds at every scroll offset, mid-animation included', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const gap = Number.parseFloat(getComputedStyle(track()).columnGap)
		const max = scroller().scrollWidth - scroller().clientWidth
		let checked = 0

		for (let offset = 0; offset <= max; offset += 17) {
			scroller().scrollLeft = offset
			await settle()
			const spans = paintedSpans()
			for (const [index, span] of spans.slice(1).entries()) {
				if (span.width <= 1 || spans[index].width <= 1) continue
				expect(span.left - spans[index].right).toBeCloseTo(gap, 0)
				checked += 1
			}
		}
		expect(checked).toBeGreaterThan(20)
	})

	test('an item that has never been on screen is masked away, not left at full width', async () => {
		await render(Harness, { count: 8, snap: false })
		await settle()

		const box = Number.parseFloat(scroller().style.getPropertyValue('--_item'))
		expect(paintedWidths()[7]).toBeLessThan(box)
	})

	test('the last item reaches full size at the end of the strip', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const box = Number.parseFloat(scroller().style.getPropertyValue('--_item'))

		scroller().scrollLeft = scroller().scrollWidth
		await settle()
		expect(paintedWidths()[5]).toBeGreaterThan(box * 0.9)
	})

	test('the first item is full size at the start of the strip', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const box = Number.parseFloat(scroller().style.getPropertyValue('--_item'))

		expect(paintedWidths()[0]).toBeGreaterThan(box * 0.9)
	})

	test('the label tracks the mask, so a narrowed item keeps the start of its word', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const narrow = items().find((item) => clipOf(item) > 20)!

		const label = narrow.querySelector<HTMLElement>('.np-carousel-item-label')!
		const clip = clipOf(narrow)
		const box = narrow.getBoundingClientRect()
		const text = label.getBoundingClientRect()

		expect(text.left - box.left).toBeGreaterThan(clip - 1)
		expect(box.right - text.right).toBeGreaterThan(clip - 1)
	})

	test('a narrow item is clickable on the sliver the mask leaves', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()
		const widest = Math.max(...paintedWidths())
		const index = paintedSpans().findIndex((span) => span.width > 20 && span.width < widest - 20)
		expect(index).toBeGreaterThan(-1)

		const span = paintedSpans()[index]
		const rect = items()[index].getBoundingClientRect()
		const hit = document.elementFromPoint((span.left + span.right) / 2, rect.top + rect.height / 2)
		expect(hit?.closest('.np-carousel-item')).toBe(items()[index])
	})

	test('nothing the animation moves is a snap target', async () => {
		await render(Harness, { count: 6 })
		await settle()

		for (const item of items()) {
			expect(getComputedStyle(item).scrollSnapAlign).toBe('none')
		}

		const points = [...document.querySelectorAll<HTMLElement>('.np-carousel-snap-points > span')]
		expect(points).toHaveLength(6)
		expect(getComputedStyle(points[0]).scrollSnapAlign).toBe('start')
		expect(points.filter((point) => !point.hasAttribute('hidden')).length).toBeGreaterThan(1)
	})

	test('the snap points sit one stride apart and do not move while scrolling', async () => {
		await render(Harness, { count: 6 })
		await settle()
		const at = () => {
			const origin = scroller().getBoundingClientRect().left
			return [...document.querySelectorAll<HTMLElement>('.np-carousel-snap-points > span')]
				.filter((point) => !point.hasAttribute('hidden'))
				.map((point) => point.getBoundingClientRect().left - origin + scroller().scrollLeft)
		}

		const before = at()
		expect(before[0]).toBeCloseTo(0, 1)
		const stride = before[1] - before[0]
		expect(stride).toBeGreaterThan(0)
		for (const [index, left] of before.slice(1, -1).entries()) {
			expect(left - before[index]).toBeCloseTo(stride, 1)
		}
		expect(before[before.length - 1]).toBeCloseTo(
			scroller().scrollWidth - scroller().clientWidth,
			0,
		)

		scroller().scrollLeft = 137
		await settle()

		for (const [index, left] of at().entries()) expect(left).toBeCloseTo(before[index], 1)
	})

	test('the scroller leaves snapping to the browser and adds no smooth scroll of its own', async () => {
		await render(Harness, { count: 6 })
		await settle()
		expect(getComputedStyle(scroller()).scrollBehavior).toBe('auto')
	})

	test('the scrollable area matches the arrangement and holds still while scrolling', async () => {
		await render(Harness, { count: 8, snap: false })
		await settle()
		const width = scroller().scrollWidth

		for (const offset of [0, 50, 150, 300, 9999]) {
			scroller().scrollLeft = offset
			await settle()
			expect(scroller().scrollWidth).toBe(width)
		}
	})

	test('focusing an item scrolls it onto a notch, centred alignment included', async () => {
		for (const alignment of ['start', 'center'] as const) {
			const view = await render(Harness, { count: 8, alignment })
			await settle()

			const origin = () => scroller().getBoundingClientRect().left
			const notchesAt = () =>
				[...document.querySelectorAll<HTMLElement>('.np-carousel-snap-points > span')]
					.filter((point) => !point.hasAttribute('hidden'))
					.map((point) => point.getBoundingClientRect().left - origin() + scroller().scrollLeft)

			const notches = notchesAt()
			expect(notches.length).toBeGreaterThan(2)

			items()[4].focus()
			for (let tries = 0; tries < 300 && scroller().scrollLeft === 0; tries += 1) await frame()
			let resting = -1
			for (let tries = 0; tries < 300 && scroller().scrollLeft !== resting; tries += 1) {
				resting = scroller().scrollLeft
				await frame()
			}

			expect(resting).toBeGreaterThan(0)
			const nearest = Math.min(...notches.map((notch) => Math.abs(notch - resting)))
			expect(nearest).toBeLessThan(1)
			view.unmount()
		}
	})

	test('the notch markers stay positioned with snapping off, so focus can still reach them', async () => {
		await render(Harness, { count: 6, snap: false })
		await settle()

		const origin = scroller().getBoundingClientRect().left
		const markers = [...document.querySelectorAll<HTMLElement>('.np-carousel-snap-points > span')]
		const at = markers
			.filter((marker) => !marker.hasAttribute('hidden'))
			.map((marker) => marker.getBoundingClientRect().left - origin)

		expect(at.length).toBeGreaterThan(2)
		expect(Math.max(...at)).toBeGreaterThan(0)
		expect(getComputedStyle(markers[0]).scrollSnapAlign).toBe('none')
	})

	test('uncontained crops at the edge and offsets its media by what the crop takes', async () => {
		const image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		await render(Harness, { variant: 'uncontained', count: 8, image })
		await settle()

		const first = items()[0]
		const media = first.querySelector<HTMLElement>('.np-carousel-item-image')!
		const cropOf = (el: HTMLElement) => {
			const parts = getComputedStyle(el)
				.clipPath.replace(/^inset\(/, '')
				.split(' round ')[0]
				.trim()
				.split(/\s+/)
			const [top, right = top, bottom = top, left = right] = parts.map(Number.parseFloat)
			return { top, right, bottom, left }
		}
		const shiftOf = (el: HTMLElement) => Number.parseFloat(getComputedStyle(el).translate) || 0

		expect(cropOf(first).left).toBe(0)
		expect(shiftOf(media)).toBe(0)
		const width = first.getBoundingClientRect().width

		scroller().scrollLeft = width / 3
		await settle()

		const crop = cropOf(first).left
		const shift = shiftOf(media)
		expect(crop).toBeGreaterThan(1)
		expect(shift).toBeGreaterThan(1)
		expect(crop + shift).toBeCloseTo(100 / 3, 0)
		expect(first.getBoundingClientRect().width).toBeCloseTo(width, 0)

		scroller().scrollLeft = width * 4
		await settle()
		expect(cropOf(first).left).toBeCloseTo(100 * (1 - 1 / 3), 1)
	})

	test('an item still off the far edge is cropped from the side it will enter by', async () => {
		await render(Harness, { variant: 'uncontained', count: 8 })
		await settle()

		const last = items()[7]
		const crop = getComputedStyle(last).clipPath
		expect(Number.parseFloat(crop.replace(/^inset\(\S+\s+/, ''))).toBeCloseTo(100 * (1 - 1 / 3), 1)
	})

	test('a declared aspect ratio sizes the item from the cross axis, so shapes can differ', async () => {
		await render(AspectHarness)
		await settle()

		const [wide, square, tall] = items().map((item) => item.getBoundingClientRect())
		const ratio = (box: DOMRect) => box.width / box.height

		expect(ratio(wide)).toBeCloseTo(16 / 9, 1)
		expect(ratio(square)).toBeCloseTo(1, 1)
		expect(ratio(tall)).toBeCloseTo(9 / 16, 1)
		expect(square.height).toBeCloseTo(wide.height, 0)
		expect(tall.height).toBeCloseTo(wide.height, 0)
		expect(wide.width).toBeGreaterThan(tall.width)
	})

	test('the keyframes are torn down with the carousel', async () => {
		const { unmount } = await render(Harness, { count: 6 })
		await settle()
		const before = document.adoptedStyleSheets.length

		unmount()
		await settle()

		expect(document.adoptedStyleSheets.length).toBe(before - 1)
	})
})
