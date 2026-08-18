import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import {
	docPages,
	MANIFEST,
	manifestSource,
	routeIdOf,
	type Section,
	sectionsOf,
	withIds,
} from './docHeadings.ts'

const changed: string[] = []
const sections = new Map<string, Section[]>()

for (const file of docPages()) {
	const source = readFileSync(file, 'utf8')
	const next = withIds(source)
	if (next !== source) {
		writeFileSync(file, next)
		changed.push(file)
	}
	sections.set(routeIdOf(file), sectionsOf(next))
}

const manifest = manifestSource(sections)
const manifestChanged = !existsSync(MANIFEST) || readFileSync(MANIFEST, 'utf8') !== manifest
if (manifestChanged) writeFileSync(MANIFEST, manifest)

for (const file of changed) console.log(`ids added: ${file}`)
if (manifestChanged) console.log(`rewritten: ${MANIFEST}`)
if (changed.length === 0 && !manifestChanged) {
	console.log('Headings and table of contents are in sync.')
} else {
	console.log('\nRun npm run format next.')
}
