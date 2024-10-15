<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

	interface TextProps extends HTMLAttributes<HTMLDivElement> {
		variant?: 'elevated' | 'filled' | 'outlined'
		disabled?: boolean
		image?: Snippet
		element?: HTMLElement
		headline?: string
		subhead?: string
		supportingText?: string
		action?: Snippet
		type: 'text'
	}
	interface ButtonProps extends HTMLButtonAttributes {
		variant?: 'elevated' | 'filled' | 'outlined'
		image?: Snippet
		element?: HTMLElement
		headline?: string
		subhead?: string
		supportingText?: string
		action?: Snippet
		type: 'button'
	}
	interface AnchorProps extends HTMLAnchorAttributes {
		variant?: 'elevated' | 'filled' | 'outlined'
		disabled?: boolean
		image?: Snippet
		element?: HTMLElement
		headline?: string
		subhead?: string
		supportingText?: string
		action?: Snippet
		type: 'link'
	}
	let {
		image,
		variant = 'outlined',
		disabled = false,
		element = $bindable(),
		title,
		headline,
		subhead,
		supportingText,
		action,
		...attributes
	}: TextProps | AnchorProps | ButtonProps = $props()
</script>

{#snippet content()}
	<div class="np-card-content">
		{#if headline}
			<span class="np-card-headline">
				{headline}
			</span>
		{/if}
		{#if subhead}
			<span class="np-card-subhead">
				{subhead}
			</span>
		{/if}
		{#if supportingText}
			<span class="np-card-supporting-text">
				{supportingText}
			</span>
		{/if}
		{#if action}
			<div class="np-card-action">{@render action()}</div>
		{/if}
	</div>
	{#if !disabled && attributes.type !== 'text'}
		<Ripple />
	{/if}
{/snippet}

{#if attributes.type === 'text'}
	<div
		{...attributes}
		bind:this={element}
		class="np-card-container np-card-{variant}{disabled ? ' np-card-disabled' : ''}"
	>
		{@render content()}
	</div>
{:else if attributes.type === 'button'}
	<button
		{...attributes}
		bind:this={element}
		class="np-card-container np-card-{variant}{disabled ? ' np-card-disabled' : ''}"
	>
		{@render content()}
	</button>
{:else if attributes.type === 'link'}
	<a
		{...attributes}
		bind:this={element}
		class="np-card-container np-card-{variant}{disabled ? ' np-card-disabled' : ''}"
	>
		{@render content()}
	</a>
{/if}

<style>
	.np-card-elevated {
		border-width: 0;
		box-shadow: var(--np-elevation-1);
		color: var(--np-color-on-surface);
		--background-color: var(
			--np-elevated-card-container-color,
			var(--np-color-surface-container-low)
		);
		--border-radius: var(--np-elevated-card-container-shape, var(--np-shape-corner-medium));
	}
	.np-card-elevated.np-card-disabled {
		--background-color: var(--np-color-surface);
	}
	.np-card-filled {
		border-width: 0;
		color: var(--np-color-on-surface);
		--background-color: var(
			--np-filled-card-container-color,
			var(--np-color-surface-container-highest)
		);
		--border-radius: var(--np-filled-card-container-shape, var(--np-shape-corner-medium));
	}
	.np-card-filled.np-card-disabled {
		--background-color: var(--np-color-surface-variant);
	}
	.np-card-outlined {
		color: var(--np-color-on-surface);
		border: 1px solid var(--np-color-outline-variant);
		--background-color: var(--np-outlined-card-container-color, var(--np-color-surface));
		--border-radius: var(--np-outlined-card-container-shape, var(--np-shape-corner-medium));
	}
	.np-card-outlined.np-card-disabled {
		border-color: color-mix(in srgb, var(--np-color-outline) 32%, transparent);
		--background-color: none;
	}
	.np-card-container {
		box-sizing: border-box;
		text-align: start;
		display: inline-flex;
		position: relative;
		box-sizing: border-box;
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		cursor: pointer;
	}
	.np-card-disabled {
		opacity: 0.38;
		cursor: unset;
		pointer-events: none;
	}
	.np-card-content {
		display: grid;
		position: relative;
		align-self: start;
		min-width: calc(100% - 48px);
		margin: 1rem;
		grid-gap: 0.5rem;
		gap: 0.5rem;
	}

	div.np-card-container {
		cursor: unset;
	}

	.np-card-headline {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 400;
	}

	.np-card-subhead {
		font-size: 1.25rem;
	}

	.np-card-action {
		display: flex;
		margin-top: 1.5rem;
		justify-content: flex-end;
	}

	.np-card-supporting-text {
		font-size: 1rem;
	}
</style>
