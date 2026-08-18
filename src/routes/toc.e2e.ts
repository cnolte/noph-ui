import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 900 } })

const HEADER_HEIGHT = 72

test('the list of sections follows the page', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/date-picker')
	await page.waitForLoadState('networkidle')

	const toc = page.getByRole('navigation', { name: 'On this page' })
	await expect(toc.getByRole('link', { name: 'Usage', exact: true })).toBeVisible()
	await expect(toc.getByRole('link', { name: 'Two fields', exact: true })).toBeVisible()

	await toc.getByRole('link', { name: 'Two fields', exact: true }).click()
	await expect(page).toHaveURL(/#two-fields$/)
	const heading = page.getByRole('heading', { name: 'Two fields', exact: true })
	await expect(heading).toBeInViewport()
	const box = await heading.boundingBox()
	expect(box?.y).toBeGreaterThanOrEqual(HEADER_HEIGHT)

	const highlighted = await page.evaluate(() => {
		const native = CSS.supports('selector(:target-current)')
			? document.querySelector('.toc a:target-current')
			: null
		return (native ?? document.querySelector('.toc a[aria-current]'))?.textContent?.trim()
	})
	expect(highlighted).toBe('Two fields')

	await page.getByRole('link', { name: 'Chips', exact: true }).click()
	await expect(page).toHaveURL(/\/components\/chip$/)
	await expect(toc.getByRole('link', { name: 'Assist chip', exact: true })).toBeVisible()
	await expect(toc.getByRole('link', { name: 'Two fields', exact: true })).toBeHidden()

	expect(errors).toEqual([])
})

test('a shared deep link lands on the right heading', async ({ page }) => {
	await page.goto('/components/chip#disabled-2')
	await page.waitForLoadState('networkidle')

	const filterSection = page.locator('#disabled-2')
	await expect(filterSection).toBeInViewport()
	const box = await filterSection.boundingBox()
	expect(box?.y).toBeGreaterThanOrEqual(HEADER_HEIGHT)
})

test('the landing page has no list of sections', async ({ page }) => {
	await page.goto('/')
	await page.waitForLoadState('networkidle')

	await expect(page.getByRole('navigation', { name: 'On this page' })).toHaveCount(0)
})
