import { describe, expect, test } from 'vitest'
import {
	arrange,
	itemKeyframes,
	minVisibleFraction,
	morphTrack,
	notches,
	placeItem,
	placeItemOnTrack,
	shiftSteps,
} from './carouselStrategy.ts'
import type { CarouselArrangement, CarouselStrategyInput } from './carouselStrategy.ts'

const input = (overrides: Partial<CarouselStrategyInput> = {}): CarouselStrategyInput => ({
	variant: 'multi-browse',
	alignment: 'start',
	itemCount: 10,
	availableSpace: 1000,
	itemSize: 200,
	spacing: 8,
	smallMin: 40,
	smallMax: 56,
	...overrides,
})

const painted = (arrangement: CarouselArrangement, index: number, scroll: number) => {
	const { x, clip } = placeItem(arrangement, index, scroll)
	const start = index * arrangement.stride - scroll + x + clip
	const width = arrangement.itemSize - 2 * clip
	return { start, end: start + width, width }
}

const notchFor = (arrangement: CarouselArrangement, index: number) =>
	Math.min(Math.max(index * arrangement.stride, 0), arrangement.scrollMax)

const visibleRange = (arrangement: CarouselArrangement, itemCount: number, scroll: number) => {
	const { keylines, stride } = arrangement
	if (keylines.length === 0) return { from: 0, to: itemCount - 1 }
	return {
		from: Math.max(0, Math.ceil((scroll + keylines[0].loc - stride / 2) / stride)),
		to: Math.min(
			itemCount - 1,
			Math.floor((scroll + keylines[keylines.length - 1].loc - stride / 2) / stride),
		),
	}
}

const neighbours = (arrangement: CarouselArrangement, itemCount: number, scroll: number) => {
	const range = visibleRange(arrangement, itemCount, scroll)
	const pairs: number[] = []
	for (let item = range.from; item < range.to; item += 1) {
		if (painted(arrangement, item, scroll).width <= 0) continue
		if (painted(arrangement, item + 1, scroll).width <= 0) continue
		pairs.push(item)
	}
	return pairs
}

const slots = (arrangement: CarouselArrangement) =>
	arrangement.keylines.slice(1, -1).reduce((sum, keyline) => sum + keyline.size, 0)

const round = (value: number) => Math.round(value * 1000) / 1000

describe('carouselStrategy', async () => {
	test('multi-browse arranges large, medium and small slots', async () => {
		const arrangement = arrange(input())

		expect(arrangement.largeCount).toBeGreaterThanOrEqual(1)
		expect(arrangement.mediumCount).toBe(1)
		expect(arrangement.smallCount).toBe(1)
		expect(arrangement.largeSize).toBeGreaterThan(arrangement.mediumSize)
		expect(arrangement.mediumSize).toBeGreaterThan(arrangement.smallSize)
	})

	test('the small item stays inside its 40 to 56 bounds', async () => {
		const sizes = [120, 200, 400, 900].map((itemSize) => arrange(input({ itemSize })))

		for (const arrangement of sizes) {
			expect(arrangement.smallCount).toBeGreaterThan(0)
			const paintedSmall = arrangement.smallSize - arrangement.spacing
			expect(paintedSmall).toBeGreaterThanOrEqual(40 - 0.001)
			expect(paintedSmall).toBeLessThanOrEqual(56 + 0.001)
		}
	})

	test('items that all fit stay large, with nothing to tease at', async () => {
		const arrangement = arrange(input({ itemSize: 60 }))

		expect(arrangement.keylines).toEqual([])
		expect(arrangement.scrollMax).toBe(0)
		expect(arrangement.itemSize).toBe(60)
	})

	test('medium is exactly the blend of its neighbours', async () => {
		const arrangement = arrange(input())

		expect(round(arrangement.mediumSize)).toBe(
			round((arrangement.largeSize + arrangement.smallSize) / 2),
		)
	})

	test('the slots fill the strip exactly, so nothing is left over', async () => {
		for (const availableSpace of [420, 700, 1000, 1440]) {
			const arrangement = arrange(input({ availableSpace }))
			expect(arrangement.keylines.length).toBeGreaterThan(0)
			expect(round(slots(arrangement))).toBe(round(availableSpace))
		}
	})

	test('a strip that cannot scroll keeps every item the size it asked for', async () => {
		const arrangement = arrange(input({ itemCount: 3, availableSpace: 544 }))

		expect(arrangement.keylines).toEqual([])
		expect(arrangement.itemSize).toBe(200)
		expect(arrangement.scrollMax).toBeGreaterThan(0)
	})

	test('keyline positions step by exactly one stride', async () => {
		const arrangement = arrange(input())
		const steps = arrangement.keylines
			.slice(1)
			.map((keyline, index) => round(keyline.loc - arrangement.keylines[index].loc))

		expect(new Set(steps)).toEqual(new Set([round(arrangement.stride)]))
	})

	test('the focal keyline sits at half a stride, which puts the notches on the stride', async () => {
		const arrangement = arrange(input())

		expect(round(arrangement.keylines[arrangement.focal].loc)).toBe(round(arrangement.stride / 2))
		expect(notches(morphTrack(arrangement))[3]).toBe(3 * arrangement.stride)
	})

	test('the first item rests unclipped on the leading padding line', async () => {
		const arrangement = arrange(input())
		const { x, clip } = placeItem(arrangement, 0, 0)

		expect(round(x)).toBe(0)
		expect(round(clip)).toBe(0)
		expect(round(painted(arrangement, 0, 0).start)).toBe(0)
	})

	test('the gap between neighbours is the spacing at every rest position', async () => {
		const arrangement = arrange(input())
		let checked = 0

		for (const index of [0, 1, 2, 3]) {
			const scroll = notchFor(arrangement, index)
			for (const item of neighbours(arrangement, 10, scroll)) {
				const gap =
					painted(arrangement, item + 1, scroll).start - painted(arrangement, item, scroll).end
				expect(round(gap)).toBe(round(arrangement.spacing))
				checked += 1
			}
		}
		expect(checked).toBeGreaterThan(0)
	})

	test('the gap holds mid-scroll too, so the strip never tears', async () => {
		const arrangement = arrange(input())
		let checked = 0

		for (let scroll = 0; scroll <= arrangement.scrollMax; scroll += 7) {
			for (const item of neighbours(arrangement, 10, scroll)) {
				const gap =
					painted(arrangement, item + 1, scroll).start - painted(arrangement, item, scroll).end
				expect(round(gap)).toBe(round(arrangement.spacing))
				checked += 1
			}
		}
		expect(checked).toBeGreaterThan(0)
	})

	test('an item never paints wider than the constant box or narrower than nothing', async () => {
		const arrangement = arrange(input())

		for (let scroll = 0; scroll <= arrangement.scrollMax; scroll += 3) {
			for (let item = 0; item < 10; item += 1) {
				const { clip } = placeItem(arrangement, item, scroll)
				expect(clip).toBeGreaterThanOrEqual(0)
				expect(clip).toBeLessThanOrEqual(arrangement.itemSize / 2 + 0.001)
			}
		}
	})

	test('placement is continuous, so scrolling never jumps', async () => {
		const arrangement = arrange(input())
		let previous = placeItem(arrangement, 4, 0)

		for (let scroll = 1; scroll <= arrangement.scrollMax; scroll += 1) {
			const next = placeItem(arrangement, 4, scroll)
			expect(Math.abs(next.x - previous.x)).toBeLessThan(arrangement.stride)
			expect(Math.abs(next.clip - previous.clip)).toBeLessThan(arrangement.stride)
			previous = next
		}
	})

	test('scrolling to the end fills the strip and leaves nothing beyond it', async () => {
		const arrangement = arrange(input({ itemCount: 10 }))
		const slotCount = arrangement.keylines.length - 2
		const focalItem = 10 - slotCount

		expect(round(placeItem(arrangement, focalItem, arrangement.scrollMax).clip)).toBe(0)
		expect(arrangement.keylines[arrangement.keylines.length - 2].kind).toBe('small')
		expect(round(painted(arrangement, 9, arrangement.scrollMax).width)).toBe(
			round(arrangement.smallSize - arrangement.spacing),
		)
		expect(arrangement.trackSize).toBeGreaterThanOrEqual(arrangement.scrollMax)
	})

	test('hero arranges one large item beside a small one', async () => {
		const arrangement = arrange(input({ variant: 'hero', itemSize: 300, availableSpace: 700 }))

		expect(arrangement.largeCount).toBe(1)
		expect(arrangement.smallCount).toBe(1)
		expect(round(slots(arrangement))).toBe(700)
	})

	test('hero drops its small item when there is no room for one', async () => {
		const arrangement = arrange({
			...input({ variant: 'hero', itemSize: 40, availableSpace: 80 }),
			smallMin: 40,
			smallMax: 56,
		})

		expect(arrangement.smallCount).toBe(0)
	})

	test('centred alignment puts a small item on each side of the focal run', async () => {
		const arrangement = arrange(input({ alignment: 'center', availableSpace: 1400 }))
		const kinds = arrangement.keylines.slice(1, -1).map((keyline) => keyline.kind)

		expect(kinds[0]).toBe('small')
		expect(kinds[kinds.length - 1]).toBe('small')
		expect(arrangement.keylines[arrangement.focal].kind).toBe('large')
	})

	test('uncontained and full-screen produce no keylines at all, so nothing morphs', async () => {
		for (const variant of ['uncontained', 'full-screen'] as const) {
			const arrangement = arrange(input({ variant }))
			expect(arrangement.keylines).toEqual([])
			expect(placeItem(arrangement, 3, 120)).toEqual({ x: 0, clip: 0 })
		}
	})

	test('a wider container fits more large items without ever inverting the sizes', async () => {
		let previous = 0
		for (let availableSpace = 300; availableSpace <= 2000; availableSpace += 50) {
			const arrangement = arrange(input({ availableSpace }))
			expect(arrangement.largeCount).toBeGreaterThanOrEqual(previous)
			expect(arrangement.largeSize).toBeGreaterThanOrEqual(arrangement.smallSize)
			expect(arrangement.largeSize).toBeLessThanOrEqual(availableSpace + 0.001)
			previous = arrangement.largeCount
		}
	})

	test('never arranges more slots than there are items', async () => {
		for (const itemCount of [0, 1, 2, 3]) {
			const arrangement = arrange(input({ itemCount }))
			const used = arrangement.smallCount + arrangement.mediumCount + arrangement.largeCount
			expect(used).toBeLessThanOrEqual(Math.max(itemCount, 0))
		}
	})

	test('a container with no width yields numbers rather than NaN', async () => {
		for (const overrides of [
			{ availableSpace: 0 },
			{ itemSize: 0 },
			{ availableSpace: 0, itemSize: 0 },
		]) {
			const arrangement = arrange(input(overrides))
			const { x, clip } = placeItem(arrangement, 2, 0)

			expect(Number.isFinite(arrangement.stride)).toBe(true)
			expect(Number.isFinite(arrangement.itemSize)).toBe(true)
			expect(Number.isFinite(x)).toBe(true)
			expect(Number.isFinite(clip)).toBe(true)
		}
	})

	test('the same input gives an identical result', async () => {
		expect(arrange(input())).toEqual(arrange(input()))
	})

	test('the focal run shifts to the end, so the last item can be large there', async () => {
		const arrangement = arrange(input({ itemCount: 7, availableSpace: 544 }))
		const steps = shiftSteps(arrangement, 'end')
		const shifted = steps[steps.length - 1]
		const kinds = (one: typeof arrangement) => one.keylines.slice(1, -1).map((k) => k.kind)

		expect(kinds(arrangement)).toEqual(['large', 'large', 'small'])
		expect(kinds(shifted)).toEqual(['small', 'large', 'large'])
		expect(shifted.keylines.map((k) => round(k.loc))).toEqual(
			arrangement.keylines.map((k) => round(k.loc)),
		)
		expect(round(slots(shifted))).toBe(round(slots(arrangement)))
	})

	test('the last item paints full size at the end of the strip', async () => {
		const arrangement = arrange(input({ itemCount: 7, availableSpace: 544 }))
		const track = morphTrack(arrangement)
		const painted = (index: number, scroll: number) =>
			arrangement.itemSize - 2 * placeItemOnTrack(track, index, scroll).clip

		expect(round(painted(6, track.scrollMax))).toBe(round(arrangement.itemSize))
		expect(round(painted(0, 0))).toBe(round(arrangement.itemSize))
	})

	test('every item reaches full size somewhere, however few there are', async () => {
		for (const availableSpace of [268, 320, 420, 544]) {
			for (const itemCount of [2, 3, 4, 7]) {
				const arrangement = arrange(input({ itemCount, availableSpace }))
				const track = morphTrack(arrangement)
				for (let index = 0; index < itemCount; index += 1) {
					let widest = 0
					for (let scroll = 0; scroll <= track.scrollMax; scroll += 2) {
						widest = Math.max(
							widest,
							arrangement.itemSize - 2 * placeItemOnTrack(track, index, scroll).clip,
						)
					}
					expect(widest).toBeCloseTo(arrangement.itemSize, 0)
				}
			}
		}
	})

	test('the painted strip never leaves the strip, shift phases included', async () => {
		for (const variant of ['multi-browse', 'hero'] as const) {
			for (const availableSpace of [268, 374, 544]) {
				const arrangement = arrange(input({ variant, itemCount: 7, availableSpace }))
				const track = morphTrack(arrangement)
				for (let scroll = 0; scroll <= track.scrollMax; scroll += 4) {
					for (let index = 0; index < 7; index += 1) {
						const { x, clip } = placeItemOnTrack(track, index, scroll)
						const width = arrangement.itemSize - 2 * clip
						if (width <= 0.5) continue
						const start = index * arrangement.stride - scroll + x + clip
						expect(start).toBeGreaterThan(-arrangement.spacing - 0.5)
						expect(start + width).toBeLessThan(availableSpace + arrangement.spacing + 0.5)
					}
				}
			}
		}
	})

	test('there is a notch for every item, and one at each end', async () => {
		const track = morphTrack(arrange(input({ itemCount: 3, availableSpace: 268 })))
		const at = notches(track)

		expect(at[0]).toBe(0)
		expect(at[at.length - 1]).toBeCloseTo(track.scrollMax, 1)
		expect(at.length).toBeLessThanOrEqual(3)
		expect([...at].sort((a, b) => a - b)).toEqual(at)
	})

	test('a start-aligned strip needs no shift at its start, because the focal run is already there', async () => {
		const track = morphTrack(arrange(input({ itemCount: 7, availableSpace: 544 })))

		expect(track.startShift).toBe(0)
		expect(track.endShift).toBeGreaterThan(0)
	})

	test('the keyframes span the whole scroll range and stay in order', async () => {
		const track = morphTrack(arrange(input({ itemCount: 7, availableSpace: 544 })))
		const frames = itemKeyframes(track, 3)

		expect(frames.length).toBeGreaterThan(3)
		expect(round(frames[0].percent)).toBe(0)
		expect(round(frames[frames.length - 1].percent)).toBe(100)
		expect(frames.map((f) => f.percent)).toEqual(
			[...frames.map((f) => f.percent)].sort((a, b) => a - b),
		)
		for (const frame of frames) {
			expect(Number.isFinite(frame.x)).toBe(true)
			expect(frame.clip).toBeGreaterThanOrEqual(0)
		}
	})

	test('the keyframes agree with the placement they are sampled from', async () => {
		const track = morphTrack(arrange(input({ itemCount: 7, availableSpace: 544 })))
		const { scrollMax } = track

		for (const frame of itemKeyframes(track, 2)) {
			const at = placeItemOnTrack(track, 2, (frame.percent / 100) * scrollMax)
			expect(round(frame.x)).toBe(round(at.x))
			expect(round(frame.clip)).toBe(round(at.clip))
		}
	})

	test('the gap survives the shift, and survives being reduced to keyframes', async () => {
		const arrangement = arrange(input({ itemCount: 7, availableSpace: 544 }))
		const track = morphTrack(arrangement)
		const frames = new Map(
			[...Array(7).keys()].map((index) => [index, itemKeyframes(track, index)]),
		)

		const asRendered = (index: number, scroll: number) => {
			const stops = frames.get(index)!
			const percent = (scroll / arrangement.scrollMax) * 100
			for (let stop = 1; stop < stops.length; stop += 1) {
				if (percent > stops[stop].percent) continue
				const width = stops[stop].percent - stops[stop - 1].percent || 1
				const ratio = (percent - stops[stop - 1].percent) / width
				return {
					x: stops[stop - 1].x + (stops[stop].x - stops[stop - 1].x) * ratio,
					clip: stops[stop - 1].clip + (stops[stop].clip - stops[stop - 1].clip) * ratio,
				}
			}
			return stops[stops.length - 1]
		}

		const paintedSpan =
			(place: (i: number, s: number) => { x: number; clip: number }) =>
			(index: number, scroll: number) => {
				const { x, clip } = place(index, scroll)
				const start = index * arrangement.stride - scroll + x + clip
				return { start, end: start + arrangement.itemSize - 2 * clip }
			}

		for (const place of [
			paintedSpan((i, s) => placeItemOnTrack(track, i, s)),
			paintedSpan(asRendered),
		]) {
			let checked = 0
			for (let scroll = 0; scroll <= arrangement.scrollMax; scroll += 2) {
				for (let index = 0; index < 6; index += 1) {
					const one = place(index, scroll)
					const next = place(index + 1, scroll)
					if (one.end - one.start <= 0.5 || next.end - next.start <= 0.5) continue
					expect(next.start - one.end).toBeCloseTo(arrangement.spacing, 2)
					checked += 1
				}
			}
			expect(checked).toBeGreaterThan(100)
		}
	})

	test("an item past an anchor holds that anchor's offset instead of snapping to zero", async () => {
		const arrangement = arrange(input({ itemCount: 7, availableSpace: 544 }))
		const [lead] = arrangement.keylines
		const beyond = placeItem(arrangement, 0, arrangement.scrollMax)

		expect(round(beyond.x)).toBe(round(lead.locOffset - lead.loc))
		expect(round(beyond.clip)).toBe(round(arrangement.itemSize / 2))
	})

	test('items outside the strip are fully cropped', async () => {
		const arrangement = arrange(input())
		const { clip } = placeItem(arrangement, 9, 0)

		expect(round(clip)).toBe(round(arrangement.itemSize / 2))
	})
})

describe('the edge crop floor', async () => {
	test('follows the aspect ratio between the three shapes the spec names', async () => {
		expect(minVisibleFraction(16 / 9)).toBeCloseTo(1 / 2, 6)
		expect(minVisibleFraction(1)).toBeCloseTo(1 / 3, 6)
		expect(minVisibleFraction(9 / 16)).toBeCloseTo(1 / 4, 6)
	})

	test('is clamped outside them, so no shape crops away to nothing', async () => {
		expect(minVisibleFraction(3)).toBeCloseTo(1 / 2, 6)
		expect(minVisibleFraction(0.2)).toBeCloseTo(1 / 4, 6)
	})

	test('is continuous, so a ratio nudged either way does not jump', async () => {
		for (const ratio of [9 / 16, 0.75, 1, 1.25, 16 / 9]) {
			const below = minVisibleFraction(ratio - 0.001)
			const above = minVisibleFraction(ratio + 0.001)
			expect(Math.abs(above - below)).toBeLessThan(0.01)
		}
	})

	test('rises with the ratio, so a wider item may give up more', async () => {
		const ratios = [0.5, 9 / 16, 0.8, 1, 1.4, 16 / 9, 2.5]
		const floors = ratios.map(minVisibleFraction)
		for (const [index, floor] of floors.slice(1).entries()) {
			expect(floor).toBeGreaterThanOrEqual(floors[index])
		}
	})

	test('treats a ratio nobody declared as square', async () => {
		for (const missing of [null, undefined, 0, -2, Number.NaN]) {
			expect(minVisibleFraction(missing)).toBeCloseTo(1 / 3, 6)
		}
	})
})
