import { readdirSync } from 'node:fs'
import path from 'node:path'
import { parse } from 'svelte/compiler'

export const HEADING_TAGS = ['h2', 'h3', 'h4']

export const LISTED_TAGS = ['h2', 'h3']

export const ROOT_PAGE = 'src/routes/+page.svelte'

export const MANIFEST = 'src/routes/tocSections.ts'

export const SEARCH_INDEX = 'src/routes/searchIndex.ts'

export interface Heading {
	tag: string
	text: string
	id: string | undefined
	anchorHref: string | undefined
	insertAt: number
	contentEnd: number
}

export const slugify = (text: string): string =>
	text
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const docPages = (root = process.cwd()): string[] =>
	readdirSync(path.join(root, 'src/routes'), { recursive: true, encoding: 'utf8' })
		.map((entry) => path.posix.join('src/routes', entry.split(path.sep).join('/')))
		.filter((file) => path.posix.basename(file) === '+page.svelte' && file !== ROOT_PAGE)
		.sort()

type Node = Record<string, unknown>

const isNode = (value: unknown): value is Node => typeof value === 'object' && value !== null

const CHILD_KEYS = [
	'fragment',
	'nodes',
	'body',
	'consequent',
	'alternate',
	'fallback',
	'pending',
	'then',
	'catch',
]

const walk = (value: unknown, visit: (node: Node) => void): void => {
	if (Array.isArray(value)) {
		for (const item of value) walk(item, visit)
		return
	}
	if (!isNode(value)) return
	if (typeof value.type === 'string') visit(value)
	for (const key of CHILD_KEYS) if (key in value) walk(value[key], visit)
}

const fragmentOf = (source: string) => parse(source, { modern: true }).fragment

const attribute = (node: Node, name: string): { value: string | undefined } | undefined => {
	if (!Array.isArray(node.attributes)) return undefined
	for (const candidate of node.attributes) {
		if (!isNode(candidate)) continue
		if (candidate.type !== 'Attribute' || candidate.name !== name) continue
		const value = candidate.value
		if (!Array.isArray(value) || value.length !== 1) return { value: undefined }
		const [part] = value
		if (!isNode(part) || part.type !== 'Text' || typeof part.data !== 'string') {
			return { value: undefined }
		}
		return { value: part.data }
	}
	return undefined
}

const isAnchor = (child: unknown): child is Node =>
	isNode(child) &&
	child.type === 'RegularElement' &&
	child.name === 'a' &&
	attribute(child, 'aria-hidden')?.value === 'true'

const anchorOf = (node: Node): Node | undefined => {
	const fragment = node.fragment
	if (!isNode(fragment) || !Array.isArray(fragment.nodes)) return undefined
	return fragment.nodes.find(isAnchor)
}

const staticText = (node: Node): string | undefined => {
	const fragment = node.fragment
	if (!isNode(fragment) || !Array.isArray(fragment.nodes)) return undefined
	let text = ''
	for (const child of fragment.nodes) {
		if (isAnchor(child)) continue
		if (!isNode(child) || child.type !== 'Text' || typeof child.data !== 'string') return undefined
		text += child.data
	}
	return text.trim()
}

export const headingsOf = (source: string): Heading[] => {
	const headings: Heading[] = []
	walk(fragmentOf(source), (node) => {
		if (node.type !== 'RegularElement' || typeof node.name !== 'string') return
		if (!HEADING_TAGS.includes(node.name)) return
		if (typeof node.start !== 'number' || typeof node.end !== 'number') return
		const text = staticText(node)
		if (text === undefined) {
			throw new Error(
				`A <${node.name}> holds markup instead of plain text, so it needs its id by hand`,
			)
		}
		const anchor = anchorOf(node)
		headings.push({
			tag: node.name,
			text,
			id: attribute(node, 'id')?.value,
			anchorHref: anchor && attribute(anchor, 'href')?.value,
			insertAt: node.start + 1 + node.name.length,
			contentEnd: node.end - node.name.length - 3,
		})
	})
	return headings
}

export const idsOf = (source: string): string[] => {
	const ids: string[] = []
	walk(fragmentOf(source), (node) => {
		const id = attribute(node, 'id')?.value
		if (id !== undefined) ids.push(id)
	})
	return ids
}

export const assignIds = (source: string): { heading: Heading; id: string }[] => {
	const taken = new Set(idsOf(source))
	return headingsOf(source).map((heading) => {
		if (heading.id !== undefined) return { heading, id: heading.id }
		const base = slugify(heading.text) || 'section'
		let id = base
		for (let suffix = 2; taken.has(id); suffix += 1) id = `${base}-${suffix}`
		taken.add(id)
		return { heading, id }
	})
}

export const anchorMarkup = (id: string): string =>
	`<a href="#${id}" aria-hidden="true" tabindex="-1">#</a>`

export const withAnchors = (source: string): string => {
	let code = source
	for (const { heading, id } of assignIds(source).reverse()) {
		if (heading.anchorHref === undefined) {
			const anchor = anchorMarkup(id)
			code = code.slice(0, heading.contentEnd) + anchor + code.slice(heading.contentEnd)
		}
		if (heading.id === undefined) {
			code = `${code.slice(0, heading.insertAt)} id="${id}"${code.slice(heading.insertAt)}`
		}
	}
	return code
}

export const routeIdOf = (file: string): string =>
	file.replace(/^src\/routes/, '').replace(/\/\+page\.svelte$/, '') || '/'

export interface Section {
	id: string
	text: string
	level: number
}

export const sectionsOf = (source: string): Section[] =>
	headingsOf(source)
		.filter((heading) => LISTED_TAGS.includes(heading.tag) && heading.id !== undefined)
		.map((heading) => ({
			id: heading.id as string,
			text: heading.text,
			level: Number(heading.tag.slice(1)),
		}))

const deepText = (value: unknown): string => {
	if (Array.isArray(value)) return value.map(deepText).join('')
	if (!isNode(value)) return ''
	if (value.type === 'Text' && typeof value.data === 'string') return value.data
	if (isAnchor(value)) return ''
	let text = ''
	for (const key of CHILD_KEYS) if (key in value) text += deepText(value[key])
	return text
}

const collapse = (text: string) => text.replace(/\s+/g, ' ').trim()

const BODY_LENGTH = 180

const clamp = (text: string): string => {
	if (text.length <= BODY_LENGTH) return text
	const cut = text.slice(0, BODY_LENGTH)
	const space = cut.lastIndexOf(' ')
	return `${(space > BODY_LENGTH * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`
}

const TERM_LENGTH = 48

const TERMS_PER_SECTION = 24

interface Chunk {
	kind: 'heading' | 'body' | 'term'
	tag: string
	id: string | undefined
	text: string
}

const chunksOf = (source: string): Chunk[] => {
	const chunks: Chunk[] = []
	walk(fragmentOf(source), (node) => {
		if (node.type !== 'RegularElement' || typeof node.name !== 'string') return
		const kind =
			node.name === 'h1' || HEADING_TAGS.includes(node.name)
				? 'heading'
				: node.name === 'p'
					? 'body'
					: node.name === 'code'
						? 'term'
						: undefined
		if (kind === undefined) return
		chunks.push({
			kind,
			tag: node.name,
			id: attribute(node, 'id')?.value,
			text: collapse(deepText(node.fragment)),
		})
	})
	return chunks
}

export interface IndexSection {
	id: string
	text: string
	level: number
	body: string
	terms: string[]
}

export interface IndexPage {
	route: string
	title: string
	body: string
	terms: string[]
	sections: IndexSection[]
}

interface Bucket {
	body: string
	terms: Set<string>
}

const drain = (bucket: Bucket): string[] => [...bucket.terms].slice(0, TERMS_PER_SECTION)

export const indexPageOf = (route: string, source: string): IndexPage => {
	const page: Bucket = { body: '', terms: new Set() }
	const sections: (IndexSection & { bucket: Bucket })[] = []
	let title = ''
	let current: Bucket | undefined

	for (const chunk of chunksOf(source)) {
		if (chunk.kind === 'heading') {
			if (chunk.tag === 'h1') {
				title ||= chunk.text
				current = undefined
			} else if (LISTED_TAGS.includes(chunk.tag) && chunk.id !== undefined) {
				const bucket: Bucket = { body: '', terms: new Set() }
				sections.push({
					id: chunk.id,
					text: chunk.text,
					level: Number(chunk.tag.slice(1)),
					body: '',
					terms: [],
					bucket,
				})
				current = bucket
			} else {
				current?.terms.add(chunk.text)
			}
			continue
		}
		const bucket = current ?? page
		if (chunk.kind === 'body') bucket.body ||= clamp(chunk.text)
		else if (chunk.text && chunk.text.length <= TERM_LENGTH) bucket.terms.add(chunk.text)
	}

	return {
		route,
		title,
		body: page.body,
		terms: drain(page),
		sections: sections.map(({ bucket, ...section }) => ({
			...section,
			body: bucket.body,
			terms: drain(bucket),
		})),
	}
}

const quote = (value: string) =>
	value.includes("'") ? JSON.stringify(value) : `'${value.replace(/\\/g, '\\\\')}'`

const quoteList = (values: string[]) => `[${values.map(quote).join(', ')}]`

export const searchIndexSource = (pages: IndexPage[]): string => {
	const entries = pages
		.filter((page) => page.title !== '')
		.map((page) => {
			const sections = page.sections
				.map(
					(section) =>
						`\t\t\t{\n\t\t\t\tid: ${quote(section.id)},\n\t\t\t\ttext: ${quote(section.text)},\n\t\t\t\tlevel: ${section.level},\n\t\t\t\tbody: ${quote(section.body)},\n\t\t\t\tterms: ${quoteList(section.terms)},\n\t\t\t},`,
				)
				.join('\n')
			return `\t{\n\t\troute: ${quote(page.route)},\n\t\ttitle: ${quote(page.title)},\n\t\tbody: ${quote(page.body)},\n\t\tterms: ${quoteList(page.terms)},\n\t\tsections: [\n${sections}\n\t\t],\n\t},`
		})
		.join('\n')
	return `export interface SearchSection {
	id: string
	text: string
	level: number
	body: string
	terms: string[]
}

export interface SearchPage {
	route: string
	title: string
	body: string
	terms: string[]
	sections: SearchSection[]
}

export const searchIndex: SearchPage[] = [
${entries}
]
`
}

export const manifestSource = (pages: Map<string, Section[]>): string => {
	const entries = [...pages]
		.filter(([, sections]) => sections.length > 0)
		.map(([route, sections]) => {
			const listed = sections
				.map(
					({ id, text, level }) =>
						`\t\t{ id: ${quote(id)}, text: ${quote(text)}, level: ${level} },`,
				)
				.join('\n')
			return `\t${quote(route)}: [\n${listed}\n\t],`
		})
		.join('\n')
	return `export interface TocSection {
	id: string
	text: string
	level: number
}

export const tocSections: Record<string, TocSection[]> = {
${entries}
}
`
}
