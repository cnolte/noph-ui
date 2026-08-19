<script lang="ts">
	import { Button, Checkbox, DockedDatePicker, Select, TextField } from '#lib/index.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import { plans, registrationSchema } from './registration.schema.ts'
	import { submitRegistration } from './registration.remote.ts'

	const registration = submitRegistration.preflight(registrationSchema)

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`
</script>

<svelte:head>
	<title>Remote functions - Noph UI</title>
</svelte:head>

<h1>Remote functions</h1>
<p>
	<a href="https://svelte.dev/docs/kit/remote-functions" target="_blank" rel="noreferrer"
		>Remote functions</a
	>
	are SvelteKit's way of calling server code from a component without hand rolling an API route. A
	<code>form</code>
	remote function runs on the server, validates the submission and reports back which fields failed and
	why. That report is a <code>&#123; message: string &#125;[]</code> per field, the exact shape
	every
	<code>issues</code>
	prop in this library takes, so wiring one up is a matter of passing a field's
	<code>issues()</code> straight into the matching component.
</p>
<p>
	The form below wires five components to a single remote function: two <a
		href="/components/text-field">TextFields</a
	>, a <a href="/components/select">Select</a>, a
	<a href="/components/date-picker">DockedDatePicker</a>
	and a <a href="/components/checkbox">Checkbox</a>. It validates against a
	<a href="https://valibot.dev/" target="_blank" rel="noreferrer">Valibot</a>
	schema, the way a real app would. Submit it empty to see every field flag itself, or register
	<code>ada@example.com</code> to hit a rule the schema cannot express.
</p>
<DemoContainer>
	{#if registration.result}
		<p>Thanks, {registration.result.name}! You're on the list.</p>
	{/if}
	<form
		{...registration}
		style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 24rem"
	>
		<TextField
			label="Name"
			issues={registration.fields.name.issues()}
			{...registration.fields.name.as('text')}
		/>
		<TextField
			label="Email"
			issues={registration.fields.email.issues()}
			{...registration.fields.email.as('email')}
		/>
		<Select
			label="Plan"
			issues={registration.fields.plan.issues()}
			options={plans}
			{...registration.fields.plan.as('select')}
		/>
		<DockedDatePicker
			label="Start date"
			min={isoToday}
			locale="en-US"
			issues={registration.fields.startDate.issues()}
			{...registration.fields.startDate.as('date')}
		/>
		<label style="display: flex; align-items: center; gap: 0.5rem">
			<Checkbox
				issues={registration.fields.acceptedTerms.issues()}
				{...registration.fields.acceptedTerms.as('checkbox')}
			/>
			I accept the terms
		</label>
		<div style="display: flex; justify-content: flex-end">
			<Button type="submit" variant="filled" loading={registration.pending > 0}>
				{registration.pending > 0 ? 'Registering…' : 'Register'}
			</Button>
		</div>
	</form>
</DemoContainer>
<!-- eslint-disable no-useless-escape -- the backslash keeps this from closing the script block it is written inside of -->
<Code
	value={`<script>
	import { plans, registrationSchema } from './registration.schema'
	import { submitRegistration } from './registration.remote'

	const registration = submitRegistration.preflight(registrationSchema)
<\/script>

<form {...registration}>
	<TextField
		label="Name"
		issues={registration.fields.name.issues()}
		{...registration.fields.name.as('text')}
	/>
	<TextField
		label="Email"
		issues={registration.fields.email.issues()}
		{...registration.fields.email.as('email')}
	/>
	<Select
		label="Plan"
		options={plans}
		issues={registration.fields.plan.issues()}
		{...registration.fields.plan.as('select')}
	/>
	<DockedDatePicker
		label="Start date"
		issues={registration.fields.startDate.issues()}
		{...registration.fields.startDate.as('date')}
	/>
	<label>
		<Checkbox
			issues={registration.fields.acceptedTerms.issues()}
			{...registration.fields.acceptedTerms.as('checkbox')}
		/>
		I accept the terms
	</label>
	<Button type="submit" loading={registration.pending > 0}>Register</Button>
</form>`}
/>
<!-- eslint-enable no-useless-escape -->
<Code
	value={`// registration.schema.ts
import * as v from 'valibot'

export type Plan = 'starter' | 'pro' | 'enterprise'

export const plans: { value: Plan; label: string }[] = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'enterprise', label: 'Enterprise' },
]

export const registrationSchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Enter your name.'),
		v.maxLength(80, 'Use 80 characters or fewer.'),
	),
	email: v.pipe(v.string(), v.trim(), v.email('Enter a valid email address.')),
	plan: v.picklist(
		plans.map((plan) => plan.value),
		'Choose a plan.',
	),
	startDate: v.pipe(v.string(), v.isoDate('Pick a start date.')),
	// Checkboxes send nothing when unchecked, so the field has to be optional with a default.
	acceptedTerms: v.pipe(
		v.optional(v.boolean(), false),
		v.literal(true, 'You must accept the terms.'),
	),
})`}
/>
<Code
	value={`// registration.remote.ts
import { form } from '$app/server'
import { invalid } from '@sveltejs/kit'
import { registrationSchema } from './registration.schema'

// Stands in for a database. A real app would query one here.
const takenEmails = new Set(['ada@example.com'])

export const submitRegistration = form(registrationSchema, async (data, issue) => {
	// The schema validates shape and format. Rules that need the database live here.
	if (takenEmails.has(data.email.toLowerCase())) {
		invalid(issue.email('That email is already registered.'))
	}

	await createRegistration(data)

	return { name: data.name }
})`}
/>
<h2 id="how-it-works">
	How it works<a href="#how-it-works" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Spreading <code>&#123;...registration&#125;</code> onto the <code>&lt;form&gt;</code> points it at the
	remote function and attaches the handler that intercepts submission on the client, so nothing reloads.
	Without JavaScript the same markup still works: the browser posts to the function's own URL and SvelteKit
	re-renders the page with the result, issues included.
</p>
<p>
	<code>registration.fields.name.issues()</code> returns that field's
	<code>&#123; message, path &#125;[]</code> array whenever the last submission flagged it, and
	<code>undefined</code> otherwise. Every component on this page reads its own field's
	<code>issues()</code>
	directly into its <code>issues</code> prop, no adapter or translation layer in between. Messages the
	handler adds itself land in the same array, so a field looks the same whether the schema or a database
	lookup rejected it.
</p>
