<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet icon()}
	<Icon>close</Icon>
{/snippet}
<Button command="toggle-popover" commandfor="two-single-line-snackbar">Show snackbar</Button>
<Snackbar
	{icon}
	id="two-single-line-snackbar"
	label="Two line snackbar"
	supportingText="with action and icon"
	actionLabel="Action"
/>
