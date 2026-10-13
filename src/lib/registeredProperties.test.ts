import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { expect, test } from 'vitest'

const root = import.meta.dirname
const sources = readdirSync(root, { recursive: true, encoding: 'utf8' })
	.filter((file) => /\.(svelte|css|ts)$/.test(file) && !/\.test\.|__visual__/.test(file))
	.map((file) => ({ file, text: readFileSync(join(root, file), 'utf8') }))

const registered = sources.flatMap(({ file, text }) =>
	[...text.matchAll(/@property (--_[\w-]+)/g)].map((match) => ({ name: match[1], file })),
)

test('there are private registered properties to check', () => {
	expect(registered.length).toBeGreaterThan(0)
})

test.each(registered)('$name stays inside the folder of $file', ({ name, file }) => {
	const pattern = new RegExp(`${name}(?![\\w-])`)
	const outside = sources
		.filter(({ text }) => pattern.test(text))
		.map(({ file: user }) => user)
		.filter((user) => dirname(user) !== dirname(file))
	expect(outside).toEqual([])
})
