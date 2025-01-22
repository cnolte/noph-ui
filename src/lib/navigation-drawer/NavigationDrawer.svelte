<script lang="ts">
	import type { NavigationDrawerProps } from './types.ts'
	let {
		modal = false,
		backdrop = false,
		element = $bindable(),
		children,
		...attributes
	}: NavigationDrawerProps = $props()
</script>

<nav
	{...attributes}
	bind:this={element}
	class={[
		'np-navigation-drawer-container',
		modal && 'np-navigation-drawer-shade',
		backdrop && 'np-navigation-drawer-backdrop',
		attributes.class,
	]}
>
	<div class="np-navigation-drawer">
		{#if children}
			{@render children()}
		{/if}
	</div>
</nav>

<style>
	.np-navigation-drawer-container {
		background-color: var(--np-navigation-drawer-background, var(--np-color-surface-container-low));
		color: var(--np-color-on-surface-variant);
		border-top-right-radius: var(--np-shape-corner-large);
		border-bottom-right-radius: var(--np-shape-corner-large);
		height: var(--np-navigation-drawer-height, 100dvh);
		width: var(--np-navigation-drawer-width, 22.5rem);
		scrollbar-width: thin;
		overflow-y: auto;
		border: 0;
		margin: 0;
		padding: 0;
	}

	.np-navigation-drawer-container[popover] {
		transition-property: transform;
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: translateX(-100%);
	}
	.np-navigation-drawer-container:popover-open {
		transform: translateX(0);
		@starting-style {
			transform: translateX(-100%);
		}
	}
	.np-navigation-drawer {
		display: flex;
		padding: 0.75rem;
		flex-direction: column;
	}
	.np-navigation-drawer-shade {
		box-shadow: var(--np-elevation-1);
	}
	.np-navigation-drawer-backdrop::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0;
		transition:
			display 0.3s allow-discrete,
			overlay 0.3s allow-discrete,
			opacity 0.3s linear;
	}
	.np-navigation-drawer-backdrop:popover-open::backdrop {
		opacity: 0.38;
	}
	@starting-style {
		.np-navigation-drawer-backdrop:popover-open::backdrop {
			opacity: 0;
		}
	}
</style>
