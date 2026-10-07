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

	const ITEMS = 'button, a[href], input:not([type="hidden"])'
	const attach = rovingTabindex(ITEMS)
	let arrowHandler = $derived(arrowKeyNav(ITEMS, orientation))

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
	aria-orientation={orientation}
	class={[
		'np-toolbar',
		`np-toolbar-${variant}`,
		variant === 'floating' && `np-toolbar-${placement}`,
		variant === 'floating' && color === 'vibrant' && 'np-toolbar-vibrant',
		orientation === 'vertical' && 'np-toolbar-vertical',
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
		gap: var(--np-toolbar-gap, 0.25rem);
		color: var(--np-toolbar-color, var(--np-color-on-surface));
		--np-icon-button-icon-color: var(--np-toolbar-color, var(--np-color-on-surface-variant));
	}

	.np-toolbar-vertical {
		flex-direction: column;
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

	.np-toolbar-docked {
		width: 100%;
		padding-inline: 1rem;
		background-color: var(--np-toolbar-container-color, var(--np-color-surface-container));
		padding-block-end: max(0px, env(safe-area-inset-bottom));
	}
	.np-toolbar-docked.np-toolbar-vertical {
		width: auto;
		height: 100%;
		padding-block: 0.5rem;
		padding-inline: 0;
	}

	.np-toolbar-floating {
		position: sticky;
		z-index: 8;
		width: fit-content;
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
	}
</style>
