<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet icon()}
	<Icon>close</Icon>
{/snippet}
<Button command="toggle-popover" commandfor="two-line-snackbar-demo">Show snackbar</Button>
<Snackbar
	{icon}
	id="two-line-snackbar-demo"
	label="Your photo was moved to the archive. You can restore it from the archive folder at any time within the next 30 days."
	actionLabel="Undo"
/>
