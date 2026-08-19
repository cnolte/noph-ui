import Prism from 'prismjs'
import 'prismjs/components/prism-clike.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-markup.js'

const languages = {
	markup: Prism.languages.markup,
	css: Prism.languages.css,
	typescript: Prism.languages.typescript,
	bash: Prism.languages.bash,
}

const leadingComment = /^(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)\s*/

function withoutLeadingComments(code: string): string {
	let rest = code
	let match = leadingComment.exec(rest)
	while (match) {
		rest = rest.slice(match[0].length)
		match = leadingComment.exec(rest)
	}
	return rest
}

function detectLanguage(code: string): keyof typeof languages {
	const trimmed = withoutLeadingComments(code.trim())
	const firstLine = trimmed.split('\n', 1)[0]
	if (/^(npm|npx|pnpm|yarn|git|curl)\b/.test(trimmed)) return 'bash'
	if (trimmed.startsWith('<') || /^\{[#:/@]/.test(trimmed)) return 'markup'
	if (
		/^(import|export|const|let|var|function|class|interface|type|enum|declare|async|await|return|new|throw|console)\b/.test(
			trimmed,
		)
	)
		return 'typescript'
	if (/^[.:#a-zA-Z-][^;]*\{/.test(trimmed) || /^[a-zA-Z-]+\s*:\s*[^;]+;?\s*$/.test(firstLine))
		return 'css'
	return 'markup'
}

function escapeHtml(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const PLACEHOLDER_CHAR = String.fromCharCode(0xe000)
const placeholderOf = (i: number) => `${PLACEHOLDER_CHAR}${i}${PLACEHOLDER_CHAR}`
const placeholderPattern = new RegExp(`${PLACEHOLDER_CHAR}(\\d+)${PLACEHOLDER_CHAR}`, 'g')

function extractExpressions(code: string): { text: string; expressions: string[] } {
	let depth = 0
	let start = 0
	let text = ''
	const expressions: string[] = []
	for (let i = 0; i < code.length; i++) {
		const ch = code[i]
		if (ch === '{') {
			if (depth === 0) start = i
			depth++
		} else if (ch === '}' && depth > 0) {
			depth--
			if (depth === 0) {
				expressions.push(code.slice(start, i + 1))
				text += placeholderOf(expressions.length - 1)
			}
		} else if (depth === 0) {
			text += ch
		}
	}
	return { text, expressions }
}

function highlightExpression(expression: string): string {
	if (/^\{[#:/@]/.test(expression)) {
		return `<span class="token svelte-block">${escapeHtml(expression)}</span>`
	}
	const inner = expression.slice(1, -1)
	return (
		'<span class="token punctuation">{</span>' +
		Prism.highlight(inner, languages.typescript, 'typescript') +
		'<span class="token punctuation">}</span>'
	)
}

export function highlight(code: string): string {
	const lang = detectLanguage(code)
	if (lang !== 'markup') return Prism.highlight(code, languages[lang], lang)

	const { text, expressions } = extractExpressions(code)
	return Prism.highlight(text, languages.markup, 'markup').replace(placeholderPattern, (_, index) =>
		highlightExpression(expressions[Number(index)]),
	)
}
