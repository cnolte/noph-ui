<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface AlertProps extends HTMLAttributes<HTMLDivElement> {
		start?: Snippet
		end?: Snippet
	}

	let { children, start, end, ...attributes }: AlertProps = $props()
</script>

<div {...attributes} class="alert {attributes.class}">
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
	.alert {
		color: var(--np-background-color);
		background-color: var(--np-alert-color, var(--np-color-primary));
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.75rem;
		fill: currentColor;
		padding: 1rem;
	}
</style>
