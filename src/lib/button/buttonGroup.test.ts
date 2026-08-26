import { describe, expect, test } from 'vitest'
import { expandedWidths, parseMotion } from './buttonGroup.ts'

const total = (widths: number[]) => widths.reduce((sum, width) => sum + width, 0)

describe('expandedWidths', () => {
	test('the first button grows by the ratio and the next one gives up the space', () => {
		const widths = [100, 100, 100]
		const next = expandedWidths(widths, 0, 0.15, 24)
		expect(next).toEqual([115, 85, 100])
		expect(total(next)).toBe(total(widths))
	})

	test('the last button compresses its predecessor', () => {
		const next = expandedWidths([100, 100, 100], 2, 0.15, 24)
		expect(next).toEqual([100, 85, 115])
	})

	test('a middle button takes half of the growth from each side', () => {
		const widths = [100, 100, 100]
		const next = expandedWidths(widths, 1, 0.15, 24)
		expect(next).toEqual([92, 116, 92])
		expect(total(next)).toBe(total(widths))
	})

	test('the compression limit caps what a neighbour gives up', () => {
		expect(expandedWidths([400, 400], 0, 0.15, 24)).toEqual([424, 376])
	})

	test('a neighbour never compresses past zero', () => {
		expect(expandedWidths([100, 6, 100], 0, 0.15, 24)).toEqual([106, 0, 100])
	})

	test('a ratio of zero leaves every width alone', () => {
		expect(expandedWidths([100, 100], 0, 0, 24)).toEqual([100, 100])
	})

	test('a single button has no neighbour to compress', () => {
		expect(expandedWidths([100], 0, 0.15, 24)).toEqual([100])
	})

	test('an unknown index leaves every width alone', () => {
		expect(expandedWidths([100, 100], -1, 0.15, 24)).toEqual([100, 100])
	})
})

describe('parseMotion', () => {
	test('reads duration and easing of a motion token', () => {
		expect(parseMotion('350ms cubic-bezier(0.42, 1.67, 0.21, 0.9)')).toEqual({
			duration: 350,
			easing: 'cubic-bezier(0.42, 1.67, 0.21, 0.9)',
		})
	})

	test('reads seconds', () => {
		expect(parseMotion('0.5s ease-out')).toEqual({ duration: 500, easing: 'ease-out' })
	})

	test('falls back when the token is missing', () => {
		expect(parseMotion('')).toEqual({ duration: 0, easing: 'linear' })
	})
})
