<script lang="ts">
	import { ChipSet, InputChip, TextField } from '#lib/index.js'

	let emails: string[] = $state(['info@noph.dev'])
	let email = $state('')
	let chipSet: HTMLDivElement | undefined = $state()
	let input: HTMLInputElement | HTMLTextAreaElement | undefined = $state()

	const add = (field: HTMLInputElement | HTMLTextAreaElement) => {
		if (!field.value || !field.reportValidity()) return
		if (!emails.includes(field.value)) emails.push(field.value)
		email = ''
	}
</script>

<TextField
	type="email"
	label="Emails"
	variant="outlined"
	placeholder="Add email..."
	style="width:340px"
	bind:value={email}
	populated={emails.length > 0}
	bind:inputElement={input}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			add(e.currentTarget)
		} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
			// Backspace in the empty field moves to the last email, and Backspace there removes it.
			e.preventDefault()
			chipSet
				?.querySelectorAll('button')
				.item(emails.length - 1)
				?.focus()
		}
	}}
	onblur={(e) => add(e.currentTarget)}
>
	<ChipSet bind:element={chipSet}>
		{#each emails as address (address)}
			<InputChip
				name="email"
				value={address}
				onremove={() => {
					emails = emails.filter((entry) => entry !== address)
					// With the last email gone there is no chip left to focus, so go back to the field.
					if (!emails.length) input?.focus()
				}}
			/>
		{/each}
	</ChipSet>
</TextField>
