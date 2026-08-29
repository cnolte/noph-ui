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
		padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
		z-index: 8;
	}

	.np-navigation-bar-centered {
		justify-content: center;
		gap: 0.5rem;
	}
	:global(.np-navigation-bar-centered .np-navigation-bar-item.np-navigation-bar-item) {
		flex: 0 0 auto;
		min-width: 0;
	}
</style>
