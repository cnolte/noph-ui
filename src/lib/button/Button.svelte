<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		size?: 'small' | 'medium' | 'large'
		variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
		start?: Snippet
		end?: Snippet
		element?: HTMLElement
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		size?: 'small' | 'medium' | 'large'
		variant?: 'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'
		start?: Snippet
		end?: Snippet
		element?: HTMLElement
		disabled?: boolean
	}
	let {
		size = 'small',
		variant = 'outlined',
		children,
		start,
		end,
		title,
		element = $bindable(),
		disabled,
		...attributes
	}: ButtonProps | AnchorProps = $props()

	let tooltipId = $state(title ? generateUUIDv4() : '')

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

{#if isButton(attributes)}
	<button
		{...attributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class="{size} {variant}{disabled
			? '-disabled pointer-events-none'
			: ' bt-enabled cursor-pointer'} relative flex select-none items-center gap-1 overflow-hidden rounded-full fill-current text-left font-medium {children
			? 'px-5'
			: 'px-2'} {attributes.class}"
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : undefined}
		aria-label={title}
		bind:this={element}
		class="{size} {variant}{disabled
			? '-disabled pointer-events-none'
			: ' bt-enabled'} relative flex select-none items-center gap-1 overflow-hidden rounded-full fill-current font-medium {children
			? 'px-5'
			: 'px-2'} {attributes.class}"
	>
		{@render content()}
	</a>
{/if}
{#if title && element}
	<Tooltip anchor={element} id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	.bt-enabled {
		/** Color scheme */
		--np-color-primary-button: var(--np-button-container-color, var(--np-color-primary));
		--np-color-primary-hover-button: var(
			--np-button-container-hover-color,
			var(--np-color-primary-container)
		);
		--np-color-on-primary-button: var(--np-button-on-container-color, var(--np-color-on-primary));
		--np-ripple-hover-color: var(--np-color-primary-button);
		--np-ripple-pressed-color: var(--np-color-primary-button);
		transition: background-color 0.3s ease;
	}
	.bt-enabled:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-primary-button);
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
		color: var(--np-color-primary-button);
	}
	.text-disabled {
		color: var(--np-color-outline);
	}
	.filled {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--md-ripple-pressed-color: var(--np-color-surface);
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		color: var(--np-color-on-primary-button);
		background-color: var(--np-color-primary-button);
	}
	@media (hover: hover) {
		.filled:hover {
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
		color: var(--np-color-outline);
		background-color: var(--np-color-outline-variant);
	}

	.tonal {
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		color: var(--np-color-on-secondary-container);
		background-color: var(--np-color-secondary-container);
	}

	@media (hover: hover) {
		.tonal:hover {
			box-shadow: var(
				--np-elevation-1,
				0 1px 2px 0 rgb(0 0 0 / 0.6),
				0 0px 0px -1px rgb(0 0 0 / 0.6)
			);
		}
	}
	.tonal:active {
		box-shadow: none;
	}
	.tonal-disabled {
		color: var(--np-color-outline);
		background-color: var(--np-color-outline-variant);
	}

	.elevated {
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		color: var(--np-color-on-secondary-container);
		background-color: var(--np-color-surface-container-low);
		box-shadow: var(--np-elevation-1);
	}

	@media (hover: hover) {
		.elevated:hover {
			box-shadow: var(--np-elevation-2);
		}
	}
	.elevated:active {
		box-shadow: var(--np-elevation-1);
	}
	.elevated-disabled {
		color: var(--np-color-outline);
		background-color: var(--np-color-outline-variant);
	}
	.outlined {
		border: 1px solid;
		color: var(--np-color-primary-button);
		border-color: var(--np-color-primary-button);
	}
	.outlined-disabled {
		border: 1px solid;
		color: var(--np-color-outline);
		border-color: var(--np-color-outline-variant);
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
