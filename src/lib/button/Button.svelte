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
	{#if !disabled}
		<Ripple />
	{/if}
	<div class="button-icon">
		{#if start}
			{@render start()}
		{/if}
	</div>
	{#if children}
		<div class="children-wrapper">
			{@render children()}
		</div>
	{/if}
	<div class="button-icon">
		{#if end}
			{@render end()}
		{/if}
	</div>
{/snippet}

{#if disabled}
	<div bind:this={element} class="np-button disabled {variant}-disabled {size} {attributes.class}">
		{@render content()}
	</div>
{:else if isButton(attributes)}
	<button
		{...attributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class="np-button enabled {variant} {size} {attributes.class}"
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : undefined}
		aria-label={title}
		bind:this={element}
		class="np-button enabled {variant} {size} {attributes.class}"
	>
		{@render content()}
	</a>
{/if}

{#if title && element}
	<Tooltip anchor={element} id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	.children-wrapper {
		flex: 1;
	}
	.np-button {
		font-family: inherit;
		background-color: transparent;
		border-width: 0;
		position: relative;
		cursor: pointer;
		display: flex;
		user-select: none;
		align-items: center;
		text-align: left;
		overflow: hidden;
		font-weight: 500;
		text-decoration: none;
	}
	.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.text-disable {
		border-radius: var(--np-text-button-container-shape, var(--np-shape-corner-full));
	}
	.filled-disabled,
	.tonal-disabled,
	.elevated-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.filled-disabled {
		border-radius: var(--np-filled-button-container-shape, var(--np-shape-corner-full));
	}
	.tonal-disabled {
		border-radius: var(--np-tonal-button-container-shape, var(--np-shape-corner-full));
	}
	.elevated-disabled {
		border-radius: var(--np-elevated-button-container-shape, var(--np-shape-corner-full));
	}
	.outlined-disabled {
		border: 1px solid;
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		border-radius: var(--np-outlined-button-container-shape, var(--np-shape-corner-full));
	}
	.enabled {
		transition: background-color 0.3s ease;
	}
	.enabled:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-primary);
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
		--np-ripple-hover-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		color: var(--np-text-button-label-text-color, var(--np-color-primary));
		border-radius: var(--np-text-button-container-shape, var(--np-shape-corner-full));
	}
	.filled {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--np-ripple-pressed-color: var(--np-color-surface);
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		color: var(--np-filled-button-label-text-color, var(--np-color-on-primary));
		background-color: var(--np-filled-button-container-color, var(--np-color-primary));
		border-radius: var(--np-filled-button-container-shape, var(--np-shape-corner-full));
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

	.tonal {
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		--np-ripple-hover-color: var(--np-tonal-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-tonal-button-label-text-color, var(--np-color-primary));
		color: var(--np-tonal-button-label-text-color, var(--np-color-on-secondary-container));
		background-color: var(--np-tonal-button-container-color, var(--np-color-secondary-container));
		border-radius: var(--np-tonal-button-container-shape, var(--np-shape-corner-full));
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

	.elevated {
		transition:
			background-color 150ms linear,
			box-shadow 150ms linear;
		--np-ripple-hover-color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
		color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
		background-color: var(
			--np-elevated-button-container-color,
			var(--np-color-surface-container-low)
		);
		box-shadow: var(--np-elevation-1);
		border-radius: var(--np-elevated-button-container-shape, var(--np-shape-corner-full));
	}

	@media (hover: hover) {
		.elevated:hover {
			box-shadow: var(--np-elevation-2);
		}
	}
	.elevated:active {
		box-shadow: var(--np-elevation-1);
	}
	.outlined {
		border: 1px solid;
		--np-ripple-hover-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		border-color: var(--np-outlined-button-outline-color, var(--np-color-outline));
		border-radius: var(--np-outlined-button-container-shape, var(--np-shape-corner-full));
	}

	:global(.np-button .button-icon svg) {
		fill: currentColor;
		display: block;
	}
	:global(.np-button.small .button-icon svg) {
		width: 1rem;
		height: 1rem;
	}
	.small {
		font-size: 0.875rem;
		height: 2.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		gap: 0.5rem;
	}
	.small.text {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.medium.text {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	.large.text {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	:global(.np-button.medium .button-icon svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
	.medium {
		font-size: 1rem;
		height: 3rem;
		padding-left: 1.25rem;
		padding-right: 1.25rem;
		gap: 0.75rem;
	}
	:global(.np-button.large .button-icon svg) {
		width: 1.5rem;
		height: 1.5rem;
	}
	.large {
		font-size: 1.125rem;
		height: 3.5rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		gap: 1rem;
	}
</style>
