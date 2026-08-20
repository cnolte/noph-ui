<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import Ripple from '#lib/ripple/Ripple.svelte'
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
		all: unset;
		position: relative;
		display: flex;
		padding: 0.5rem 1rem;
		gap: 0.75rem;
		height: 2rem;
		align-items: center;

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
			animation: focusAnimationInset var(--np-motion-expressive-slow-effects) forwards;
		}
	}
</style>
