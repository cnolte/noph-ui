<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import RegistrationForm from './demos/RegistrationForm.svelte'
	import RegistrationFormSource from './demos/RegistrationForm.svelte?raw'
	import registrationSchemaSource from './registration.schema.ts?raw'
</script>

<svelte:head>
	<title>Remote functions - Material 3 forms for SvelteKit - Noph UI</title>
	<meta
		name="description"
		content="Wire SvelteKit remote functions to Material 3 form components in Svelte. Text fields, selects, checkboxes and date pickers take the validation issues as they are."
	/>
</svelte:head>

<h1>Remote functions</h1>
<p>
	<a
		class="link"
		href="https://svelte.dev/docs/kit/remote-functions"
		target="_blank"
		rel="noreferrer">Remote functions</a
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
		class="link"
		href="/components/text-field">TextFields</a
	>, a <a class="link" href="/components/select">Select</a>, a
	<a class="link" href="/components/date-picker">DockedDatePicker</a>
	and a <a class="link" href="/components/checkbox">Checkbox</a>. It validates against a
	<a class="link" href="https://valibot.dev/" target="_blank" rel="noreferrer">Valibot</a>
	schema, the way a real app would. Submit it empty to see every field flag itself, or register
	<code>ada@example.com</code> to hit a rule the schema cannot express.
</p>
<DemoContainer>
	<RegistrationForm />
</DemoContainer>
<p><code>Form.svelte</code></p>
<Code value={RegistrationFormSource} />
<p><code>registration.schema.ts</code></p>
<Code value={registrationSchemaSource} />
<p><code>registration.remote.ts</code></p>
<Code
	value={`import { form } from '$app/server'
import { invalid } from '@sveltejs/kit'
import { registrationSchema } from './registration.schema'

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
