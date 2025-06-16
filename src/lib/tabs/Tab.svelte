<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import { getContext } from 'svelte'
	import type { TabProps } from './types.ts'

	let {
		children,
		inlineIcon = false,
		icon,
		onclick,
		onkeydown,
		value,
		href,
		variant = 'primary',
		...attributes
	}: TabProps = $props()
	let activeTab: { value: string | number; node: HTMLElement } = getContext('activeTab')
	let element: HTMLElement | undefined = $state()
	let isActive = $state(activeTab.value === value)

	$effect(() => {
		if (activeTab.value === value) {
			if (element && element !== activeTab.node) {
				setTabActive(element)
			}
			isActive = true
		} else {
			isActive = false
		}
	})

	const setTabActive = (el: HTMLElement) => {
		const oldTab = activeTab.node as HTMLElement | undefined
		const oldIndicator = oldTab?.querySelector('.np-indicator') as HTMLElement
		const oldIndicatorRect = oldIndicator?.getBoundingClientRect()
		if (oldIndicatorRect) {
			const newIndicator = el.querySelector<HTMLElement>('.np-indicator')
			newIndicator?.style.setProperty(
				'--np-tab-indicator-start',
				`${oldIndicatorRect.x - newIndicator.getBoundingClientRect().x}px`,
			)
			newIndicator?.style.setProperty('--np-tab-indicator-width', `${oldIndicatorRect.width}px`)
		}
		activeTab.value = value
		activeTab.node = el
	}

	const setActiveTab = (el: HTMLElement) => {
		if (isActive) {
			activeTab.node = el
		}
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
			{@render icon?.()}
			{@render children?.()}
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
		{@attach setActiveTab}
		{...attributes}
		tabindex={isActive ? 0 : -1}
		role="tab"
		bind:this={element}
		{href}
		class={[
			'np-tab',
			variant === 'secondary' && 'np-tab-secondary',
			isActive && 'np-tab-content-active',
			attributes.class,
		]}
		onclick={onClick}
		onkeydown={onKeyDown}
	>
		{@render content()}
	</a>
{:else}
	<div
		{@attach setActiveTab}
		{...attributes}
		tabindex={isActive ? 0 : -1}
		role="tab"
		bind:this={element}
		class={[
			'np-tab',
			variant === 'secondary' && 'np-tab-secondary',
			isActive && 'np-tab-content-active',
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
	}
	.np-tab-content-active {
		color: var(--np-color-primary);
		--_focus-bottom: 4px;
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
		animation: slide 0.3s ease-in-out;
	}

	@keyframes slide {
		0% {
			width: var(--np-tab-indicator-width, 100%);
			transform: translateX(var(--np-tab-indicator-start));
		}
		100% {
			width: 100%;
			transform: translateX(0);
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
		outline-color: var(--np-color-primary);
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
