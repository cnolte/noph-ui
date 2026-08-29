<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet icon()}
	<Icon>close</Icon>
{/snippet}
<Button command="toggle-popover" commandfor="single-line-snackbar">Show snackbar</Button>
<Snackbar
	{icon}
	id="single-line-snackbar"
	label="Single line snackbar with action and icon"
	actionLabel="Action"
/>
