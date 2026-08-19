<script lang="ts">
	import TextField from '#lib/text-field/TextField.svelte'
	import DockedDateTimePicker from './DockedDateTimePicker.svelte'
</script>

<div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
	<TextField label="Name" />
	<DockedDateTimePicker label="Start date" locale="en-US" />
</div>
