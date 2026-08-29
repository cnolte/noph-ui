<script lang="ts">
	import { MenuItem, Snackbar, SplitButton } from '#lib/index.js'

	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
	const say = () => snackbar?.show()
</script>

{#each ['filled', 'tonal', 'outlined', 'elevated'] as const as variant (variant)}
	<SplitButton {variant} label={variant} onclick={say}>
		{#snippet menu()}
			<MenuItem onclick={say}>First</MenuItem>
			<MenuItem onclick={say}>Second</MenuItem>
		{/snippet}
	</SplitButton>
{/each}
<Snackbar bind:this={snackbar} label="Action clicked" />
