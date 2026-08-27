<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { NavigationRailProps } from './types.ts'

	let {
		children,
		element = $bindable(),
		onkeydown: userKeydown,
		...attributes
	}: NavigationRailProps = $props()

	const attach = rovingTabindex('.np-navigation-action')
	const arrowHandler = arrowKeyNav('.np-navigation-action')

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}
</script>

<nav
	{...attributes}
	{@attach attach}
	bind:this={element}
	class={['np-navigation-rail', attributes.class]}
	onkeydown={handleKeydown}
>
	{#if children}
		{@render children()}
	{/if}
</nav>

<style>
	.np-navigation-rail {
		overflow-y: auto;
		z-index: 8;
		background-color: var(--np-color-surface);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 80px;
		gap: 0.75rem;
	}
</style>
