import { expect, test } from '@playwright/test'

test('the documented pickers survive server rendering and hydration', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/date-picker')
	await expect(page).toHaveTitle('Date pickers - Material 3 date picker for Svelte - Noph UI')
	await expect(page.getByRole('heading', { name: 'Date pickers', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	// The field sits inside its label, so the accessible name carries the trailing button and the
	// supporting text after the label text. Match the start of it.
	const input = page.getByRole('textbox', { name: /^Date\b/ }).first()
	await expect(input).toHaveValue('08/17/2025')

	await page.getByRole('button', { name: 'Show date picker' }).first().click()
	// Only the open picker is in the accessibility tree, so the label is enough to find it.
	const calendar = page.getByRole('dialog', { name: 'Date', exact: true })
	await expect(calendar).toBeVisible()

	await calendar.getByRole('button', { name: 'Friday, August 8, 2025' }).click()
	await calendar.getByRole('button', { name: 'OK', exact: true }).click()
	await expect(input).toHaveValue('08/08/2025')
	// The Usage demo prints the bound value, so the hidden form input needs no CSS hook.
	await expect(page.getByText('2025-08-08', { exact: true })).toBeVisible()

	expect(errors).toEqual([])
})

test('the modal and the range picker open from the page', async ({ page }) => {
	await page.goto('/components/date-picker')
	await page.waitForLoadState('networkidle')

	await page.getByRole('button', { name: 'Pick a date' }).click()
	const dialog = page.getByRole('dialog', { name: 'Select date' })
	await expect(dialog).toBeVisible()
	await page.keyboard.press('Escape')
	await expect(dialog).toBeHidden()

	await page.getByRole('button', { name: 'Pick a range' }).click()
	const range = page.getByRole('dialog', { name: 'Select stay' })
	await expect(range).toBeVisible()
	await expect(range.getByRole('grid').first()).toBeVisible()
})
