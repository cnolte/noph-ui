import { describe, expect, test } from 'vitest'
import { parseMotion } from './animation.ts'

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
