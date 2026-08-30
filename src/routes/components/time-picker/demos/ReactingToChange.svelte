<script lang="ts">
	import { Button, TimePickerDialog } from '#lib/index.js'

	let value = $state<string | undefined>('07:00')
	let open = $state(false)
	let log = $state<string[]>([])

	const note = (line: string) => {
		log = [line, ...log].slice(0, 5)
	}
</script>

<Button variant="filled" onclick={() => (open = true)}>Select time</Button>
<TimePickerDialog
	bind:value
	bind:open
	hour12
	onchange={(next) => note(`changed to ${next}`)}
	onconfirm={(next) => note(`confirmed ${next}`)}
	oncancel={() => note('cancelled')}
/>

<ul>
	{#each log as line, index (index)}
		<li>{line}</li>
	{/each}
</ul>
