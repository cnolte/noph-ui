<script lang="ts">
	import type { NavigationRail } from './types.ts'

	let { children, ...attributes }: NavigationRail = $props()
</script>

<nav {...attributes} class="navigation-rail">
	{#if children}
		{@render children()}
	{/if}
</nav>

<style>
	.navigation-rail {
		z-index: 8;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80px;
		gap: 0.75rem;
		background-color: var(--np-color-surface);
	}
</style>
