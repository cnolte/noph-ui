import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './NavigationRailHarness.test.svelte'
import { motionOf } from '#lib/animation.js'
import { morph } from './morph.js'

const rail = () => document.querySelector<HTMLElement>('nav')!
const items = () => [...rail().querySelectorAll<HTMLElement>('.np-navigation-action')]
const keyframes = (element: Element) =>
	element.getAnimations()[0]?.effect instanceof KeyframeEffect
		? (element.getAnimations()[0].effect as KeyframeEffect).getKeyframes()
		: []

describe('morph', async () => {
	test('reads the motion token into Web Animations timing', async () => {
		await render(Harness)

		expect(motionOf(rail(), '--np-motion-standard-fast-spatial')).toEqual({
			duration: 350,
			easing: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
		})
	})

	test('starts every part where it was in the collapsed layout', async () => {
		await render(Harness)
		const indicatorBefore = items()[0]
			.querySelector('.np-navigation-action-indicator')!
			.getBoundingClientRect()

		// A long animation, so the keyframes can be read while it runs.
		const done = morph(
			rail(),
			// The layout switches with these classes, synchronously, as the rail does it.
			() => {
				rail().classList.add('np-navigation-rail-expanded')
				items().forEach((item) => {
					item.classList.add('np-navigation-action-expanded')
					item.querySelector('.np-label-below')!.classList.add('np-away')
					item.querySelector('.np-label-beside')!.classList.remove('np-away')
				})
			},
			{ duration: 100_000 },
		)
		await expect.poll(() => rail().getAnimations().length).toBeGreaterThan(0)

		expect(keyframes(rail())[0].width).toBe('96px')
		// Lifted, or the expanded rail's min-width would snap it open and the content would jump.
		expect(keyframes(rail())[0].minWidth).toBe('0px')
		expect(keyframes(items()[1])[0].transform).toBe('translate(0px, 12px)')
		const indicator = items()[0].querySelector('.np-navigation-action-indicator')!
		expect(keyframes(indicator)[0]).toMatchObject({
			width: `${indicatorBefore.width}px`,
			height: `${indicatorBefore.height}px`,
			transform: 'translate(0px, 6px)',
		})
		const icon = items()[0].querySelector('.np-navigation-action-icon')!
		expect(keyframes(icon)[0].transform).toBe('translate(0px, -6px)')

		rail()
			.getAnimations({ subtree: true })
			.forEach((animation) => animation.cancel())
		await done
	})

	test('leaves alone an item that appears with the switch', async () => {
		await render(Harness)
		const section = rail().querySelector<HTMLElement>('.np-navigation-rail-section')!
		const appearing = section.querySelector('.np-navigation-action')!

		const done = morph(
			rail(),
			() => {
				rail().classList.add('np-navigation-rail-expanded')
				section.hidden = false
			},
			{ duration: 100_000 },
		)
		await expect.poll(() => rail().getAnimations().length).toBeGreaterThan(0)

		expect(appearing.getAnimations()).toHaveLength(0)

		rail()
			.getAnimations({ subtree: true })
			.forEach((animation) => animation.cancel())
		await done
	})
})
