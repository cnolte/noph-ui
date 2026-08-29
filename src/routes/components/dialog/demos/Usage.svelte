<script lang="ts">
	import { Button, Dialog } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button command="show-modal" commandfor="simple-dialog">Show dialog</Button>
<Dialog
	headline="Reset settings?"
	supportingText="This will reset your app preferences back to their default settings."
	id="simple-dialog"
	divider
>
	{#snippet icon()}
		<Icon>settings</Icon>
	{/snippet}
	{#snippet actions()}
		<Button command="close" commandfor="simple-dialog" variant="text">Cancel</Button>
		<Button command="close" commandfor="simple-dialog" variant="text">Accept</Button>
	{/snippet}
</Dialog>
