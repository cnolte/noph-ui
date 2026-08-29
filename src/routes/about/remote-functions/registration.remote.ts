import { form } from '$app/server'
import { invalid } from '@sveltejs/kit'
import { registrationSchema } from './registration.schema.ts'

const takenEmails = new Set(['ada@example.com'])

export const submitRegistration = form(registrationSchema, async (data, issue) => {
	if (takenEmails.has(data.email.toLowerCase())) {
		invalid(issue.email('That email is already registered.'))
	}

	await new Promise((resolve) => setTimeout(resolve, 400))

	return { name: data.name }
})
