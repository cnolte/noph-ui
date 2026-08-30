import { expect, test } from '@playwright/test'

test('the date and time picker takes a day and a time together', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/date-time-picker')
	await expect(page).toHaveTitle('Date time picker - Material 3 picker for Svelte - Noph UI')
	await expect(page.getByRole('heading', { name: 'Date and time pickers', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	// The field sits inside its label, so the accessible name carries the trailing button and the
	// supporting text after the label text. Match the start of it.
	const input = page.getByRole('textbox', { name: /^Starts at\b/ }).first()
	await expect(input).toHaveValue('08/17/2025, 02:30 PM')

	await page.getByRole('button', { name: 'Show date and time picker' }).first().click()
	// Only the open picker is in the accessibility tree, so the label is enough to find it.
	const panel = page.getByRole('dialog', { name: 'Starts at', exact: true })
	await expect(panel).toBeVisible()

	await panel.getByRole('button', { name: 'Friday, August 8, 2025' }).click()
	await panel.getByRole('listbox', { name: 'Hour' }).getByRole('option', { name: '09' }).click()
	await panel.getByRole('listbox', { name: 'Minute' }).getByRole('option', { name: '45' }).click()
	await panel.getByRole('listbox', { name: 'AM or PM' }).getByRole('option', { name: 'AM' }).click()
	await panel.getByRole('button', { name: 'OK', exact: true }).click()

	await expect(input).toHaveValue('08/08/2025, 09:45 AM')
	// The Usage demo prints the bound value, so the hidden form input needs no CSS hook.
	await expect(page.getByText('2025-08-08T09:45', { exact: true })).toBeVisible()

	expect(errors).toEqual([])
})
