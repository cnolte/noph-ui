<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import { onMount } from 'svelte'
	import type { TabProps } from './types.ts'
	import Badge from '$lib/badge/Badge.svelte'

	let {
		children,
		inlineIcon = false,
		icon,
		onclick,
		onkeydown,
		value,
		href,
		variant = 'primary',
		badge = false,
		badgeLabel,
		selected = $bindable(false),
		...attributes
	}: TabProps = $props()
	let element: HTMLElement | undefined = $state()
	let id = $props.id()
	let parentElement = $derived(element?.parentElement)

	const onChange = (event: Event) => {
		const { detail } = event as CustomEvent<{ id: string }>
		selected = detail.id === id
	}

	onMount(() => {
		element?.addEventListener('change', onChange)
		return () => {
			element?.removeEventListener('change', onChange)
		}
	})

	const setTabActive = (el: HTMLElement) => {
		parentElement?.dispatchEvent(new CustomEvent('change', { detail: { id: el.id, value } }))
	}

	const onClick = (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
		setTabActive(event.currentTarget)
		if (onclick) {
			onclick(event)
		}
	}
	const onKeyDown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (event.key === 'Enter' || event.key === ' ') {
			setTabActive(event.currentTarget)
		}
		if (onkeydown) {
			onkeydown(event)
		}
	}
	const setCheckInitialState = () => {
		if (parentElement?.getAttribute('data-value') === value) {
			selected = true
		}
	}
</script>

{#snippet content()}
	<div
		class="np-tab-content"
		style={variant === 'secondary' ? '--np-indicator-radius: 0;--_indicator-gap: 0' : ''}
	>
		<div
			class={[
				'np-tab-label',
				!inlineIcon && variant === 'primary' && children && icon && 'np-tab-no-inline',
			]}
		>
			{#if icon}
				{#if badge && variant === 'primary' && !inlineIcon}
					<div class="np-tab-icon-badge">
						<Badge label={badgeLabel} />
						{@render icon?.()}
					</div>
				{:else}
					{@render icon?.()}
				{/if}
			{/if}
			{#if badge && (!icon || variant === 'secondary' || inlineIcon)}
				<div style="--np-badge-position:static;">
					<span class="np-tab-label-badge">{@render children?.()}</span><Badge label={badgeLabel} />
				</div>
			{:else}
				{@render children?.()}
			{/if}
			{#if variant === 'primary'}
				<div class="np-indicator"></div>
			{/if}
		</div>
		{#if variant === 'secondary'}
			<div class="np-indicator"></div>
		{/if}
	</div>
	<div class="focus-area"></div>
	<Ripple />
{/snippet}

{#if href}
	<a
		{@attach setCheckInitialState}
		{...attributes}
		{id}
		tabindex={selected ? 0 : -1}
		role="tab"
		aria-selected={selected}
		data-value={value}
		bind:this={element}
		{href}
		class={[
			'np-tab',
			selected && 'np-tab-content-active',
			variant === 'primary' ? 'primary' : 'secondary',
			attributes.class,
		]}
		onclick={onClick}
		onkeydown={onKeyDown}
	>
		{@render content()}
	</a>
{:else}
	<div
		{@attach setCheckInitialState}
		{...attributes}
		{id}
		tabindex={selected ? 0 : -1}
		role="tab"
		aria-selected={selected}
		data-value={value}
		bind:this={element}
		class={[
			'np-tab',
			selected && 'np-tab-content-active',
			variant === 'primary' ? 'primary' : 'secondary',
			attributes.class,
		]}
		onclick={onClick}
		onkeydown={onKeyDown}
	>
		{@render content()}
	</div>
{/if}

<style>
	.np-tab {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		box-sizing: border-box;
		text-decoration: none;
		position: relative;
		cursor: pointer;
		padding: 0 1rem;
		color: var(--np-color-on-surface-variant);
		height: 3rem;
		transition: color 0.3s ease;
	}
	.np-tab-content-active {
		--_focus-bottom: 4px;
	}
	.np-tab-content-active.primary {
		color: var(--np-color-primary);
	}
	.np-tab-content-active.secondary {
		color: var(--np-color-on-surface);
	}
	.np-tab-content {
		height: 100%;
	}
	.np-tab-label {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		position: relative;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		gap: 0.5rem;
		text-wrap: nowrap;
		min-width: 1.5rem;
	}
	.np-tab-label-badge {
		margin-right: 4px;
	}
	.np-tab-icon-badge {
		height: 1.5rem;
		width: 1.5rem;
		position: relative;
		--np-badge-left: 1.125rem;
	}

	.np-tab-no-inline {
		flex-direction: column;
		gap: 2px;
		justify-content: center;
	}
	.np-tab:has(.np-tab-no-inline) {
		height: 4rem;
	}

	.np-indicator {
		position: absolute;
		bottom: 0;
		left: var(--_indicator-gap, 2px);
		right: var(--_indicator-gap, 2px);
		height: 3px;
		background-color: var(--np-color-primary);
		border-top-left-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
		border-top-right-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
		opacity: 0;
	}
	.np-tab-content-active .np-indicator {
		opacity: 1;
		transform-origin: left center;
		animation: slide 0.3s ease-in-out;
	}

	@keyframes slide {
		0% {
			transform: translateX(var(--np-tab-indicator-start)) scaleX(var(--np-tab-indicator-scale, 1));
		}
		100% {
			transform: translateX(0) scaleX(1);
		}
	}

	.focus-area {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: var(--_focus-bottom, 0);
		border-radius: var(--np-shape-corner-medium);
		transition: height 0.3s ease;
		pointer-events: none;
	}
	.np-tab:focus-visible {
		outline: none;
	}

	.np-tab:focus-visible .focus-area {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: -3px;
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
</style>
