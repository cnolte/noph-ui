<script lang="ts">
	import Badge from '$lib/badge/Badge.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import { onMount, tick } from 'svelte'
	import { getTabsContext } from './context.js'
	import type { TabProps } from './types.ts'

	let {
		children,
		inlineIcon = false,
		icon,
		onclick,
		onkeydown,
		value,
		href,
		badge = false,
		badgeLabel,
		element = $bindable(),
		...attributes
	}: TabProps = $props()

	const tabsContext = getTabsContext()
	let fallbackIndicator = $state(false)

	$effect(() => {
		if (tabsContext.value === value) {
			tabsContext.indicatorValue = value
		}
	})

	const setIndicatorValue = async () => {
		await tick()
		tabsContext.indicatorValue = value
	}

	onMount(() => {
		if (!('anchorName' in document.documentElement.style)) {
			fallbackIndicator = true
		}
	})
</script>

{#snippet content()}
	<div class={['np-tab-content', tabsContext.value === value && fallbackIndicator && 'fallback']}>
		<div
			class={[
				'np-tab-label',
				!inlineIcon && tabsContext.variant === 'primary' && children && icon && 'np-tab-no-inline',
			]}
		>
			{#if icon}
				{#if badge && tabsContext.variant === 'primary' && !inlineIcon}
					<div class="np-tab-icon-badge">
						<Badge label={badgeLabel} />
						{@render icon?.()}
					</div>
				{:else}
					{@render icon?.()}
				{/if}
			{/if}
			{#if badge && (!icon || tabsContext.variant === 'secondary' || inlineIcon)}
				<div style="--np-badge-position:static;">
					<span class="np-tab-label-badge">{@render children?.()}</span><Badge label={badgeLabel} />
				</div>
			{:else}
				{@render children?.()}
			{/if}
			{#if tabsContext.variant === 'primary'}
				<div
					class={['np-indicator', tabsContext.indicatorValue === value && 'np-indicator-anchor']}
				></div>
			{/if}
		</div>
		{#if tabsContext.variant === 'secondary'}
			<div
				class={['np-indicator', tabsContext.indicatorValue === value && 'np-indicator-anchor']}
			></div>
		{/if}
	</div>
	<div class="focus-area"></div>
	<Ripple />
{/snippet}

{#if href}
	<a
		{...attributes}
		bind:this={element}
		role="tab"
		aria-selected={tabsContext.value === value}
		tabindex={tabsContext.value === value ? 0 : -1}
		{href}
		class={[
			'np-tab',
			tabsContext.value === value && 'np-tab-content-active',
			tabsContext.variant === 'primary' ? 'primary' : 'secondary',
			attributes.class,
		]}
		{onclick}
		{onkeydown}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes}
		bind:this={element}
		role="tab"
		aria-selected={tabsContext.value === value}
		tabindex={tabsContext.value === value ? 0 : -1}
		class={[
			'np-tab',
			tabsContext.value === value && 'np-tab-content-active',
			tabsContext.variant === 'primary' ? 'primary' : 'secondary',
			attributes.class,
		]}
		onclick={(event) => {
			tabsContext.value = value
			setIndicatorValue()
			onclick?.(event)
		}}
		onkeydown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				tabsContext.value = value
				setIndicatorValue()
			}
			onkeydown?.(event)
		}}
	>
		{@render content()}
	</button>
{/if}

<style>
	.np-tab {
		flex: 1;
		font: inherit;
		background-color: transparent;
		border-width: 0;
		-webkit-tap-highlight-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		text-decoration: none;
		position: relative;
		cursor: pointer;
		padding: 0 1rem;
		color: var(--np-color-on-surface-variant);
		height: 3rem;
		transition: color 0.3s cubic-bezier(0.33, 1, 0.68, 1);
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
		margin-inline-end: 4px;
	}
	.np-tab-icon-badge {
		height: 1.5rem;
		width: 1.5rem;
		position: relative;
		--np-badge-start: 1.125rem;
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
		inset-inline: var(--_indicator-gap, 2px);
		height: 3px;
	}

	.fallback .np-indicator {
		background-color: var(--np-color-primary);
		border-start-start-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
		border-start-end-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
	}

	.focus-area {
		position: absolute;
		top: 0;
		inset-inline: 0;
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
