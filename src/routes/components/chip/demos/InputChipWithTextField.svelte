<script lang="ts">
	import { ChipSet, InputChip, TextField } from '#lib/index.js'

	let emails: string[] = $state(['info@noph.dev'])
	let email = $state('')
	let pendingDeleteIndex: number | null = $state(null)
</script>

<TextField
	type="email"
	label="Emails"
	variant="outlined"
	placeholder="Add email..."
	style="width:340px"
	bind:value={email}
	populated={emails.length > 0}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.currentTarget.value && e.currentTarget.reportValidity()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
			e.preventDefault()
			if (pendingDeleteIndex !== null) {
				emails.splice(pendingDeleteIndex, 1)
				pendingDeleteIndex = null
			} else {
				pendingDeleteIndex = emails.length - 1
			}
		} else {
			pendingDeleteIndex = null
		}
	}}
	onfocus={() => {
		pendingDeleteIndex = null
	}}
	onblur={(e) => {
		if (e.currentTarget.value && e.currentTarget.reportValidity()) {
			emails.push(e.currentTarget.value)
			email = ''
		} else {
			pendingDeleteIndex = null
		}
	}}
>
	<ChipSet>
		{#each emails as email, index (index)}
			<InputChip
				name="email"
				value={email}
				selected={pendingDeleteIndex === index}
				onremove={() => {
					if (index > -1) {
						emails.splice(index, 1)
						pendingDeleteIndex = null
					}
				}}
			/>
		{/each}
	</ChipSet>
</TextField>
