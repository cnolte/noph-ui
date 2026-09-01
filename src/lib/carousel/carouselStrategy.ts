import type { CarouselAlignment, CarouselVariant } from './types.ts'

export type CarouselKeylineKind = 'collapsed' | 'small' | 'medium' | 'large'

export interface CarouselKeyline {
	kind: CarouselKeylineKind
	size: number
	loc: number
	locOffset: number
}

export interface CarouselKeyframe {
	percent: number
	x: number
	clip: number
}

export interface CarouselStrategyInput {
	variant: CarouselVariant
	alignment: CarouselAlignment
	itemCount: number
	availableSpace: number
	itemSize: number
	spacing: number
	smallMin: number
	smallMax: number
}

export interface CarouselArrangement {
	smallCount: number
	mediumCount: number
	largeCount: number
	smallSize: number
	mediumSize: number
	largeSize: number
	stride: number
	itemSize: number
	spacing: number
	focal: number
	keylines: CarouselKeyline[]
	scrollMax: number
	trackSize: number
}

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value))

interface SlotTargets {
	small: number
	medium: number
	large: number
	smallLow: number
	smallHigh: number
}

interface Counts {
	small: number
	medium: number
	large: number
}

const slotTargets = (input: CarouselStrategyInput): SlotTargets => {
	const { availableSpace, itemSize, spacing, smallMin, smallMax, variant } = input
	const large = Math.min((variant === 'hero' ? itemSize * 2 : itemSize) + spacing, availableSpace)
	const smallLow = smallMin + spacing
	const smallHigh = smallMax + spacing
	const small = clamp((variant === 'hero' ? large : itemSize + spacing) / 3, smallLow, smallHigh)
	return { small, medium: (large + small) / 2, large, smallLow, smallHigh }
}

const descending = (from: number, to: number) => {
	const out: number[] = []
	for (let n = to; n >= from; n -= 1) out.push(n)
	return out
}

const candidateCounts = (input: CarouselStrategyInput, targets: SlotTargets) => {
	const { variant, alignment, availableSpace, spacing, smallMin } = input
	const centred = alignment === 'center'

	if (variant === 'hero') {
		const noRoom = availableSpace < (smallMin + spacing) * 2
		return {
			smalls: noRoom ? [0] : [centred ? 2 : 1],
			mediums: centred ? [0, 2] : [0, 1],
			larges: descending(1, Math.max(1, Math.floor(availableSpace / targets.large))),
		}
	}

	const flank = centred ? 2 : 1
	const smalls = [flank]
	const mediums = [flank, 0]
	const leastLargeSpace = availableSpace - (targets.medium + targets.small) * flank
	const budget = Math.max(1, input.itemCount - 2 * flank)
	const low = Math.max(1, Math.min(Math.floor(leastLargeSpace / targets.large), budget))
	const high = Math.max(low, Math.min(Math.ceil(availableSpace / targets.large), budget))
	return { smalls, mediums, larges: descending(low, high) }
}

interface Sizes {
	small: number
	medium: number
	large: number
	cost: number
}

const fit = (availableSpace: number, targets: SlotTargets, counts: Counts): Sizes | undefined => {
	const share = counts.small + counts.medium / 2
	const divisor = counts.large + counts.medium / 2
	if (divisor <= 0) return undefined

	const solve = (small: number) => (availableSpace - small * share) / divisor

	let small = clamp(targets.small, targets.smallLow, targets.smallHigh)
	let large = solve(small)
	if (large > targets.large && share > 0) {
		small = clamp(
			(availableSpace - targets.large * divisor) / share,
			targets.smallLow,
			targets.smallHigh,
		)
		large = solve(small)
	}
	if (large < small) return undefined

	const medium = (large + small) / 2
	const cost =
		Math.abs(large - targets.large) * counts.large +
		Math.abs(medium - targets.medium) * counts.medium +
		Math.abs(small - targets.small) * counts.small
	return { small, medium, large, cost }
}

const uniform = (input: CarouselStrategyInput): CarouselArrangement => {
	const { availableSpace, itemSize, spacing, itemCount } = input
	const count = Math.max(0, itemCount)
	const large = Math.max(spacing, Math.min(itemSize + spacing, availableSpace) || availableSpace)
	const scrollMax = Math.max(0, count * large - availableSpace)
	return {
		smallCount: 0,
		mediumCount: 0,
		largeCount: count,
		smallSize: large,
		mediumSize: large,
		largeSize: large,
		stride: large,
		itemSize: Math.max(0, large - spacing),
		spacing,
		focal: 0,
		keylines: [],
		scrollMax,
		trackSize: availableSpace + scrollMax,
	}
}

const build = (input: CarouselStrategyInput, sizes: Sizes, counts: Counts): CarouselArrangement => {
	const { alignment, spacing, availableSpace, itemCount } = input

	const order: CarouselKeylineKind[] = []
	const push = (kind: CarouselKeylineKind, count: number) => {
		for (let i = 0; i < count; i += 1) order.push(kind)
	}
	if (alignment === 'center') {
		push('small', counts.small / 2)
		push('medium', counts.medium / 2)
		push('large', counts.large)
		push('medium', counts.medium / 2)
		push('small', counts.small / 2)
	} else {
		push('large', counts.large)
		push('medium', counts.medium)
		push('small', counts.small)
	}

	const focal = order.indexOf('large')
	const stride = sizes.large
	const sizeOf = (kind: CarouselKeylineKind) =>
		kind === 'large' ? sizes.large : kind === 'medium' ? sizes.medium : sizes.small

	const keylines: CarouselKeyline[] = []
	let offset = 0
	for (const [index, kind] of order.entries()) {
		const size = sizeOf(kind)
		keylines.push({
			kind,
			size,
			loc: stride / 2 + (index - focal) * stride,
			locOffset: offset + size / 2,
		})
		offset += size
	}

	keylines.unshift({
		kind: 'collapsed',
		size: spacing,
		loc: keylines[0].loc - stride,
		locOffset: -spacing / 2,
	})
	keylines.push({
		kind: 'collapsed',
		size: spacing,
		loc: keylines[keylines.length - 1].loc + stride,
		locOffset: availableSpace + spacing / 2,
	})

	const scrollMax = Math.max(0, (itemCount - order.length + focal) * stride)
	return {
		smallCount: counts.small,
		mediumCount: counts.medium,
		largeCount: counts.large,
		smallSize: sizes.small,
		mediumSize: sizes.medium,
		largeSize: sizes.large,
		stride,
		itemSize: Math.max(0, sizes.large - spacing),
		spacing,
		focal: focal + 1,
		keylines,
		scrollMax,
		trackSize: availableSpace + scrollMax,
	}
}

export const arrange = (input: CarouselStrategyInput): CarouselArrangement => {
	if (input.variant === 'uncontained' || input.variant === 'full-screen') return uniform(input)
	if (input.availableSpace <= 0 || input.itemCount <= 0) return uniform(input)

	if (input.itemCount * (input.itemSize + input.spacing) - input.spacing <= input.availableSpace) {
		return uniform(input)
	}

	const targets = slotTargets(input)
	if (!(targets.large > 0)) return uniform(input)

	const { smalls, mediums, larges } = candidateCounts(input, targets)
	let best: { sizes: Sizes; counts: Counts } | undefined

	for (const large of larges) {
		for (const medium of mediums) {
			for (const small of smalls) {
				const counts = { small, medium, large }
				if (small + medium + large > input.itemCount) continue
				const sizes = fit(input.availableSpace, targets, counts)
				if (!sizes) continue
				if (best && sizes.cost >= best.sizes.cost) continue
				best = { sizes, counts }
			}
		}
	}

	if (!best && input.alignment === 'center') return arrange({ ...input, alignment: 'start' })
	if (!best) return uniform(input)

	if (best.counts.small === 0 && best.counts.medium === 0 && input.itemCount > best.counts.large) {
		const counts = { ...best.counts, small: 1 }
		const sizes = fit(input.availableSpace, targets, counts)
		if (sizes) best = { sizes, counts }
	}

	const arrangement = build(input, best.sizes, best.counts)
	return arrangement.scrollMax > 0 ? arrangement : uniform(input)
}

export const placeItem = (
	arrangement: CarouselArrangement,
	index: number,
	scroll: number,
): { x: number; clip: number } => {
	const { keylines, stride, spacing, itemSize } = arrangement
	if (keylines.length === 0) return { x: 0, clip: 0 }

	const unmorphed = index * stride + stride / 2 - scroll
	const first = keylines[0]
	const last = keylines[keylines.length - 1]
	const atAnchor = (keyline: CarouselKeyline) => ({
		x: keyline.locOffset - keyline.loc,
		clip: Math.max(0, (itemSize - (keyline.size - spacing)) / 2),
	})
	if (unmorphed <= first.loc) return atAnchor(first)
	if (unmorphed >= last.loc) return atAnchor(last)

	const slot = clamp(Math.ceil((unmorphed - first.loc) / stride), 1, keylines.length - 1)
	const low = keylines[slot - 1]
	const high = keylines[slot]
	const ratio = (unmorphed - low.loc) / stride
	const size = low.size + (high.size - low.size) * ratio
	const centre = low.locOffset + (high.locOffset - low.locOffset) * ratio
	return { x: centre - unmorphed, clip: Math.max(0, (itemSize - (size - spacing)) / 2) }
}

const withOrder = (
	arrangement: CarouselArrangement,
	order: CarouselKeyline[],
): CarouselArrangement => {
	const { keylines } = arrangement
	const slots = keylines.slice(1, -1)

	const shifted: CarouselKeyline[] = []
	let offset = 0
	for (const [index, slot] of order.entries()) {
		shifted.push({
			kind: slot.kind,
			size: slot.size,
			loc: slots[index].loc,
			locOffset: offset + slot.size / 2,
		})
		offset += slot.size
	}

	return {
		...arrangement,
		focal: order.findIndex((slot) => slot.kind === 'large') + 1,
		keylines: [keylines[0], ...shifted, keylines[keylines.length - 1]],
	}
}

export const shiftSteps = (
	arrangement: CarouselArrangement,
	towards: 'start' | 'end',
): CarouselArrangement[] => {
	const states = [arrangement]
	if (arrangement.keylines.length === 0) return states

	const order = arrangement.keylines.slice(1, -1)
	const movable = order.filter((slot) => slot.kind !== 'large').length
	if (movable === 0 || !order.some((slot) => slot.kind === 'large')) return states

	const working = [...order]
	for (let step = 0; step < movable; step += 1) {
		if (towards === 'end') {
			const [moved] = working.splice(working.length - 1, 1)
			working.splice(
				working.findIndex((slot) => slot.kind === 'large'),
				0,
				moved,
			)
		} else {
			const [moved] = working.splice(0, 1)
			working.splice(working.findLastIndex((slot) => slot.kind === 'large') + 1, 0, moved)
		}
		states.push(withOrder(arrangement, working))
	}
	return states
}

const shiftDistance = (arrangement: CarouselArrangement) => {
	const moving = arrangement.keylines
		.slice(1, -1)
		.filter((keyline) => keyline.kind !== 'large').length
	return moving * arrangement.stride
}

export interface CarouselTrack {
	arrangement: CarouselArrangement
	atStart: CarouselArrangement[]
	atEnd: CarouselArrangement[]
	startShift: number
	endShift: number
	scrollMax: number
	trackSize: number
}

export const morphTrack = (arrangement: CarouselArrangement): CarouselTrack => {
	const shift = shiftDistance(arrangement)
	const startShift = arrangement.focal > 1 ? shift : 0
	const endShift = shift
	const scrollMax = arrangement.scrollMax + startShift + endShift
	return {
		arrangement,
		atStart: startShift > 0 ? shiftSteps(arrangement, 'start') : [arrangement],
		atEnd: shiftSteps(arrangement, 'end'),
		startShift,
		endShift,
		scrollMax,
		trackSize: arrangement.trackSize - arrangement.scrollMax + scrollMax,
	}
}

const mix = (from: number, to: number, ratio: number) => from + (to - from) * ratio

export const placeItemOnTrack = (
	track: CarouselTrack,
	index: number,
	scroll: number,
): { x: number; clip: number } => {
	const { arrangement, atStart, atEnd, startShift, endShift } = track
	if (arrangement.keylines.length === 0) return placeItem(arrangement, index, scroll)

	const traversal = clamp(scroll - startShift, 0, arrangement.scrollMax)
	const held = scroll - traversal

	const along = (steps: CarouselArrangement[], ratio: number) => {
		const at = clamp(ratio, 0, 1) * (steps.length - 1)
		const step = Math.min(Math.floor(at), steps.length - 2)
		const low = placeItem(steps[step], index, traversal)
		const high = placeItem(steps[step + 1], index, traversal)
		const frac = at - step
		return { x: mix(low.x, high.x, frac) + held, clip: mix(low.clip, high.clip, frac) }
	}

	if (startShift > 0 && scroll < startShift && atStart.length > 1) {
		return along(atStart, 1 - scroll / startShift)
	}
	const endFrom = startShift + arrangement.scrollMax
	if (endShift > 0 && scroll > endFrom && atEnd.length > 1) {
		return along(atEnd, (scroll - endFrom) / endShift)
	}
	const base = placeItem(arrangement, index, traversal)
	return { x: base.x + held, clip: base.clip }
}

export const notches = (track: CarouselTrack): number[] => {
	const { arrangement, startShift, scrollMax } = track
	const uniform = arrangement.keylines.length === 0 || arrangement.stride <= 0
	const step = uniform ? Math.max(1, arrangement.stride) : arrangement.stride
	const last = uniform ? scrollMax : arrangement.scrollMax
	const base = uniform ? 0 : startShift

	const out = [0]
	for (let at = step; at <= last + 0.001; at += step) out.push(base + at)
	if (scrollMax > out[out.length - 1] + 0.001) out.push(scrollMax)
	return out
}

export const itemKeyframes = (
	track: CarouselTrack,
	index: number,
	subdivisions = 6,
): CarouselKeyframe[] => {
	const { arrangement, startShift, endShift, scrollMax } = track
	const { keylines, stride } = arrangement
	if (keylines.length === 0 || scrollMax <= 0) return []

	const offsets = new Set<number>([0, scrollMax, startShift, startShift + arrangement.scrollMax])
	for (const keyline of keylines) {
		const at = startShift + index * stride + stride / 2 - keyline.loc
		if (at > 0 && at < scrollMax) offsets.add(at)
	}
	const walk = (from: number, span: number, steps: number) => {
		if (span <= 0 || steps < 1) return
		const total = steps * subdivisions
		for (let part = 0; part <= total; part += 1) offsets.add(from + (span * part) / total)
	}
	walk(0, startShift, track.atStart.length - 1)
	walk(startShift + arrangement.scrollMax, endShift, track.atEnd.length - 1)

	return [...offsets]
		.sort((a, b) => a - b)
		.map((offset) => ({
			percent: (offset / scrollMax) * 100,
			...placeItemOnTrack(track, index, offset),
		}))
}

export const minVisibleFraction = (ratio: number | null | undefined): number => {
	if (ratio === null || ratio === undefined || !Number.isFinite(ratio) || ratio <= 0) return 1 / 3
	const wide = 16 / 9
	const tall = 9 / 16
	if (ratio >= wide) return 1 / 2
	if (ratio >= 1) return mix(1 / 3, 1 / 2, (ratio - 1) / (wide - 1))
	if (ratio >= tall) return mix(1 / 4, 1 / 3, (ratio - tall) / (1 - tall))
	return 1 / 4
}
