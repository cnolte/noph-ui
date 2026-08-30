import type { SearchPage } from './searchIndex.ts'

export interface DocsToken {
	text: string
	boundary: RegExp
}

export interface DocsHit {
	href: string
	heading: string
	body: string
	score: number
	section: boolean
}

export interface DocsGroup {
	route: string
	title: string
	label: string
	score: number
	hits: DocsHit[]
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const tokenize = (query: string): DocsToken[] =>
	query
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 8)
		.map((text) => ({ text, boundary: new RegExp(`\\b${escape(text)}`) }))

const HEADING_SCORE = { exact: 100, boundary: 60, loose: 30 }
const TERM_SCORE = { exact: 50, boundary: 35, loose: 18 }
const BODY_SCORE = { exact: 20, boundary: 12, loose: 6 }

const rate = (haystack: string, token: DocsToken, scale: typeof HEADING_SCORE): number => {
	if (!haystack.includes(token.text)) return 0
	if (haystack === token.text) return scale.exact
	return token.boundary.test(haystack) ? scale.boundary : scale.loose
}

const best = (haystacks: string[], token: DocsToken, scale: typeof HEADING_SCORE): number => {
	let score = 0
	for (const haystack of haystacks) score = Math.max(score, rate(haystack, token, scale))
	return score
}

const scoreOf = (heading: string, terms: string[], body: string, tokens: DocsToken[]): number => {
	const lowerHeading = heading.toLowerCase()
	const lowerTerms = terms.map((term) => term.toLowerCase())
	const lowerBody = body.toLowerCase()
	let total = 0
	for (const token of tokens) {
		const score = Math.max(
			rate(lowerHeading, token, HEADING_SCORE),
			best(lowerTerms, token, TERM_SCORE),
			rate(lowerBody, token, BODY_SCORE),
		)
		if (score === 0) return 0
		total += score
	}
	const phrase = tokens.map((token) => token.text).join(' ')
	if (tokens.length > 1 && lowerHeading.includes(phrase)) total += HEADING_SCORE.boundary
	return total
}

const preview = (terms: string[], tokens: DocsToken[]): string =>
	[...terms]
		.sort((a, b) => Number(matches(b, tokens)) - Number(matches(a, tokens)))
		.slice(0, 4)
		.join(' · ')

const matches = (term: string, tokens: DocsToken[]): boolean =>
	tokens.some((token) => term.toLowerCase().includes(token.text))

export const labelOf = (route: string): string => {
	const segment = route.split('/')[1] ?? ''
	if (segment === '') return 'Docs'
	return segment.replace(/-/g, ' ').replace(/^./, (first) => first.toUpperCase())
}

const MAX_GROUPS = 8
const MAX_HITS = 5

export const searchDocs = (index: SearchPage[], query: string): DocsGroup[] => {
	const tokens = tokenize(query)
	if (tokens.length === 0) return []

	const groups: DocsGroup[] = []
	for (const page of index) {
		const hits: DocsHit[] = []
		const pageScore = scoreOf(page.title, page.terms, page.body, tokens)
		if (pageScore > 0) {
			hits.push({
				href: page.route,
				heading: page.title,
				body: page.body,
				score: pageScore + HEADING_SCORE.loose,
				section: false,
			})
		}
		for (const section of page.sections) {
			const score = scoreOf(section.text, section.terms, section.body, tokens)
			if (score === 0) continue
			hits.push({
				href: `${page.route}#${section.id}`,
				heading: section.text,
				body: section.body || preview(section.terms, tokens),
				score,
				section: true,
			})
		}
		if (hits.length === 0) continue
		hits.sort((a, b) => b.score - a.score)
		groups.push({
			route: page.route,
			title: page.title,
			label: labelOf(page.route),
			score: Math.max(...hits.map((hit) => hit.score)),
			hits: hits.slice(0, MAX_HITS),
		})
	}

	groups.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
	return groups.slice(0, MAX_GROUPS)
}

export interface HighlightPart {
	text: string
	match: boolean
}

export const highlight = (text: string, tokens: DocsToken[]): HighlightPart[] => {
	if (tokens.length === 0 || text === '') return [{ text, match: false }]
	const pattern = new RegExp(tokens.map((token) => escape(token.text)).join('|'), 'gi')
	const parts: HighlightPart[] = []
	let last = 0
	for (const found of text.matchAll(pattern)) {
		if (found.index > last) parts.push({ text: text.slice(last, found.index), match: false })
		parts.push({ text: found[0], match: true })
		last = found.index + found[0].length
	}
	if (last < text.length) parts.push({ text: text.slice(last), match: false })
	return parts
}
