<script lang="ts">
	import { Button, Checkbox, DockedDatePicker, Select, TextField } from '#lib/index.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import { submitRegistration } from './registration.remote.ts'

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
	every <code>issues</code> prop in this library takes, so wiring one up is a matter of passing a
	field's <code>issues()</code> straight into the matching component.
</p>
<p>
	The form below combines five components behind a single remote function: two <a
		href="/components/text-field">TextFields</a
	>, a <a href="/components/select">Select</a>, a
	<a href="/components/date-picker">DockedDatePicker</a>
	and a <a href="/components/checkbox">Checkbox</a>. Submit it without filling anything in to see
	the fields flag themselves, server side, with no client validation library in the way.
</p>
<DemoContainer>
	{#if submitRegistration.result}
		<p>Thanks, {submitRegistration.result.name}! You're on the list.</p>
	{/if}
	<form
		{...submitRegistration}
		style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 24rem"
	>
		<TextField
			label="Name"
			issues={submitRegistration.fields.name.issues()}
			{...submitRegistration.fields.name.as('text')}
		/>
		<TextField
			label="Email"
			issues={submitRegistration.fields.email.issues()}
			{...submitRegistration.fields.email.as('email')}
		/>
		<Select
			label="Plan"
			issues={submitRegistration.fields.plan.issues()}
			options={[
				{ value: 'starter', label: 'Starter' },
				{ value: 'pro', label: 'Pro' },
				{ value: 'enterprise', label: 'Enterprise' },
			]}
			{...submitRegistration.fields.plan.as('select')}
		/>
		<DockedDatePicker
			label="Start date"
			min={isoToday}
			locale="en-US"
			issues={submitRegistration.fields.startDate.issues()}
			{...submitRegistration.fields.startDate.as('date')}
		/>
		<label style="display: flex; align-items: center; gap: 0.5rem">
			<Checkbox
				issues={submitRegistration.fields.acceptedTerms.issues()}
				{...submitRegistration.fields.acceptedTerms.as('checkbox')}
			/>
			I accept the terms
		</label>
		<Button type="submit" variant="filled" loading={submitRegistration.pending > 0}>
			{submitRegistration.pending > 0 ? 'Registering…' : 'Register'}
		</Button>
	</form>
</DemoContainer>
<Code
	value={`// registration.remote.ts
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

const EMAIL_PATTERN = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/

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
)`}
/>
<!-- eslint-disable no-useless-escape -- the backslash keeps this from closing the script block it is written inside of -->
<Code
	value={`<script>
	import { submitRegistration } from './registration.remote'
<\/script>

<form {...submitRegistration}>
	<TextField
		label="Name"
		issues={submitRegistration.fields.name.issues()}
		{...submitRegistration.fields.name.as('text')}
	/>
	<TextField
		label="Email"
		issues={submitRegistration.fields.email.issues()}
		{...submitRegistration.fields.email.as('email')}
	/>
	<Select
		label="Plan"
		issues={submitRegistration.fields.plan.issues()}
		options={[
			{ value: 'starter', label: 'Starter' },
			{ value: 'pro', label: 'Pro' },
			{ value: 'enterprise', label: 'Enterprise' },
		]}
		{...submitRegistration.fields.plan.as('select')}
	/>
	<DockedDatePicker
		label="Start date"
		issues={submitRegistration.fields.startDate.issues()}
		{...submitRegistration.fields.startDate.as('date')}
	/>
	<label>
		<Checkbox
			issues={submitRegistration.fields.acceptedTerms.issues()}
			{...submitRegistration.fields.acceptedTerms.as('checkbox')}
		/>
		I accept the terms
	</label>
	<Button type="submit" loading={submitRegistration.pending > 0}>Register</Button>
</form>`}
/>
<!-- eslint-enable no-useless-escape -->
<h2 id="how-it-works">
	How it works<a href="#how-it-works" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Spreading <code>&#123;...submitRegistration&#125;</code> onto the <code>&lt;form&gt;</code> points it
	at the remote function and attaches the handler that intercepts submission on the client, so nothing
	reloads. Without JavaScript the same markup still works: the browser posts to the function's own URL
	and SvelteKit re-renders the page with the result, issues included.
</p>
<p>
	<code>submitRegistration.fields.name.issues()</code> returns that field's
	<code>&#123; message, path &#125;[]</code> array whenever the last submission flagged it, and
	<code>undefined</code> otherwise. Every component on this page reads its own field's
	<code>issues()</code>
	directly into its <code>issues</code> prop, no adapter or translation layer in between.
</p>
<p>
	Validation here is deliberately manual, so the example needs nothing beyond
	<code>@sveltejs/kit</code>. A real form typically validates against a
	<a href="https://standardschema.dev/" target="_blank" rel="noreferrer">Standard Schema</a>
	library such as <a href="https://zod.dev/" target="_blank" rel="noreferrer">Zod</a> or
	<a href="https://valibot.dev/" target="_blank" rel="noreferrer">Valibot</a> instead, which
	<code>form</code> also accepts in place of <code>'unchecked'</code>, and which validates on the
	client as well as the server.
</p>
