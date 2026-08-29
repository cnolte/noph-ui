<script lang="ts">
	import { MenuItem, Snackbar, SplitButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
	const say = () => snackbar?.show()
</script>

<SplitButton label="Send" onclick={say}>
	{#snippet icon()}<Icon>send</Icon>{/snippet}
	{#snippet menu()}
		<MenuItem onclick={say}>Schedule send</MenuItem>
	{/snippet}
</SplitButton>
<Snackbar bind:this={snackbar} label="Action clicked" />
