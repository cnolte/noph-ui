import { expect, test } from '@playwright/test'

test('the documented pickers survive server rendering and hydration', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/date-picker')
	await expect(page).toHaveTitle('Date Pickers - Noph UI')
	await expect(page.getByRole('heading', { name: 'Date pickers', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	const picker = page.locator('.np-docked-date-picker').first()
	const input = picker.locator('input:not([type=hidden])')
	await expect(input).toHaveValue('08/17/2025')

	await picker.getByRole('button', { name: 'Show date picker' }).click()
	const calendar = page.locator('.np-docked-date-picker-container')
	await expect(calendar).toBeVisible()

	await calendar.getByRole('button', { name: 'Friday, August 8, 2025' }).click()
	await calendar.getByRole('button', { name: 'OK', exact: true }).click()
	await expect(input).toHaveValue('08/08/2025')
	await expect(picker.locator('.np-docked-date-picker-value')).toHaveValue('2025-08-08')

	expect(errors).toEqual([])
})

test('the modal and the range picker open from the page', async ({ page }) => {
	await page.goto('/components/date-picker')
	await page.waitForLoadState('networkidle')

	await page.getByRole('button', { name: 'Pick a date' }).click()
	await expect(page.locator('.np-date-picker-dialog-content')).toBeVisible()
	await page.keyboard.press('Escape')
	await expect(page.locator('.np-date-picker-dialog-content')).toBeHidden()

	await page.getByRole('button', { name: 'Pick a range' }).click()
	await expect(page.locator('.np-date-range-picker .np-calendar').first()).toBeVisible()
})
