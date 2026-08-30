import { expect, test } from '@playwright/test'

test('the time picker takes a time from the dial and from the keyboard', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/time-picker')
	await expect(page).toHaveTitle('Time pickers - Material 3 time picker for Svelte - Noph UI')
	await expect(page.getByRole('heading', { name: 'Time pickers', level: 1 })).toBeVisible()
	await page.waitForLoadState('networkidle')

	// The field sits inside its label, so the accessible name carries the trailing button and the
	// supporting text after the label text. Match the start of it.
	const input = page.getByRole('textbox', { name: /^Time\b/ }).first()
	await expect(input).toHaveValue('02:30 PM')

	await page.getByRole('button', { name: 'Show time picker' }).first().click()
	// Only the open picker is in the accessibility tree, so the label is enough to find it.
	const panel = page.getByRole('dialog', { name: 'Time', exact: true })
	await expect(panel).toBeVisible()

	// The numbers are not pointer targets, so the keyboard is how a test reaches one.
	const five = panel.getByRole('option', { name: '5 hours of 12', exact: true })
	await five.evaluate((node: HTMLElement) => {
		node.focus()
		node.click()
	})
	await panel.getByRole('button', { name: 'OK', exact: true }).click()

	await expect(input).toHaveValue('05:30 PM')
	// The Usage demo prints the bound value, so the hidden form input needs no CSS hook.
	await expect(page.getByText('17:30', { exact: true })).toBeVisible()

	expect(errors).toEqual([])
})

test('the dial and the input mode are two ways into the same value', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.goto('/components/time-picker')
	await page.waitForLoadState('networkidle')

	await page.getByRole('button', { name: 'Select time' }).first().click()
	// The dialog is named after its headline, which follows the mode.
	const dial = page.getByRole('dialog', { name: 'Select time' })
	await expect(dial).toBeVisible()
	await expect(dial.getByRole('listbox', { name: 'Select hour' })).toBeVisible()

	await dial.getByRole('button', { name: 'Switch to text input mode' }).click()

	const entry = page.getByRole('dialog', { name: 'Enter time' })
	await expect(entry).toBeVisible()
	await expect(entry.getByRole('listbox', { name: 'Select hour' })).toHaveCount(0)

	await entry.getByRole('textbox', { name: 'Hour' }).fill('11')
	await entry.getByRole('textbox', { name: 'Minute' }).fill('45')
	await entry.getByRole('button', { name: 'OK', exact: true }).click()

	await expect(entry).toBeHidden()
	expect(errors).toEqual([])
})
