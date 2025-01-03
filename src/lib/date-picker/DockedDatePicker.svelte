<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CalendarToday from '$lib/icons/CalendarToday.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
</script>

<TextField label="Date" supportingText="MM/DD/YYYY">
	{#snippet end()}
		<IconButton><CalendarToday /></IconButton>
	{/snippet}
</TextField>
