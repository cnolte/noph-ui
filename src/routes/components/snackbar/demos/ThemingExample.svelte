<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet icon()}
	<Icon>close</Icon>
{/snippet}
<Button command="toggle-popover" commandfor="themed-snackbar">Show snackbar</Button>
<Snackbar
	id="themed-snackbar"
	{icon}
	actionLabel="Action"
	--np-snackbar-container-color="var(--np-color-tertiary)"
	--np-snackbar-action-color="var(--np-color-on-tertiary)"
	--np-snackbar-container-shape="1rem"
	--np-snackbar-text-color="var(--np-color-on-tertiary)"
	label="Themed snackbar"
/>
