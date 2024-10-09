<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: 'text' | 'filled' | 'outlined' | 'tonal'
		element?: HTMLElement
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		variant?: 'text' | 'filled' | 'outlined' | 'tonal'
		element?: HTMLElement
		disabled?: boolean
	}
	let {
		variant = 'text',
		children,
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
	{#if children}
		{@render children()}
	{/if}
{/snippet}

{#if disabled}
	<div bind:this={element} class="{variant}-disabled icon-button disabled {attributes.class}">
		{@render content()}
	</div>
{:else if isButton(attributes)}
	<button
		{...attributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class="{variant} icon-button enabled {attributes.class}"
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : undefined}
		aria-label={title}
		bind:this={element}
		class="{variant} icon-button enabled {attributes.class}"
	>
		{@render content()}
	</a>
{/if}

{#if title && element}
	<Tooltip anchor={element} id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	.icon-button {
		border-width: 0;
		position: relative;
		cursor: pointer;
		display: flex;
		user-select: none;
		align-items: center;
		overflow: hidden;
		border-radius: 9999px;
		text-decoration: none;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
	}

	:global(.icon-button svg) {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}
	.disabled {
		pointer-events: none;
		opacity: 0.5;
		color: var(--np-color-outline);
	}
	.filled-disabled,
	.tonal-disabled {
		background-color: var(--np-color-outline-variant);
	}
	.outlined-disabled {
		border: 1px solid;
		border-color: var(--np-color-outline-variant);
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
		--np-ripple-hover-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		--np-ripple-pressed-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
	}
	.filled {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--md-ripple-pressed-color: var(--np-color-surface);
		transition: background-color 150ms linear;
		color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		background-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
	}

	.tonal {
		transition: background-color 150ms linear;
		--np-ripple-hover-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		color: var(--np-tonal-icon-button-icon-color, var(--np-color-on-secondary-container));
		background-color: var(--np-tonal-icon-container-color, var(--np-color-secondary-container));
	}

	.outlined {
		border: 1px solid;
		--np-ripple-hover-color: var(
			--np-outlined-icon-button-icon-color,
			var(--np-color-on-surface-variant)
		);
		--np-ripple-pressed-color: var(
			--np-outlined-icon-button-icon-color,
			var(--np-color-on-surface-variant)
		);
		color: var(--np-outlined-icon-button-icon-color, var(--np-color-on-surface-variant));
		border-color: var(--np-outlined-icon-button-outline-color, var(--np-color-outline));
	}
</style>
