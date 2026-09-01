import { expect, test } from '@playwright/test'

test('the carousel page renders and the usage demo scrolls and activates', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/carousel')
	await expect(page).toHaveTitle('Carousels - Material 3 carousel for Svelte - Noph UI')
	await expect(page.getByRole('heading', { name: 'Carousels', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	const shelf = page.getByRole('group', { name: 'Paintings' })
	await expect(shelf).toBeVisible()

	const third = shelf.getByRole('button', { name: 'Autumn Rhythm, 3 of 5' })
	await expect(third).toBeVisible()

	await third.click()
	await expect(page.getByText('Autumn Rhythm', { exact: true })).toBeVisible()

	expect(errors).toEqual([])
})

test('arrow keys walk the carousel items and stop at the end', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/carousel')
	await page.waitForLoadState('networkidle')

	const shelf = page.getByRole('group', { name: 'Paintings' })
	const first = shelf.getByRole('button', { name: /^Convergence/ })
	await first.focus()

	await page.keyboard.press('ArrowRight')
	await expect(shelf.getByRole('button', { name: /^Blue Poles/ })).toBeFocused()

	await page.keyboard.press('End')
	await expect(shelf.getByRole('button', { name: /^Eyes in the Heat/ })).toBeFocused()

	await page.keyboard.press('ArrowRight')
	await expect(shelf.getByRole('button', { name: /^Eyes in the Heat/ })).toBeFocused()

	expect(errors).toEqual([])
})

test('a carousel works before hydration, with uniform items and no morphing', async ({
	browser,
}) => {
	const context = await browser.newContext({ javaScriptEnabled: false })
	const page = await context.newPage()

	await page.goto('/components/carousel')

	const shelf = page.getByRole('group', { name: 'Paintings' })
	await expect(shelf).toBeVisible()

	const widths = await shelf
		.locator('.np-carousel-item')
		.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().width)))
	expect(new Set(widths).size).toBe(1)
	expect(await shelf.locator('.np-carousel-morphing').count()).toBe(0)

	await context.close()
})
