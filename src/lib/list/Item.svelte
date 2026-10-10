<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { buttonType, elementTag } from '#lib/internal/elementTag.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { ItemProps } from './types.js'

	let {
		selected = false,
		start,
		avatar,
		end,
		children,
		supportingText,
		disabled = false,
		softFocus = false,
		lazy = false,
		variant,
		type,
		element = $bindable(),
		...attributes
	}: ItemProps = $props()

	let tag = $derived(elementTag(attributes, type ?? variant))
</script>

{#snippet content()}
	{#if avatar}
		<div class="np-item-avatar" aria-hidden={typeof avatar === 'string' ? 'true' : undefined}>
			{#if typeof avatar === 'string'}
				{avatar}
			{:else}
				{@render avatar()}
			{/if}
		</div>
	{:else if start}
		<div class={['np-item-start', selected && 'selected', disabled && 'disabled']}>
			{@render start()}
		</div>
	{/if}
	<div class="np-item-text">
		<div class="np-item-headline">
			{#if children}
				{@render children()}
			{/if}
		</div>
		{#if supportingText}
			<div class="np-item-supporting-text">
				{#if typeof supportingText === 'string'}
					{supportingText}
				{:else}
					{@render supportingText()}
				{/if}
			</div>
		{/if}
	</div>

	{#if end}
		<div
			class={[
				'np-item-end',
				typeof end === 'string' && 'np-item-end-text',
				selected && 'selected',
				disabled && 'disabled',
			]}
		>
			{#if typeof end === 'string'}
				{end}
			{:else}
				{@render end()}
			{/if}
		</div>
	{/if}
{/snippet}

{#if disabled}
	<div
		{...attributes}
		bind:this={element}
		aria-disabled="true"
		class={['np-item disabled', lazy && 'np-item-lazy', attributes.class]}
	>
		{@render content()}
	</div>
{:else if tag === 'div'}
	<div
		{...attributes}
		bind:this={element}
		class={['np-item', selected && 'selected', lazy && 'np-item-lazy', attributes.class]}
	>
		{@render content()}
	</div>
{:else if tag === 'button'}
	<button
		{...attributes}
		bind:this={element}
		type={buttonType(type)}
		class={['np-item', selected && 'selected', lazy && 'np-item-lazy', attributes.class]}
	>
		{@render content()}
		<Ripple forceHover={softFocus} />
	</button>
{:else}
	<a
		{...attributes}
		bind:this={element}
		class={['np-item', selected && 'selected', lazy && 'np-item-lazy', attributes.class]}
	>
		{@render content()}
		<Ripple forceHover={softFocus} />
	</a>
{/if}

<style>
	.np-item-end,
	.np-item-start {
		display: flex;
	}
	.np-item-start {
		color: var(--np-item-leading-icon-color, var(--np-color-on-surface-variant));
	}
	.np-item-end {
		color: var(--np-item-trailing-icon-color, var(--np-color-on-surface-variant));
	}

	.np-item-end.selected,
	.np-item-start.selected {
		color: inherit;
	}

	.np-item-end.disabled,
	.np-item-start.disabled {
		color: inherit;
	}

	:global(.np-item-end svg, .np-item-start svg) {
		fill: currentColor;
		display: block;
	}

	.np-item {
		font: inherit;
		background-color: transparent;
		border-width: 0;
		position: relative;
		cursor: pointer;
		display: flex;
		flex: 1;
		flex-grow: 1;
		user-select: none;
		align-items: center;
		text-align: start;
		overflow: hidden;
		width: 100%;
		padding-block: 0.5rem;
		padding-inline: var(--np-item-padding-inline, 1rem);
		min-height: var(--np-item-container-height, 3.5rem);
		gap: var(--np-item-gap, 1rem);
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
		color: var(--np-item-label-text-color, var(--np-color-on-surface));
		box-sizing: border-box;
	}

	/* 12px above and below text with supporting text, so three lines come to 88px. */
	.np-item:has(.np-item-supporting-text) {
		min-height: var(--np-item-container-height, 4.5rem);
		padding-block: 0.75rem;
	}
	.np-item-avatar {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--np-item-avatar-container-color, var(--np-color-primary-container));
		color: var(--np-item-avatar-label-text-color, var(--np-color-on-primary-container));
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.009rem;
	}
	.np-item-avatar > :global(*) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* Trailing text, such as a count, is label small. */
	.np-item-end-text {
		font-size: 0.6875rem;
		line-height: 1rem;
		font-weight: 500;
		letter-spacing: 0.031rem;
	}

	.np-item-lazy {
		content-visibility: auto;
		contain-intrinsic-block-size: auto var(--np-item-container-height, 3.5rem);
	}

	.np-item-lazy:has(.np-item-supporting-text) {
		contain-intrinsic-block-size: auto var(--np-item-container-height, 4.5rem);
	}

	.np-item:focus-visible :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}

	.np-item:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: -3px;
		border-radius: var(--np-shape-corner-extra-small);
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-item:focus-visible {
			animation: focusAnimationInset var(--np-motion-expressive-slow-effects) forwards;
		}
	}

	div.np-item {
		cursor: unset;
	}

	.np-item.selected {
		background-color: var(--np-color-secondary-container);
		color: var(--np-color-on-secondary-container);
	}

	.np-item-text {
		flex: 1;
		overflow: hidden;
	}

	.np-item-headline {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: inherit;
		flex: 1;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 0.031rem;
	}
	.np-item-supporting-text {
		color: var(--np-item-supporting-text-color, var(--np-color-on-surface-variant));
		font-size: 0.875rem;
		line-height: 1.25rem;
		letter-spacing: 0.016rem;
	}

	.np-item.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.np-item.disabled .np-item-supporting-text {
		color: inherit;
	}
</style>
