import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Harness from './DemoHarness.test.svelte'
import AccessibleNames from './demos/AccessibleNames.svelte'
import InteractiveItems from './demos/InteractiveItems.svelte'
import Labels from './demos/Labels.svelte'
import ShowAll from './demos/ShowAll.svelte'
import ThemingExample from './demos/ThemingExample.svelte'
import Usage from './demos/Usage.svelte'
import Variants from './demos/Variants.svelte'

const demos = {
	AccessibleNames,
	InteractiveItems,
	Labels,
	ShowAll,
	ThemingExample,
	Usage,
	Variants,
}

const box = (element: Element) => element.getBoundingClientRect()

describe('carousel demos', async () => {
	for (const [name, demo] of Object.entries(demos)) {
		test(`${name} lays out with a visible carousel`, async () => {
			await render(Harness, { demo })

			const carousels = [...document.querySelectorAll<HTMLElement>('.np-carousel')]
			expect(carousels.length).toBeGreaterThan(0)

			for (const carousel of carousels) {
				expect(box(carousel).width).toBeGreaterThan(100)
				expect(box(carousel).height).toBeGreaterThan(50)

				const item = carousel.querySelector<HTMLElement>('.np-carousel-item')!
				expect(box(item).width).toBeGreaterThan(20)
				expect(box(item).height).toBeGreaterThan(50)
			}
		})
	}

	test('Variants shows every layout, so no one of them needs a demo of its own', async () => {
		await render(Harness, { demo: Variants })

		expect(document.querySelectorAll('.np-carousel')).toHaveLength(5)
		for (const variant of ['multi-browse', 'uncontained', 'hero', 'full-screen']) {
			expect(document.querySelectorAll(`.np-carousel-${variant}`).length).toBeGreaterThan(0)
		}
		expect(document.querySelectorAll('.np-carousel-item-aspect').length).toBeGreaterThan(0)
	})
})
