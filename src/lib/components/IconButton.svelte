<script lang="ts">
	import type { Snippet } from 'svelte'
	import Icon from './Icon.svelte'
	let {
		href,
		disabled = false,
		size = 'medium',
		title = '',
		popovertarget,
		popovertargetaction = 'toggle',
		onclick,
		children,
		className = ''
	}: {
		href?: string
		disabled?: boolean
		popovertarget?: string
		popovertargetaction?: 'toggle' | 'show' | 'hide' | null
		size?: 'small' | 'medium' | 'large'
		title?: string
		onclick?: (event: MouseEvent) => void
		children: Snippet
		className?: string
	} = $props()
</script>

{#if !disabled}
	{#if href}
		<a
			{href}
			class="bt-hover icon-button-container {size} {className}"
			{onclick}
			aria-label={title}
		>
			<Icon {size}>{@render children()}</Icon>
		</a>
	{:else}
		<button
			class="bt-hover icon-button-container {size} {className}"
			{popovertarget}
			{popovertargetaction}
			{onclick}
			aria-label={title}
		>
			<Icon {size}>{@render children()}</Icon>
		</button>
	{/if}
{:else}
	<Icon disabled {size}>{@render children()}</Icon>
{/if}

<style>
	@media (hover: hover) {
		.bt-hover:hover {
			background-color: color-mix(in srgb, var(--cn-ripple-hover-color) 10%, transparent);
		}
	}
	.icon-button-container {
		--cn-ripple-hover-color: var(--cn-color-primary, rgb(5, 125, 187));
		--cn-ripple-pressed-color: var(--cn-color-primary, rgb(5, 125, 187));
		color: var(--cn-text-color, rgb(23, 23, 23));
		display: block;
		overflow: hidden;
		border-radius: 9999px;
	}
</style>
