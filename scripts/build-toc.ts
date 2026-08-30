import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import {
	docPages,
	type IndexPage,
	indexPageOf,
	MANIFEST,
	manifestSource,
	routeIdOf,
	SEARCH_INDEX,
	searchIndexSource,
	type Section,
	sectionsOf,
	withAnchors,
} from './docHeadings.ts'

const changed: string[] = []
const sections = new Map<string, Section[]>()
const pages: IndexPage[] = []

for (const file of docPages()) {
	const source = readFileSync(file, 'utf8')
	const next = withAnchors(source)
	if (next !== source) {
		writeFileSync(file, next)
		changed.push(file)
	}
	const route = routeIdOf(file)
	sections.set(route, sectionsOf(next))
	pages.push(indexPageOf(route, next))
}

const written: string[] = []

const sync = (file: string, contents: string) => {
	if (existsSync(file) && readFileSync(file, 'utf8') === contents) return
	writeFileSync(file, contents)
	written.push(file)
}

sync(MANIFEST, manifestSource(sections))
sync(SEARCH_INDEX, searchIndexSource(pages))

for (const file of changed) console.log(`ids added: ${file}`)
for (const file of written) console.log(`rewritten: ${file}`)
if (changed.length === 0 && written.length === 0) {
	console.log('Headings, table of contents and search index are in sync.')
} else {
	console.log('\nRun npm run format next.')
}
