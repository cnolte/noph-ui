<script lang="ts">
	import type { NavigationRailProps } from './types.ts'

	let { children, ...attributes }: NavigationRailProps = $props()
</script>

<div {...attributes} class="navigation-rail-container {attributes.class}">
	<nav class="navigation-rail">
		{#if children}
			{@render children()}
		{/if}
	</nav>
</div>

<style>
	.navigation-rail-container {
		overflow-y: auto;
		z-index: 8;
		background-color: var(--np-color-surface);
	}
	.navigation-rail {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80px;
		gap: 0.75rem;
	}
</style>
