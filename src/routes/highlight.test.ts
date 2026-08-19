import { expect, test } from 'vitest'
import { highlight } from './highlight.ts'

test('a TypeScript snippet opening with a filename comment is highlighted as TypeScript', () => {
	const result = highlight(`// registration.schema.ts
import * as v from 'valibot'

export const registrationSchema = v.object({
	name: v.pipe(v.string(), v.trim()),
})`)
	expect(result).toContain('<span class="token comment">// registration.schema.ts</span>')
	expect(result).toContain('<span class="token keyword">import</span>')
	expect(result).toContain('<span class="token string">\'valibot\'</span>')
})

test('a TypeScript snippet without a leading comment still is highlighted as TypeScript', () => {
	expect(highlight("import { form } from '$app/server'")).toContain(
		'<span class="token keyword">import</span>',
	)
})

test('a CSS snippet opening with a filename comment is highlighted as CSS', () => {
	const result = highlight(`/* app.css */
:root {
	color: red;
}`)
	expect(result).toContain('<span class="token comment">/* app.css */</span>')
	expect(result).toContain('<span class="token property">color</span>')
})

test('a list of CSS declarations is highlighted as CSS', () => {
	const result = highlight(`box-shadow: var(--np-elevation-1);
box-shadow: var(--np-elevation-2);`)
	expect(result).toContain('<span class="token property">box-shadow</span>')
})

test('markup keeps its tags and Svelte expressions', () => {
	const result = highlight('<Button onclick={() => count++}>Click</Button>')
	expect(result).toContain('token tag')
	expect(result).toContain('<span class="token punctuation">{</span>')
})

test('a comment-only snippet does not loop or throw', () => {
	expect(highlight('// nothing else here')).toBe('// nothing else here')
})

test('bash commands are still detected', () => {
	expect(highlight('npm install noph-ui')).toContain('token function')
})
