import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { docPages, indexPageOf, routeIdOf } from '../../scripts/docHeadings.ts'
import { highlight, labelOf, searchDocs, tokenize } from './searchDocs.ts'
import { searchIndex } from './searchIndex.ts'

test('the generated index still matches the pages', () => {
	const expected = docPages()
		.map((file) => indexPageOf(routeIdOf(file), readFileSync(file, 'utf8')))
		.filter((page) => page.title !== '')
	expect(searchIndex).toEqual(expected)
})

test('a component name finds its own page first', () => {
	const [first] = searchDocs(searchIndex, 'search')
	expect(first.route).toBe('/components/search')
	expect(first.hits[0].href).toBe('/components/search')
})

test('a custom property is found through the terms of its theming section', () => {
	const hits = searchDocs(searchIndex, '--np-search-shape').flatMap((group) => group.hits)
	expect(hits.map((hit) => hit.href)).toContain('/components/search#theming')
})

test('every token has to match, so an unrelated word drops the page', () => {
	expect(searchDocs(searchIndex, 'search zzzzz')).toEqual([])
})

test('a heading match outranks a body match', () => {
	const groups = searchDocs(searchIndex, 'theming')
	const headings = groups.flatMap((group) => group.hits).slice(0, 3)
	expect(headings.every((hit) => hit.heading.toLowerCase().includes('theming'))).toBe(true)
})

test('an empty query has no results', () => {
	expect(searchDocs(searchIndex, '   ')).toEqual([])
})

test('the group label comes from the first route segment', () => {
	expect(labelOf('/components/date-picker')).toBe('Components')
	expect(labelOf('/about/theming')).toBe('About')
})

test('highlight splits a heading around the matched tokens', () => {
	expect(highlight('Search app bar', tokenize('bar'))).toEqual([
		{ text: 'Search app ', match: false },
		{ text: 'bar', match: true },
	])
})

test('highlight leaves text alone when nothing was typed', () => {
	expect(highlight('Usage', [])).toEqual([{ text: 'Usage', match: false }])
})
