<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { NavigationDrawerItemProps } from './types.ts'

	let {
		selected = false,
		label,
		badgeLabelText,
		icon,
		...attributes
	}: NavigationDrawerItemProps = $props()
</script>

{#snippet content()}
	<Ripple />
	<div class="np-navigation-drawer-item-icon">
		{#if icon}
			{@render icon()}
		{/if}
	</div>
	<div class="np-navigation-drawer-item-label">{label}</div>
	<div class="np-navigation-drawer-item-badge">{badgeLabelText}</div>
{/snippet}

{#if 'href' in attributes}
	<a
		{...attributes}
		class={[
			'np-navigation-drawer-item',
			selected && 'np-navigation-drawer-item-selected',
			attributes.class,
		]}
		aria-current={selected ? 'page' : undefined}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		class={[
			'np-navigation-drawer-item',
			selected && 'np-navigation-drawer-item-selected',
			attributes.class,
		]}
		type="button"
		aria-pressed={selected ? 'true' : undefined}
	>
		{@render content()}
	</button>
{/if}

<style>
	.np-navigation-drawer-item {
		cursor: pointer;
		font: inherit;
		color: var(--np-color-on-surface);
		text-decoration: none;
		border: 0;
		background: none;
		align-items: center;
		gap: 0.75rem;
		height: 3.5rem;
		display: inline-flex;
		position: relative;
		padding: 0 1rem 0 1rem;
		border-radius: var(--np-navigation-drawer-item-container-shape, var(--np-shape-corner-full));
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		z-index: 1;
	}

	.np-navigation-drawer-item::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: scaleX(0.32);
		transition-duration: 0.2s;
		transition-property: transform, opacity;
		transition-timing-function: linear;
		background-color: var(--np-color-secondary-container);
		border-radius: var(--np-shape-corner-full);
		z-index: -1;
	}

	.np-navigation-drawer-item-selected.np-navigation-drawer-item::before {
		opacity: 1;
		transform: scaleX(1);
	}

	.np-navigation-drawer-item:focus-visible {
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
	.np-navigation-drawer-item-icon {
		color: var(--np-color-on-surface-variant);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.np-navigation-drawer-item-selected .np-navigation-drawer-item-icon {
		color: var(--np-color-on-secondary-container);
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}

	.np-navigation-drawer-item-label {
		font-size: var(--np-navigation-drawer-item-font-size, 0.875rem);
		line-height: 1.25rem;
		font-weight: var(--np-navigation-drawer-item-font-weight, 500);
		flex: 1;
		text-align: start;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		color: var(--np-color-on-surface-variant);
	}

	.np-navigation-drawer-item-selected .np-navigation-drawer-item-label {
		font-weight: var(--np-navigation-drawer-item-selected-font-weight, 500);
		color: var(--np-color-on-secondary-container);
	}

	.np-navigation-drawer-item-badge {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		padding-inline-end: 0.5rem;
		color: var(--np-color-on-surface-variant);
	}
</style>
