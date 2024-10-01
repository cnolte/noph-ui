<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		size?: 'small' | 'medium' | 'large'
		variant?: 'text' | 'filled' | 'outlined'
		start?: Snippet
		end?: Snippet
		element?: HTMLElement
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		size?: 'small' | 'medium' | 'large'
		variant?: 'text' | 'filled' | 'outlined'
		start?: Snippet
		end?: Snippet
		element?: HTMLElement
	}
	let {
		size = 'small',
		variant = 'outlined',
		children,
		start,
		end,
		element = $bindable(),
		...attributes
	}: ButtonProps | AnchorProps = $props()
	function isButton(obj: HTMLAnchorAttributes | HTMLButtonAttributes): obj is HTMLButtonAttributes {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
	function isLink(obj: HTMLAnchorAttributes | HTMLButtonAttributes): obj is HTMLAnchorAttributes {
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

{#if isButton(attributes)}
	<button
		{...attributes}
		bind:this={element}
		class="{size} {variant}{attributes.disabled
			? '-disabled pointer-events-none opacity-70'
			: ' bt-enabled cursor-pointer'} relative flex select-none items-center gap-1 overflow-hidden rounded-full fill-current text-left font-medium {children
			? 'px-5'
			: 'px-2'} {attributes.class}"
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		bind:this={element}
		class="{size} {variant} bt-enabled relative flex select-none items-center gap-1 overflow-hidden rounded-full fill-current font-medium {children
			? 'px-5'
			: 'px-2'} {attributes.class}"
	>
		{@render content()}
	</a>
{/if}

<style>
	.bt-enabled {
		transition: background-color 0.3s ease;
		--np-color-button: var(--np-color-primary, rgb(1, 101, 146));
		--np-ripple-color: var(--np-color-button);
	}
	.bt-enabled:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-button);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
		}
		50% {
			outline-width: 6px;
		}
		100% {
			outline-width: 3px;
		}
	}
	.text {
		color: var(--np-color-button);
	}
	@media (hover: hover) {
		.text:hover {
			background-color: color-mix(in srgb, var(--np-color-button) 10%, transparent);
		}
	}
	.text-disabled {
		color: color-mix(in srgb, var(--np-text-color) 60%, transparent);
	}
	.filled {
		transition-property: box-shadow background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
		color: var(--np-background-color, rgb(255, 255, 255));
		background-color: var(--np-color-button);
		--np-ripple-color: var(--np-background-color);
	}

	@media (hover: hover) {
		.filled:hover {
			background-color: color-mix(in srgb, var(--np-color-button) 85%, transparent);
			box-shadow: var(
				--np-elevation-1,
				0 1px 2px 0 rgb(0 0 0 / 0.6),
				0 0px 0px -1px rgb(0 0 0 / 0.6)
			);
		}
	}
	.filled:active {
		box-shadow: none;
	}
	.filled-disabled {
		color: color-mix(in srgb, var(--np-text-color) 60%, transparent);
		background-color: var(--np-color-disabled);
	}
	@media (hover: hover) {
		.outlined:hover {
			background-color: color-mix(in srgb, var(--np-color-button) 10%, transparent);
		}
	}
	.outlined {
		border: 1px solid;
		color: var(--np-color-button);
		border-color: var(--np-color-button);
	}
	.outlined-disabled {
		border: 1px solid;
		color: color-mix(in srgb, var(--np-text-color) 60%, transparent);
		border-color: var(--np-color-disabled);
	}
	.small {
		font-size: 0.875rem;
		height: 2.5rem;
	}
	.medium {
		font-size: 1rem;
		height: 3rem;
	}
	.large {
		font-size: 1.125rem;
		height: 3.5rem;
	}
</style>
