<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { FocusEventHandler } from 'svelte/elements'
	import type { ItemProps } from './types.ts'
	import { onMount } from 'svelte'

	let {
		selected = false,
		start,
		end,
		children,
		supportingText,
		disabled = false,
		onfocus,
		onblur,
		...attributes
	}: ItemProps = $props()

	let focused = $state(false)
	let visible = $state(false)
	let element: HTMLButtonElement | HTMLAnchorElement | undefined = $state()
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true
					observer.disconnect()
				}
			})
		})

		if (element) {
			observer.observe(element)
		}

		return () => observer.disconnect()
	})
</script>

{#snippet content()}
	{#if start}
		<div class="np-item-start {selected ? 'selected ' : ''}">
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
				{@render supportingText()}
			</div>
		{/if}
	</div>

	{#if end}
		<div class={['np-item-end', selected && 'selected']}>
			{@render end()}
		</div>
	{/if}
{/snippet}

{#if disabled}
	<div aria-disabled="true" class={['np-item disabled', attributes.class]}>
		{@render content()}
	</div>
{:else if attributes.variant === 'text' || attributes.variant === undefined}
	<div {...attributes} class={['np-item', selected && 'selected', attributes.class]}>
		{@render content()}
	</div>
{:else if attributes.variant === 'button'}
	<button
		{...attributes}
		onfocus={(event) => {
			focused = true
			;(onfocus as FocusEventHandler<HTMLButtonElement>)?.(event)
		}}
		onblur={(event) => {
			focused = false
			;(onblur as FocusEventHandler<HTMLButtonElement>)?.(event)
		}}
		class={['np-item', selected && 'selected', attributes.class]}
		bind:this={element}
	>
		{#if visible}
			{@render content()}
			<Ripple forceHover={focused} />
		{/if}
	</button>
{:else if attributes.variant === 'link'}
	<a
		{...attributes}
		onfocus={(event) => {
			focused = true
			;(onfocus as FocusEventHandler<HTMLAnchorElement>)?.(event)
		}}
		onblur={(event) => {
			focused = false
			;(onblur as FocusEventHandler<HTMLAnchorElement>)?.(event)
		}}
		class={['np-item', selected && 'selected', attributes.class]}
		bind:this={element}
	>
		{#if visible}
			{@render content()}
			<Ripple forceHover={focused} />
		{/if}
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

	:global(.np-item-end svg, .np-item-start svg) {
		fill: currentColor;
		display: block;
	}

	.np-item {
		font-family: inherit;
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
		padding: 0.75rem 1rem;
		min-height: 3.5rem;
		gap: 1rem;
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		color: var(--np-item-label-text-color, var(--np-color-on-surface));
		box-sizing: border-box;
	}

	.np-item:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-primary);
		outline-width: 3px;
		outline-offset: -3px;
		border-radius: var(--np-shape-corner-extra-small);
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-offset: -3px;
			outline-width: 3px;
		}
		50% {
			outline-offset: -6px;
			outline-width: 6px;
		}
		100% {
			outline-offset: -3px;
			outline-width: 3px;
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
	}
	.np-item-supporting-text {
		color: var(--np-item-supporting-text-color, var(--np-color-on-surface-variant));
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.np-item.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
		background-color: color-mix(in srgb, var(--np-color-on-surface) 10%, transparent);
	}
</style>
