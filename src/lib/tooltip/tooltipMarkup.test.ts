import { expect, test } from 'vitest'
import { render } from 'svelte/server'
import Harness from './TooltipHarness.test.svelte'
import RichHarness from './RichTooltipHarness.test.svelte'

const attributesOf = (html: string, id: string) =>
	html.match(new RegExp(`<[a-z]+[^>]*id="${id}"[^>]*>`))?.[0] ?? ''

test('the server sends everything the browser needs to run the tooltip without JavaScript', () => {
	const { body } = render(Harness)

	for (const id of ['button-anchor', 'icon-button-anchor']) {
		const anchor = attributesOf(body, id)
		const tooltipId = anchor.match(/interestfor="([^"]+)"/)?.[1]
		expect(tooltipId, `${id} is an interest invoker`).toBeTruthy()
		expect(anchor, `${id} describes itself with its tooltip`).toContain(
			`aria-describedby="${tooltipId}"`,
		)
		const tooltip = attributesOf(body, tooltipId!)
		expect(tooltip).toContain('popover="hint"')
		expect(tooltip).toContain('role="tooltip"')
	}

	expect(body).toContain('Save the file')
	expect(body).toContain('Add to favorites')
})

test('a disabled control has no tooltip to point at', () => {
	const { body } = render(Harness, { props: { disabled: true } })

	for (const id of ['button-anchor', 'icon-button-anchor']) {
		expect(attributesOf(body, id), id).not.toContain('interestfor')
	}
	expect(body).not.toContain('Save the file<')
})

test('a control that invokes something of its own keeps its interestfor', () => {
	for (const disabled of [false, true]) {
		const { body } = render(Harness, { props: { disabled } })
		expect(attributesOf(body, 'own-interest')).toContain('interestfor="side-panel"')
	}
})

test('an anchor that cannot be an interest invoker still gets its tooltip', () => {
	const { body } = render(Harness)

	expect(attributesOf(body, 'plain-anchor')).toContain('aria-describedby="plain-tip"')
	expect(attributesOf(body, 'plain-tip')).toContain('popover="hint"')
})

test('a rich tooltip is complete in the server markup too', () => {
	const { body } = render(RichHarness)

	const control = attributesOf(body, 'rich-anchor')
	expect(control).toContain('popovertarget="rich-tip"')
	expect(control).toContain('popovertargetaction="show"')

	const panel = attributesOf(body, 'rich-tip')
	expect(panel).toContain('popover="auto"')
	expect(panel).toContain('role="tooltip"')

	expect(body).toContain('Rich tooltip')
	expect(body).toContain('Learn more')
})
