<script lang="ts">
	import { MenuItem, Snackbar, SplitButton } from '#lib/index.js'

	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
	const say = () => snackbar?.show()
</script>

<SplitButton label="Save" onclick={say}>
	{#snippet menu()}
		<MenuItem onclick={say}>Save as draft</MenuItem>
		<MenuItem onclick={say}>Save a copy</MenuItem>
	{/snippet}
</SplitButton>
<Snackbar bind:this={snackbar} label="Action clicked" />
