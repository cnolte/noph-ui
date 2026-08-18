import { readdirSync } from 'node:fs'
import path from 'node:path'
import { parse } from 'svelte/compiler'

export const HEADING_TAGS = ['h2', 'h3', 'h4']

export const LISTED_TAGS = ['h2', 'h3']

export const ROOT_PAGE = 'src/routes/+page.svelte'

export const MANIFEST = 'src/routes/tocSections.ts'

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

const quote = (value: string) =>
	value.includes("'") ? JSON.stringify(value) : `'${value.replace(/\\/g, '\\\\')}'`

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
