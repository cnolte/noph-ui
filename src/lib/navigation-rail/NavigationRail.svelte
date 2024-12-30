<script lang="ts">
	import type { NavigationRailProps } from './types.ts'

	let { children, ...attributes }: NavigationRailProps = $props()
</script>

<nav {...attributes} class="navigation-rail {attributes.class}">
	{#if children}
		{@render children()}
	{/if}
</nav>

<style>
	.navigation-rail {
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
