import { form } from '$app/server'
import type { RemoteFormInput } from '$app/server'
import { invalid } from '@sveltejs/kit'

interface RegistrationInput extends RemoteFormInput {
	name: string
	email: string
	plan: string
	startDate: string
	acceptedTerms: boolean
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export const submitRegistration = form<RegistrationInput, { name: string }>(
	'unchecked',
	async (data, issue) => {
		const name = asString(data.name)
		const email = asString(data.email)
		const plan = asString(data.plan)
		const startDate = asString(data.startDate)
		const acceptedTerms = Boolean(data.acceptedTerms)

		const issues = []
		if (!name) issues.push(issue.name('Enter your name.'))
		if (!EMAIL_PATTERN.test(email)) issues.push(issue.email('Enter a valid email address.'))
		if (!plan) issues.push(issue.plan('Choose a plan.'))
		if (!startDate) issues.push(issue.startDate('Pick a start date.'))
		if (!acceptedTerms) issues.push(issue.acceptedTerms('You must accept the terms.'))
		if (issues.length) invalid(...issues)

		// A real handler would write to a database here.
		await new Promise((resolve) => setTimeout(resolve, 400))

		return { name }
	},
)
