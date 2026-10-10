<script lang="ts">
	import { Button, Dialog, TextField } from '#lib/index.js'
</script>

<Button command="show-modal" commandfor="event-dialog">New event</Button>
<Dialog variant="full-screen" headline="New event" id="event-dialog">
	{#snippet actions()}
		<Button variant="text" command="close" commandfor="event-dialog">Save</Button>
	{/snippet}
	<div style="display:grid;gap:1rem">
		<TextField label="Event name" />
		<TextField label="Location" />
	</div>
</Dialog>
