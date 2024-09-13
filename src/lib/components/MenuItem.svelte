<script lang="ts">
	import type { Snippet } from 'svelte'
	import Icon from './Icon.svelte'
	let {
		href,
		selected = false,
		hreflang,
		children,
		icon,
		onclick,
	}: {
		href?: string
		selected?: boolean
		hreflang?: string | undefined | null
		children: Snippet
		icon?: Snippet
		onclick?: (event: MouseEvent) => void
	} = $props()
</script>

{#snippet content()}
	{#if icon}
		<Icon>
			{@render icon()}
		</Icon>
	{/if}
	<div class="flex-1">
		{@render children()}
	</div>
{/snippet}

<li class="{selected ? 'selected ' : ''} bt-hover">
	{#if href}
		<a class="action" {hreflang} {onclick} {href}>{@render content()}</a>
	{:else}
		<button class="action" {onclick}>{@render content()}</button>
	{/if}
</li>

<style>
	@media (hover: hover) {
		.bt-hover:hover {
			background-color: color-mix(in srgb, var(--np-ripple-hover-color) 10%, transparent);
		}
	}
	.selected {
		background-color: var(--np-selected-button-background-color);
	}
	li {
		--np-ripple-hover-color: var(--np-color-primary, rgb(5, 125, 187));
		position: relative;
	}
	.action {
		width: 100%;
		display: flex;
		gap: 2rem;
		font-weight: 500;
		align-items: center;
		min-width: 12rem;
		font-size: 0.875rem;
		cursor: pointer;
		text-align: left;
		padding: 0.75rem 1.5rem;
	}
</style>
