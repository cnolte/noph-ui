import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import CircularProgress from './CircularProgress.svelte'
import LinearProgress from './LinearProgress.svelte'

const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect()

const renderLinear = async (props: Record<string, unknown>, style = '') => {
	await render(LinearProgress, {
		'aria-label': 'Progress',
		style: `width: 300px; ${style}`,
		...props,
	})
	return box('.np-container')
}

describe('LinearProgress', async () => {
	test('a low value shows as a dot, then the gap, then the track', async () => {
		const container = await renderLinear({ value: 0.01 })

		expect(box('.primary-bar').width).toBe(4)
		expect(box('.inactive-track').left - container.left).toBe(8)
	})

	test('no value shows no dot and no gap', async () => {
		const container = await renderLinear({ value: 0 })

		expect(box('.primary-bar').width).toBe(0)
		expect(box('.inactive-track').left - container.left).toBe(0)
	})

	test('the stop indicator stays 4px and sits in the round end of a thick track', async () => {
		const container = await renderLinear(
			{ value: 0.5 },
			'--np-linear-progress-track-height: 8px; --np-linear-progress-active-indicator-height: 8px',
		)

		const stop = box('.stop-indicator')
		expect(stop.width).toBe(4)
		expect(stop.height).toBe(4)
		expect(container.right - stop.right).toBe(2)
	})

	test('the stop indicator sits at the end of a default track', async () => {
		const container = await renderLinear({ value: 0.5 })

		expect(container.right - box('.stop-indicator').right).toBe(0)
	})

	test('stopIndicator={false} removes it', async () => {
		await renderLinear({ value: 0.5, stopIndicator: false })

		expect(document.querySelector('.stop-indicator')).toBeNull()
	})

	test('the stop indicator stays without a track', async () => {
		await renderLinear({ value: 0.5, track: false })

		expect(document.querySelector('.stop-indicator')).not.toBeNull()
	})
})

describe('CircularProgress', async () => {
	const trackOffset = async (value: number) => {
		const { unmount } = await render(CircularProgress, { 'aria-label': 'Progress', value })
		const offset = parseFloat(getComputedStyle(document.querySelector('.track')!).strokeDashoffset)
		unmount()
		return offset
	}

	test('a low value keeps the full gap to the track', async () => {
		const low = await trackOffset(0.01)
		const half = await trackOffset(0.5)

		// The track starts at the value plus the gap, so the gap is the same at 1% and at 50%.
		expect(-low - 1).toBeCloseTo(-half - 50, 3)
	})

	test('no value leaves the track whole', async () => {
		expect(await trackOffset(0)).toBeCloseTo(0, 3)
	})
})
