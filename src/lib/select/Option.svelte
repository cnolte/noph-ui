<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLOptionAttributes } from 'svelte/elements'

	interface OptionProps extends HTMLOptionAttributes {
		start?: Snippet
		end?: Snippet
	}

	let { start, end, children, ...attributes }: OptionProps = $props()
</script>

<option {...attributes}>
	<Ripple />
	{#if start}
		{@render start()}
	{/if}
	{@render children?.()}
	{#if end}
		{@render end()}
	{/if}
</option>

<style>
	option {
		cursor: pointer;
		position: relative;
		display: flex;
		padding: 0.5rem 1rem;
		gap: 0.75rem;
		height: 2rem;
		background: var(--np-surface);

		&:checked {
			background-color: var(--np-color-secondary-container);
			color: var(--np-color-on-secondary-container);
		}

		&::checkmark {
			display: none;
		}

		&:first-child {
			margin-top: 0.5rem;
		}
		&:last-child {
			margin-bottom: 0.5rem;
		}

		&:disabled {
			color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
			background-color: color-mix(in srgb, var(--np-color-on-surface) 10%, transparent);
		}
		&:focus-visible {
			outline-style: solid;
			outline-color: var(--np-color-secondary);
			outline-width: 3px;
			outline-offset: -3px;
			border-radius: var(--np-shape-corner-extra-small);
			animation: focusAnimation 0.3s ease forwards;
		}
	}

	@keyframes focusAnimation {
		0% {
			outline-offset: -3px;
			outline-width: 3px;
		}
		50% {
			outline-offset: -6px;
			outline-width: 6px;
		}
		100% {
			outline-offset: -3px;
			outline-width: 3px;
		}
	}
</style>
