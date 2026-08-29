<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { NavigationBarProps } from './types.ts'

	let {
		children,
		arrangement = 'equal-weight',
		element = $bindable(),
		onkeydown: userKeydown,
		...attributes
	}: NavigationBarProps = $props()

	// The same attachments the rail uses. They read no reactive state, so they never tear down.
	const attach = rovingTabindex('.np-navigation-bar-item')
	const arrowHandler = arrowKeyNav('.np-navigation-bar-item', 'horizontal')

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}
</script>

<nav
	{...attributes}
	{@attach attach}
	bind:this={element}
	class={[
		'np-navigation-bar',
		arrangement === 'centered' && 'np-navigation-bar-centered',
		attributes.class,
	]}
	onkeydown={handleKeydown}
>
	{@render children?.()}
</nav>

<style>
	.np-navigation-bar {
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		box-sizing: border-box;
		width: 100%;
		min-height: 5rem;
		padding-block: 0.75rem;
		padding-inline: 0.5rem;
		background-color: var(--np-navigation-bar-container-color, var(--np-color-surface-container));
		/* Sits above page content the way a rail does, and clears the home inset on a phone. */
		padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
		z-index: 8;
	}

	/* Items keep their own content width instead of stretching, and group in the middle. */
	.np-navigation-bar-centered {
		justify-content: center;
		gap: 0.5rem;
	}
	/*
	 * Doubled selector to outrank the item's own `.svelte-*`-scoped `flex: 1` rule, which has the
	 * same specificity and would otherwise win or lose depending on CSS bundle order.
	 */
	:global(.np-navigation-bar-centered .np-navigation-bar-item.np-navigation-bar-item) {
		flex: 0 0 auto;
		min-width: 0;
	}
</style>
