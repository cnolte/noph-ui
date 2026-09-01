import { expect, test } from 'vitest'
import { render } from 'svelte/server'
import Harness from './CarouselHarness.test.svelte'

test('the server sends a named carousel group with its items in place', () => {
	const { body } = render(Harness, { props: { count: 4 } })

	expect(body).toContain('role="group"')
	expect(body).toContain('aria-roledescription="carousel"')
	expect(body).toContain('aria-label="Featured photos"')
	expect(body.match(/class="np-carousel-item[ "]/g) ?? []).toHaveLength(4)
	expect(body).toContain('Sunset')
})

test('the server never ships the morphing layout, which needs measurements it cannot take', () => {
	const { body } = render(Harness, { props: { count: 4 } })
	expect(body).not.toContain('np-carousel-morphing')
})

test('the carousel container is not a focus target in the server output either', () => {
	const { body } = render(Harness, { props: { count: 3 } })

	expect(body).not.toContain('tabindex')
})

test('the measurement probe is rendered off the variant, so hydration cannot disagree', () => {
	const keylined = render(Harness, { props: { count: 2, variant: 'multi-browse' } }).body
	const plain = render(Harness, { props: { count: 2, variant: 'uncontained' } }).body

	expect(keylined).toContain('np-carousel-metrics')
	expect(plain).not.toContain('np-carousel-metrics')
})

test('an item is named without its position until the client has counted the items', () => {
	const { body } = render(Harness, { props: { count: 3 } })
	expect(body).not.toContain(' of 3')
	expect(body).toContain('Sunset')
})

test('every item type renders its own element on the server', () => {
	expect(render(Harness, { props: { count: 1, type: 'button' } }).body).toContain('<button')
	expect(render(Harness, { props: { count: 1, type: 'link' } }).body).toContain('<a')
	expect(render(Harness, { props: { count: 1, type: 'text' } }).body).toContain('<div')
})

test('a disabled item is marked disabled and carries no state layer', () => {
	const { body } = render(Harness, { props: { count: 2, disabledIndex: 0 } })

	expect(body).toContain('aria-disabled="true"')
	expect(body.match(/np-ripple-surface/g) ?? []).toHaveLength(1)
})
