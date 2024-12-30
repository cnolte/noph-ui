<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
	import type { ButtonProps } from './types.ts'

	let {
		variant = 'outlined',
		children,
		start,
		end,
		title,
		element = $bindable(),
		disabled = false,
		...attributes
	}: ButtonProps = $props()

	let tooltipId = $state(title ? generateUUIDv4() : '')

	const isButton = (obj: unknown): obj is HTMLButtonAttributes => {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
	const isLink = (obj: unknown): obj is HTMLAnchorAttributes => {
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

{#if isButton(attributes) || disabled}
	<button
		{...attributes as HTMLButtonAttributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		{disabled}
		bind:this={element}
		class={[
			'np-button',
			disabled ? `${variant}-disabled disabled` : `${variant} enabled`,
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class={['np-button', 'enabled', variant, attributes.class]}
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
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	.np-button {
		box-sizing: border-box;
		font-family: inherit;
		background-color: transparent;
		border-width: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative;
		cursor: pointer;
		display: inline-flex;
		user-select: none;
		align-items: center;
		text-align: left;
		overflow: hidden;
		font-weight: 500;
		text-decoration: none;
		font-size: calc(var(--button-height) * 0.35);
		height: var(--button-height);
		padding-left: calc((var(--button-height) - 0.5rem) / 2);
		padding-right: calc((var(--button-height) - 0.5rem) / 2);
		gap: calc((var(--button-height) - 1.5rem) / 2);
	}
	.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.filled-disabled,
	.tonal-disabled,
	.elevated-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.filled-disabled {
		--button-height: var(--np-filled-button-container-height, 2.5rem);
		border-radius: var(--np-filled-button-container-shape, var(--np-shape-corner-full));
	}
	.tonal-disabled {
		--button-height: var(--np-tonal-button-container-height, 2.5rem);
		border-radius: var(--np-tonal-button-container-shape, var(--np-shape-corner-full));
	}
	.elevated-disabled {
		--button-height: var(--np-elevated-button-container-height, 2.5rem);
		border-radius: var(--np-elevated-button-container-shape, var(--np-shape-corner-full));
	}
	.outlined-disabled {
		border: 1px solid;
		--button-height: var(--np-outlined-button-container-height, 2.5rem);
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		border-radius: var(--np-outlined-button-container-shape, var(--np-shape-corner-full));
	}
	.text-disabled {
		--button-height: var(--np-text-button-container-height, 2.5rem);
		border-radius: var(--np-text-button-container-shape, var(--np-shape-corner-full));
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
		--button-height: var(--np-text-button-container-height, 2.5rem);
		--np-ripple-hover-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		color: var(--np-text-button-label-text-color, var(--np-color-primary));
		border-radius: var(--np-text-button-container-shape, var(--np-shape-corner-full));
		padding-left: calc((var(--button-height) - 1.5rem) / 2);
		padding-right: calc((var(--button-height) - 1.5rem) / 2);
	}
	.filled {
		--button-height: var(--np-filled-button-container-height, 2.5rem);
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
		--button-height: var(--np-tonal-button-container-height, 2.5rem);
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
		--button-height: var(--np-elevated-button-container-height, 2.5rem);
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
		--button-height: var(--np-outlined-button-container-height, 2.5rem);
		--np-ripple-hover-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		border-color: var(--np-outlined-button-outline-color, var(--np-color-outline));
		border-radius: var(--np-outlined-button-container-shape, var(--np-shape-corner-full));
	}
	.button-icon {
		display: inline-flex;
		align-items: center;
		pointer-events: none;
	}

	:global(.np-button .button-icon) {
		--_icon-size: calc((var(--button-height) - 0.375rem) / 2);
		--_icon-color: inherit;
	}

	:global(.np-button .button-icon svg) {
		fill: currentColor;
		display: block;
	}
	:global(.np-button .button-icon svg) {
		width: calc((var(--button-height) - 0.375rem) / 2);
		height: calc((var(--button-height) - 0.375rem) / 2);
	}
</style>