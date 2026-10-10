<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { ToolbarProps } from './types.js'

	let {
		variant = 'docked',
		placement = 'bottom',
		orientation = 'horizontal',
		color = 'standard',
		children,
		element = $bindable(),
		onkeydown: userKeydown,
		...attributes
	}: ToolbarProps = $props()

	const ITEMS = 'button, a[href], input:not([type="hidden"]), select, textarea'
	const attach = rovingTabindex(ITEMS)
	// Only a floating toolbar stands upright; a docked one always spans the bottom of the window.
	let direction = $derived(variant === 'floating' ? orientation : 'horizontal')
	let arrowHandler = $derived(arrowKeyNav(ITEMS, direction))

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}
</script>

<div
	{...attributes}
	{@attach attach}
	bind:this={element}
	role="toolbar"
	aria-orientation={direction}
	class={[
		'np-toolbar',
		`np-toolbar-${variant}`,
		variant === 'floating' && `np-toolbar-${placement}`,
		color === 'vibrant' && 'np-toolbar-vibrant',
		direction === 'vertical' && 'np-toolbar-vertical',
		attributes.class,
	]}
	onkeydown={handleKeydown}
>
	{@render children?.()}
</div>

<style>
	.np-toolbar {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		min-height: 4rem;
		gap: var(--np-toolbar-gap, var(--_gap));
		color: var(--np-toolbar-color, var(--np-color-on-surface));
		--np-icon-button-icon-color: var(--np-toolbar-color, var(--np-color-on-surface-variant));
	}

	.np-toolbar-vertical {
		flex-direction: column;
		max-height: calc(100% - 3rem);
		min-height: 0;
		min-width: 4rem;
		--np-tooltip-position-area: inline-end;
		--np-tooltip-justify-self: auto;
		--np-tooltip-align-self: anchor-center;
		--np-tooltip-margin: 0 4px;
		--np-tooltip-position-try-fallbacks: flip-inline;
		--np-rich-tooltip-position-area: inline-end;
		--np-rich-tooltip-justify-self: auto;
		--np-rich-tooltip-align-self: anchor-center;
		--np-rich-tooltip-margin: 0 4px;
		--np-rich-tooltip-position-try-fallbacks: flip-inline;
	}

	/* 16dp at the edges and 32dp between items; in a compact window the items spread evenly. */
	.np-toolbar-docked {
		--_gap: 2rem;
		width: 100%;
		padding-inline: 1rem;
		background-color: var(--np-toolbar-container-color, var(--np-color-surface-container));
		padding-block-end: max(0px, env(safe-area-inset-bottom));
	}
	@media (width < 600px) {
		.np-toolbar-docked {
			justify-content: space-between;
		}
	}

	/* As wide as its items need, and no closer than 16dp to the window's edges, 24dp upright. */
	.np-toolbar-floating {
		--_gap: 0.25rem;
		position: sticky;
		z-index: 8;
		width: fit-content;
		max-width: calc(100% - 2rem);
		margin-inline: auto;
		padding: 0.5rem;
		border-radius: var(--np-toolbar-shape, var(--np-shape-corner-full));
		background-color: var(--np-toolbar-container-color, var(--np-color-surface-container));
		box-shadow: var(--np-toolbar-elevation, var(--np-elevation-3));
	}

	.np-toolbar-bottom {
		inset-block-end: var(--np-toolbar-inset, 1rem);
	}
	.np-toolbar-top {
		inset-block-start: var(--np-toolbar-inset, 1rem);
	}
	.np-toolbar-start,
	.np-toolbar-end {
		margin-inline: 0;
		margin-block: auto;
	}
	.np-toolbar-start {
		inset-inline-start: var(--np-toolbar-inset, 1.5rem);
	}
	.np-toolbar-end {
		inset-inline-end: var(--np-toolbar-inset, 1.5rem);
		margin-inline-start: auto;
	}

	.np-toolbar-vibrant {
		background-color: var(--np-toolbar-container-color, var(--np-color-primary-container));
		--np-toolbar-color: var(--np-color-on-primary-container);
		color: var(--np-toolbar-color);
		/* A tonal toggle would blend into the primary container. */
		--np-tonal-icon-button-unselected-container-color: var(--np-color-surface-container);
		--np-tonal-icon-button-unselected-icon-color: var(--np-color-on-surface);
	}
</style>
