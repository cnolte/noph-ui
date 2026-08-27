import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import NavigationRail from './NavigationRail.svelte'

const rail = () => document.querySelector<HTMLElement>('nav')!

describe('NavigationRail', () => {
	test('renders no "undefined" class when none is passed', () => {
		render(NavigationRail)

		expect(rail().className).not.toContain('undefined')
		expect(rail().classList.contains('np-navigation-rail')).toBe(true)
	})

	test('keeps a consumer class alongside its own', () => {
		render(NavigationRail, { class: 'mine' })

		expect(rail().classList.contains('np-navigation-rail')).toBe(true)
		expect(rail().classList.contains('mine')).toBe(true)
		expect(rail().className).not.toContain('undefined')
	})
})
