<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { NavigationRailItemProps } from './types.ts'

	let { selected, icon, label, ...attributes }: NavigationRailItemProps = $props()
	let touchEl: HTMLSpanElement | undefined = $state()
</script>

{#snippet content()}
	<div class="np-navigation-action-icon">
		<Ripple forElement={touchEl} />
		{@render icon()}
	</div>
	<div class="np-navigation-action-label">{label}</div>
	<span class="np-touch" bind:this={touchEl}></span>
{/snippet}

{#if 'href' in attributes}
	<a
		{...attributes}
		class={['np-navigation-action', selected && 'np-navigation-action-selected', attributes.class]}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		class={['np-navigation-action', selected && 'np-navigation-action-selected', attributes.class]}
	>
		{@render content()}
	</button>
{/if}

<style>
	.np-navigation-action {
		cursor: pointer;
		font: inherit;
		border: 0;
		background: none;
		align-items: center;
		gap: 0.25rem;
		display: flex;
		flex-direction: column;
		color: var(--np-color-on-surface);
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
	}
	.np-navigation-action:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		border-radius: 1rem;
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
	.np-navigation-action-icon {
		position: relative;
		color: var(--np-color-on-surface-variant);
		display: flex;
		border-radius: var(--np-shape-corner-full);
		justify-content: center;
		width: 3.5rem;
		height: 2rem;
		align-items: center;
		z-index: 1;
	}
	.np-navigation-action-label {
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: var(--np-navigation-rail-item-font-weight, 500);
		transition: all;
		color: var(--np-color-on-surface-variant);
	}
	.np-navigation-action-selected .np-navigation-action-icon {
		color: var(--np-color-on-secondary-container);
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
	.np-navigation-action-icon::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: scaleX(0.32);
		transition-duration: 0.2s;
		transition-property: transform, opacity;
		transition-timing-function: linear;
		background-color: var(--np-color-secondary-container);
		border-radius: 100px;
		z-index: -1;
	}
	.np-navigation-action-selected .np-navigation-action-icon::before {
		opacity: 1;
		transform: scaleX(1);
	}

	.np-navigation-action-selected .np-navigation-action-label {
		font-weight: var(--np-navigation-rail-item-selected-font-weight, 500);
		color: var(--np-color-secondary);
	}
	.np-touch {
		height: 56px;
		position: absolute;
		width: 80px;
	}
</style>
