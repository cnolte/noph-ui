import { tick } from 'svelte'
import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Form from './SelectForm.test.svelte'

const resetAndSettle = async (form: HTMLFormElement) => {
	form.reset()
	await tick()
	await new Promise((resolve) => setTimeout(resolve, 50))
}

const currentForm = () => [...document.querySelectorAll('form')].at(-1)!
const bound = () => document.querySelector('[data-testid=bound]')!.textContent

describe('Select form reset', async () => {
	test('drops a chosen value that no option declares as the default', async () => {
		await render(Form, { value: 'pro' })
		const form = currentForm()
		await expect.poll(() => new FormData(form).get('plan')).toBe('pro')

		await resetAndSettle(form)

		expect({ submitted: new FormData(form).get('plan'), boundValue: bound() }).toEqual({
			submitted: null,
			boundValue: '(unset)',
		})
	})

	test('restores the option marked selected', async () => {
		await render(Form, {
			value: 'pro',
			options: [
				{ value: 'starter', label: 'Starter', selected: true },
				{ value: 'pro', label: 'Pro' },
			],
		})
		const form = currentForm()
		await expect.poll(() => new FormData(form).get('plan')).toBe('pro')

		await resetAndSettle(form)

		expect({ submitted: new FormData(form).get('plan'), boundValue: bound() }).toEqual({
			submitted: 'starter',
			boundValue: 'starter',
		})
	})
})
