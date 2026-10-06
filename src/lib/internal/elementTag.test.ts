import { describe, expect, test } from 'vitest'
import { buttonType, elementTag } from './elementTag.ts'

const noop = () => {}

describe('elementTag', () => {
	test('is static content without anything that makes it interactive', () => {
		expect(elementTag({})).toBe('div')
	})

	test('follows href, then the button triggers', () => {
		expect(elementTag({ href: '#target' })).toBe('a')
		expect(elementTag({ onclick: noop })).toBe('button')
		expect(elementTag({ command: 'close' })).toBe('button')
		expect(elementTag({ popovertarget: 'menu' })).toBe('button')
	})

	test('lets an explicit kind win over the attributes', () => {
		expect(elementTag({ onclick: noop }, 'text')).toBe('div')
		expect(elementTag({}, 'link')).toBe('a')
		expect(elementTag({ href: '#target' }, 'button')).toBe('button')
		expect(elementTag({}, 'submit')).toBe('button')
		expect(elementTag({}, 'reset')).toBe('button')
	})
})

describe('buttonType', () => {
	test('keeps native button types and falls back to button', () => {
		expect(buttonType('submit')).toBe('submit')
		expect(buttonType('reset')).toBe('reset')
		expect(buttonType('button')).toBe('button')
		expect(buttonType('text')).toBe('button')
		expect(buttonType(undefined)).toBe('button')
	})
})
