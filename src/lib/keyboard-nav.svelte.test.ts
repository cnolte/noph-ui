import { afterEach, describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { arrowKeyNav } from './keyboard-nav.js'

const mount = (
	dir: 'ltr' | 'rtl',
	orientation: 'horizontal' | 'vertical',
	html = '<button>One</button><button>Two</button><button>Three</button>',
) => {
	const group = document.createElement('div')
	group.dir = dir
	group.innerHTML = html
	const handler = arrowKeyNav('button, input, select, textarea', orientation)
	group.addEventListener('keydown', (event) =>
		handler(event as KeyboardEvent & { currentTarget: HTMLElement }),
	)
	document.body.append(group)
	group.querySelector<HTMLElement>('button')!.focus()
	return group
}
const focused = () => document.activeElement?.textContent
const fieldRow =
	'<button>One</button><input aria-label="Text" value="abc"><select aria-label="Pick"><option>a</option><option>b</option></select><button>Three</button>'
const input = () => document.querySelector('input')!

afterEach(() => document.body.replaceChildren())

describe('arrowKeyNav', async () => {
	test('ArrowRight moves on in a left to right row', async () => {
		mount('ltr', 'horizontal')
		await userEvent.keyboard('{ArrowRight}')
		expect(focused()).toBe('Two')
	})

	test('ArrowLeft moves on in a right to left row', async () => {
		mount('rtl', 'horizontal')
		await userEvent.keyboard('{ArrowLeft}')
		expect(focused()).toBe('Two')
		await userEvent.keyboard('{ArrowRight}')
		expect(focused()).toBe('One')
	})

	test('a column keeps ArrowDown as next in either direction', async () => {
		mount('rtl', 'vertical')
		await userEvent.keyboard('{ArrowDown}')
		expect(focused()).toBe('Two')
		await userEvent.keyboard('{ArrowLeft}')
		expect(focused()).toBe('Two')
	})

	test('a text field keeps the arrows that move its caret, until the caret reaches the end', async () => {
		mount('ltr', 'horizontal', fieldRow)
		input().focus()
		input().setSelectionRange(1, 1)

		await userEvent.keyboard('{ArrowRight}')
		expect(document.activeElement).toBe(input())
		expect(input().selectionStart).toBe(2)

		await userEvent.keyboard('{End}')
		expect(document.activeElement).toBe(input())
		expect(input().selectionStart).toBe(3)

		await userEvent.keyboard('{ArrowRight}')
		expect(document.activeElement?.tagName).toBe('SELECT')
	})

	test('a caret at the start leaves backwards', async () => {
		mount('ltr', 'horizontal', fieldRow)
		input().focus()
		input().setSelectionRange(0, 0)

		await userEvent.keyboard('{ArrowLeft}')
		expect(focused()).toBe('One')
	})

	test('a select keeps the up and down arrows in a column', async () => {
		mount('ltr', 'vertical', fieldRow)
		document.querySelector('select')!.focus()

		await userEvent.keyboard('{ArrowDown}')
		expect(document.activeElement?.tagName).toBe('SELECT')
	})
})
