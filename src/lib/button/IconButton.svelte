<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { generateUUIDv4 } from '$lib/utils.js'
	import { onMount, type Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: 'text' | 'filled' | 'outlined' | 'tonal'
		element?: HTMLElement
		toggle?: boolean
		selected?: boolean
		selectedIcon?: Snippet
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		variant?: 'text' | 'filled' | 'outlined' | 'tonal'
		element?: HTMLElement
		disabled?: boolean
		toggle?: boolean
		selected?: boolean
		selectedIcon?: Snippet
	}
	let {
		variant = 'text',
		toggle = false,
		children,
		title,
		element = $bindable(),
		disabled,
		selected = false,
		selectedIcon,
		...attributes
	}: ButtonProps | AnchorProps = $props()

	let tooltipId = $state(title ? generateUUIDv4() : '')
	let selectedState = $state(!toggle || selected)

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

	onMount(() => {
		if (toggle) {
			element?.addEventListener('click', () => {
				selectedState = !selectedState
			})
		}
	})
</script>

{#snippet content()}
	<Ripple />
	{#if selectedIcon && selectedState}
		{@render selectedIcon()}
	{:else if children}
		{@render children()}
	{/if}
{/snippet}

{#if disabled}
	<div bind:this={element} class="np-icon-button disabled {variant}-disabled {attributes.class}">
		{@render content()}
	</div>
{:else if isButton(attributes)}
	<button
		{...attributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class="np-icon-button enabled {variant} {selectedState
			? (variant === 'outlined' || variant === 'text') && !toggle
				? ''
				: 'selected'
			: ''} {attributes.class}"
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : undefined}
		aria-label={title}
		bind:this={element}
		class="np-icon-button enabled {variant} {selectedState
			? (variant === 'outlined' || variant === 'text') && !toggle
				? ''
				: 'selected'
			: ''} {attributes.class}"
	>
		{@render content()}
	</a>
{/if}

{#if title && element}
	<Tooltip anchor={element} id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	.np-icon-button {
		background-color: transparent;
		border-width: 0;
		position: relative;
		cursor: pointer;
		display: flex;
		user-select: none;
		align-items: center;
		overflow: hidden;
		text-decoration: none;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
	}

	:global(.np-icon-button svg) {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}
	.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.filled-disabled,
	.tonal-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.text-disabled {
		border-radius: var(--np-icon-button-container-shape, var(--np-shape-corner-full));
	}
	.filled-disabled {
		border-radius: var(--np-filled-icon-button-container-shape, var(--np-shape-corner-full));
	}
	.tonal-disabled {
		border-radius: var(--np-tonal-icon-button-container-shape, var(--np-shape-corner-full));
	}

	.outlined-disabled {
		border: 1px solid;
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		border-radius: var(--np-outlined-icon-button-container-shape, var(--np-shape-corner-full));
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
		border-radius: var(--np-icon-button-container-shape, var(--np-shape-corner-full));
	}
	.text.selected {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
		color: var(--np-color-primary);
	}
	.filled {
		transition: background-color 150ms linear;
		--np-ripple-hover-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(
			--np-filled-icon-button-container-color,
			var(--np-color-primary)
		);
		color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
		background-color: var(--np-color-surface-container-highest);
		border-radius: var(--np-filled-icon-button-container-shape, var(--np-shape-corner-full));
	}
	.filled.selected {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--np-ripple-pressed-color: var(--np-color-surface);
		color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		background-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
	}

	.tonal {
		transition: background-color 150ms linear;
		border-radius: var(--np-tonal-icon-button-container-shape, var(--np-shape-corner-full));
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-container-highest);
	}
	.tonal.selected {
		--np-ripple-hover-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		color: var(--np-tonal-icon-button-icon-color, var(--np-color-on-secondary-container));
		background-color: var(--np-tonal-icon-container-color, var(--np-color-secondary-container));
	}

	.outlined {
		border: 1px solid;
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
		border-color: var(--np-outlined-icon-button-outline-color, var(--np-color-outline));
		border-radius: var(--np-outlined-icon-button-container-shape, var(--np-shape-corner-full));
	}
	.outlined.selected {
		border: none;
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-inverse-on-surface);
		background-color: var(--np-color-inverse-surface);
	}
</style>
