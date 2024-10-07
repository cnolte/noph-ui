<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
		start?: Snippet
		end?: Snippet
	}

	let { children, start, end, ...attributes }: SnackbarProps = $props()
</script>

<div {...attributes} class="snackbar {attributes.class}">
	{#if start}
		{@render start()}
	{/if}
	{#if children}
		<div class="flex-1">{@render children()}</div>
	{/if}
	{#if end}
		{@render end()}
	{/if}
</div>

<style>
	.snackbar {
		--np-button-container-color: var(
			--np-color-on-background-snackbar,
			var(--np-color-inverse-on-surface)
		);
		color: var(--np-color-on-background-snackbar, var(--np-color-inverse-on-surface));
		background-color: var(--np-color-background-snackbar, var(--np-color-inverse-surface));
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.5rem;
		fill: currentColor;
		padding: 1rem;
	}
</style>
