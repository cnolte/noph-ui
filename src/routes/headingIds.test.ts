import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import {
	docPages,
	headingsOf,
	ROOT_PAGE,
	routeIdOf,
	sectionsOf,
	withAnchors,
} from '../../scripts/docHeadings.ts'
import { tocSections } from './tocSections.ts'

const pages = docPages()
const read = (file: string) => readFileSync(file, 'utf8')

test('there are pages to check', () => {
	expect(pages.length).toBeGreaterThan(20)
})

describe.each(pages)('%s', (file) => {
	test('every h2, h3 and h4 carries the id the generator would give it', () => {
		const source = read(file)
		expect(withAnchors(source)).toBe(source)
	})

	test('every heading has an anchor pointing at its own id', () => {
		const headings = headingsOf(read(file))
		expect(headings.map((heading) => heading.anchorHref)).toEqual(
			headings.map((heading) => `#${heading.id}`),
		)
	})

	test('the ids are unique within the page', () => {
		const ids = headingsOf(read(file)).map((heading) => heading.id)
		expect(ids).toEqual([...new Set(ids)])
	})
})

test('the landing page keeps its headings plain', () => {
	const ids = headingsOf(read(ROOT_PAGE)).map((heading) => heading.id)
	expect(ids.every((id) => id === undefined)).toBe(true)
})

test('the generated list of sections still matches the pages', () => {
	const expected = Object.fromEntries(
		pages
			.map((file) => [routeIdOf(file), sectionsOf(read(file))] as const)
			.filter(([, sections]) => sections.length > 0),
	)
	expect(tocSections).toEqual(expected)
})
