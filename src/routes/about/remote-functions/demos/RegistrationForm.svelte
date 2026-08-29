<script lang="ts">
	import { Button, Checkbox, DockedDatePicker, Select, TextField } from '#lib/index.js'
	import { plans, registrationSchema } from '../registration.schema.ts'
	import { submitRegistration } from '../registration.remote.ts'

	const registration = submitRegistration.preflight(registrationSchema)

	const today = new Date()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`
</script>

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
