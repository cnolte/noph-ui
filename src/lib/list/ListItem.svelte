<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		selected?: boolean
		start?: Snippet
		end?: Snippet
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		selected: boolean
		start?: Snippet
		end?: Snippet
	}
	let {
		selected = false,
		start,
		end,
		children,
		...attributes
	}: ButtonProps | AnchorProps = $props()

	const isButton = (
		obj: HTMLAnchorAttributes | HTMLButtonAttributes,
	): obj is HTMLButtonAttributes => {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
	const isLink = (
		obj: HTMLAnchorAttributes | HTMLButtonAttributes,
	): obj is HTMLAnchorAttributes => {
		return (obj as HTMLAnchorAttributes).href !== undefined
	}
</script>

{#snippet content()}
	<Ripple />
	{#if start}
		{@render start()}
	{/if}
	{#if children}
		<div class="flex-1">
			{@render children()}
		</div>
	{/if}
	{#if end}
		{@render end()}
	{/if}
{/snippet}

<li class="np-list-item">
	{#if isButton(attributes)}
		<button class="{selected ? 'selected ' : ''} btn" {...attributes}>{@render content()}</button>
	{:else if isLink(attributes)}
		<a class="{selected ? 'selected ' : ''} btn" {...attributes}>{@render content()}</a>
	{/if}
</li>

<style>
	.np-list-item {
		--np-color-menu-item: var(--np-color-primary);
		--np-color-primary-ripple: var(--np-color-menu-item);
		margin: 0;
		padding: 0;
		list-style: none;
		font: inherit;
		color: inherit;
		text-align: left;
	}
	.btn {
		position: relative;
		background: none;
		border: none;
		display: flex;
		width: 100%;
		user-select: none;
		cursor: pointer;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
		fill: currentColor;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		text-align: left;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		font-family: inherit;
	}
	@media (hover: hover) {
		.btn:hover {
			background-color: color-mix(in srgb, var(--np-color-on-surface) 10%, transparent);
		}
	}
	.selected::after {
		content: ' ';
		position: absolute;
		width: 100%;
		z-index: -1;
		height: 100%;
		margin: -24px;
		background-color: var(--np-color-surface-container-highest);
	}
	.btn:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-menu-item);
		outline-width: 3px;
		outline-offset: -3px;
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
			outline-offset: -3px;
		}
		50% {
			outline-width: 6px;
			outline-offset: -6px;
		}
		100% {
			outline-width: 3px;
			outline-offset: -3px;
		}
	}
</style>
