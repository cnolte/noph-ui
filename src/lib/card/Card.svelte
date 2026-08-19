<script lang="ts">
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { CardProps } from './types.ts'

	let {
		image,
		variant = 'outlined',
		disabled = false,
		element = $bindable(),
		headline,
		subhead,
		supportingText,
		action,
		children,
		type,
		...attributes
	}: CardProps = $props()
</script>

{#snippet content()}
	{#if image}
		<div class="np-card-image" style="background-image: url({image})"></div>
	{/if}
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
		{#if children}
			{@render children()}
		{/if}
		{#if action}
			<div class="np-card-action">{@render action()}</div>
		{/if}
	</div>
	{#if !disabled && type !== 'text'}
		<Ripple />
	{/if}
{/snippet}

{#if type === 'text'}
	<div
		{...attributes}
		bind:this={element}
		aria-disabled={disabled}
		class={[
			'np-card-container',
			`np-card-${variant}`,
			disabled && 'np-card-disabled',
			attributes.class,
		]}
	>
		{@render content()}
	</div>
{:else if type === 'button'}
	<button
		aria-disabled={disabled}
		{...attributes}
		type="button"
		bind:this={element}
		{disabled}
		class={[
			'np-card-container',
			`np-card-${variant}`,
			disabled && 'np-card-disabled',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{:else if type === 'link'}
	<a
		{...attributes}
		bind:this={element}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : undefined}
		role="link"
		class={[
			'np-card-container',
			`np-card-${variant}`,
			disabled && 'np-card-disabled',
			attributes.class,
		]}
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
		border-color: color-mix(in srgb, var(--np-color-outline) 12%, transparent);
		--background-color: transparent;
	}
	.np-card-container {
		font: inherit;
		text-align: start;
		display: inline-flex;
		flex-direction: column;
		position: relative;
		padding: 0;
		box-sizing: border-box;
		color: var(--np-color-on-surface);
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		cursor: pointer;
	}

	.np-card-container:focus-visible :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}

	.np-card-container:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
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
	.np-card-disabled {
		opacity: 0.38;
		cursor: unset;
		pointer-events: none;
	}

	.np-card-image {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-size: cover;
		background-position: 50%;
		border-start-start-radius: var(--border-radius);
		border-start-end-radius: var(--border-radius);
	}
	.np-card-container:not(:has(.np-card-content:not(:empty))) .np-card-image {
		border-radius: var(--border-radius);
	}
	.np-card-content {
		display: grid;
		position: relative;
		align-self: start;
		flex: 1 0 auto;
		min-width: calc(100% - 32px);
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
		margin-top: auto;
		padding-top: 1.5rem;
		justify-content: flex-end;
	}

	.np-card-supporting-text {
		font-size: 1rem;
	}
</style>
