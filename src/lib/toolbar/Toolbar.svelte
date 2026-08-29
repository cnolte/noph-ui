<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { ToolbarProps } from './types.ts'

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
	const arrowHandler = $derived(arrowKeyNav(ITEMS, orientation))

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
		box-sizing: border-box;
		gap: var(--np-toolbar-gap, 0.25rem);
		color: var(--np-toolbar-color, var(--np-color-on-surface));
		--np-icon-button-icon-color: var(--np-toolbar-color, var(--np-color-on-surface-variant));
	}

	.np-toolbar-vertical {
		flex-direction: column;
		/*
		 * Stacked actions sit right above one another, so a tooltip in its default place covers the
		 * button before it. Moving it to the trailing side keeps every action readable, and
		 * flip-inline sends it the other way when the window edge really is in the way. Material's
		 * Compose API exposes the same idea as TooltipAnchorPosition.End.
		 */
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

	/* Docked: full width, flush to the edge, no corner rounding. */
	.np-toolbar-docked {
		width: 100%;
		min-height: 4rem;
		justify-content: center;
		padding-inline: 0.5rem;
		background-color: var(--np-toolbar-container-color, var(--np-color-surface-container));
		/* Clears the home inset when docked to the bottom of a phone screen. */
		padding-block-end: max(0px, env(safe-area-inset-bottom));
	}
	.np-toolbar-docked.np-toolbar-vertical {
		width: auto;
		height: 100%;
		min-height: 0;
		min-width: 4rem;
		padding-block: 0.5rem;
		padding-inline: 0;
	}

	/*
	 * Floating: an island above the content. `position: sticky` keeps it in flow so it never
	 * covers the end of the page, which `fixed` would.
	 */
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
		inset-inline-start: var(--np-toolbar-inset, 1rem);
	}
	.np-toolbar-end {
		inset-inline-end: var(--np-toolbar-inset, 1rem);
		margin-inline-start: auto;
	}

	.np-toolbar-vibrant {
		background-color: var(--np-toolbar-container-color, var(--np-color-primary-container));
		--np-toolbar-color: var(--np-color-on-primary-container);
		color: var(--np-toolbar-color);
	}
</style>
