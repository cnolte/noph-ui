import { form } from '$app/server'
import { invalid } from '@sveltejs/kit'
import { registrationSchema } from './registration.schema.ts'

// Stands in for a database. A real app would query one here.
const takenEmails = new Set(['ada@example.com'])

export const submitRegistration = form(registrationSchema, async (data, issue) => {
	// The schema validates shape and format. Rules that need the database live here.
	if (takenEmails.has(data.email.toLowerCase())) {
		invalid(issue.email('That email is already registered.'))
	}

	// A real handler would write the registration to the database.
	await new Promise((resolve) => setTimeout(resolve, 400))

	return { name: data.name }
})
