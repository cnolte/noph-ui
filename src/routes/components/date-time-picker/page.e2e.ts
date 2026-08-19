import { expect, test } from '@playwright/test'

test('the date and time picker takes a day and a time together', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/date-time-picker')
	await expect(page).toHaveTitle('Date and time pickers - Noph UI')
	await expect(page.getByRole('heading', { name: 'Date and time pickers', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	const picker = page.locator('.np-docked-date-time-picker').first()
	const input = picker.locator('input:not([type=hidden])')
	await expect(input).toHaveValue('08/17/2025, 02:30 PM')

	await picker.getByRole('button', { name: 'Show date and time picker' }).click()
	const panel = page.locator('.np-docked-date-time-picker-container')
	await expect(panel).toBeVisible()

	await panel.getByRole('button', { name: 'Friday, August 8, 2025' }).click()
	await panel.getByRole('listbox', { name: 'Hour' }).getByRole('option', { name: '09' }).click()
	await panel.getByRole('listbox', { name: 'Minute' }).getByRole('option', { name: '45' }).click()
	await panel.getByRole('listbox', { name: 'AM or PM' }).getByRole('option', { name: 'AM' }).click()
	await panel.getByRole('button', { name: 'OK', exact: true }).click()

	await expect(input).toHaveValue('08/08/2025, 09:45 AM')
	await expect(page.locator('.np-docked-date-time-picker-value').first()).toHaveValue(
		'2025-08-08T09:45',
	)

	expect(errors).toEqual([])
})
