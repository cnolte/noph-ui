import { tick } from 'svelte'
import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Form from './DockedDatePickerForm.test.svelte'

const resetAndSettle = async (form: HTMLFormElement) => {
	form.reset()
	await tick()
	await new Promise((resolve) => setTimeout(resolve, 50))
}

const currentForm = () => [...document.querySelectorAll('form')].at(-1)!
const visibleText = (form: HTMLFormElement) =>
	form.querySelector<HTMLInputElement>('input:not([type=hidden])')!.value

describe('DockedDatePicker form reset', async () => {
	test('stops submitting a value once the form is reset', async () => {
		await render(Form, { locale: 'en-US', value: '2025-08-17' })
		const form = currentForm()
		await expect.poll(() => new FormData(form).get('deliveryDate')).toBe('2025-08-17')

		await resetAndSettle(form)

		expect({ submitted: new FormData(form).get('deliveryDate'), shows: visibleText(form) }).toEqual(
			{
				submitted: '',
				shows: '',
			},
		)
	})

	test('falls back to defaultValue, the way a value attribute would', async () => {
		await render(Form, { locale: 'en-US', value: '2025-08-17', defaultValue: '2025-01-02' })
		const form = currentForm()
		await expect.poll(() => new FormData(form).get('deliveryDate')).toBe('2025-08-17')

		await resetAndSettle(form)

		expect({ submitted: new FormData(form).get('deliveryDate'), shows: visibleText(form) }).toEqual(
			{
				submitted: '2025-01-02',
				shows: '01/02/2025',
			},
		)
	})
})
