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

<li>
	{#if isButton(attributes)}
		<button
			class="{selected
				? 'selected '
				: ''} btn relative flex w-full cursor-pointer select-none items-center gap-4 overflow-hidden fill-current px-6 py-3 text-left text-sm font-medium"
			{...attributes}>{@render content()}</button
		>
	{:else if isLink(attributes)}
		<a
			class="{selected
				? 'selected '
				: ''} btn relative flex w-full select-none items-center gap-4 overflow-hidden fill-current px-6 py-3 text-sm font-medium"
			{...attributes}>{@render content()}</a
		>
	{/if}
</li>

<style>
	@media (hover: hover) {
		.btn:hover {
			background-color: color-mix(in srgb, var(--np-color-menu-item) 10%, transparent);
		}
	}
	.selected {
		background-color: var(--np-selected-button-background-color);
	}
	li {
		--np-color-menu-item: var(--np-color-primary, rgb(5, 125, 187));
		--np-ripple-color: var(--np-color-menu-item);
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
