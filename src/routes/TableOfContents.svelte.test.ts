import { beforeEach, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Harness from './TableOfContentsHarness.test.svelte'

beforeEach(() => {
	window.scrollTo(0, 0)
})

const toc = () => page.getByRole('navigation', { name: 'On this page' })
const entry = (name: string) => toc().getByRole('link', { name, exact: true })
const marked = () => document.querySelector('.toc a[aria-current]')?.textContent?.trim()

const withoutNativeSpy = () => {
	const supports = CSS.supports.bind(CSS)
	vi.spyOn(CSS, 'supports').mockImplementation((...args: Parameters<typeof CSS.supports>) =>
		args[0] === 'selector(:target-current)' ? false : supports(...args),
	)
}

test('renders the sections it is handed', async () => {
	render(Harness)
	await expect.element(toc()).toBeVisible()

	const labels = [...document.querySelectorAll('.toc a')].map((link) => link.textContent?.trim())
	expect(labels).toEqual(['Usage', 'Typing', 'API'])
	expect(document.querySelector('.toc ul')?.childElementCount).toBe(3)
})

test('gives every listed heading a link to itself', async () => {
	render(Harness)
	await expect.poll(() => document.querySelectorAll('.heading-anchor').length).toBe(3)

	const anchors = [...document.querySelectorAll<HTMLAnchorElement>('.heading-anchor')]
	expect(anchors.map((anchor) => new URL(anchor.href).hash)).toEqual(['#usage', '#typing', '#api'])
	await expect.element(page.getByRole('heading', { name: 'Usage', exact: true })).toBeVisible()
	expect(anchors.every((anchor) => anchor.getAttribute('aria-hidden') === 'true')).toBe(true)
})

test('leaves the current section to the browser where :target-current works', async () => {
	render(Harness)
	await expect.poll(() => document.querySelectorAll('.heading-anchor').length).toBe(3)

	document.querySelector('#api')!.scrollIntoView()
	await expect.poll(marked).toBe(undefined)
})

test('marks the section being read where it does not', async () => {
	withoutNativeSpy()
	render(Harness)
	await expect.poll(marked).toBe('Usage')

	document.querySelector('#typing')!.scrollIntoView()
	await expect.poll(marked).toBe('Typing')

	window.scrollTo(0, 0)
	await expect.poll(marked).toBe('Usage')
})

test('reaches the last section, which never gets to the header line', async () => {
	withoutNativeSpy()
	render(Harness)
	window.scrollTo(0, document.documentElement.scrollHeight)
	await expect.poll(marked).toBe('API')
})

test('marks the heading a hash landed on, not the one before it', async () => {
	withoutNativeSpy()
	render(Harness)

	const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5
	const typing = document.querySelector('#typing')!
	window.scrollTo(0, typing.getBoundingClientRect().top + window.scrollY - offset - 1)
	expect(typing.getBoundingClientRect().top).toBeGreaterThan(offset)
	await expect.poll(marked).toBe('Typing')
})

test('a click on an entry lands on the heading', async () => {
	render(Harness)
	await entry('Typing').click()

	expect(window.location.hash).toBe('#typing')
	await expect.element(page.getByRole('heading', { name: 'Typing', exact: true })).toBeInViewport()
})

test('stays away when the page has no sections', async () => {
	render(Harness, { sections: [] })
	expect(document.querySelector('.toc')).toBe(null)
	await expect.poll(() => document.querySelectorAll('.heading-anchor').length).toBe(0)
})
