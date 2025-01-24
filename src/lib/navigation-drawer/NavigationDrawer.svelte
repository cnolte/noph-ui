<script lang="ts">
	import type { NavigationDrawerProps } from './types.ts'
	let {
		modal = false,
		backdrop = false,
		element = $bindable(),
		popover,
		children,
		...attributes
	}: NavigationDrawerProps = $props()
</script>

<nav
	{...attributes}
	bind:this={element}
	popover={modal ? popover || 'auto' : undefined}
	class={[
		'np-navigation-drawer-container',
		modal && 'np-navigation-drawer-shade',
		backdrop && 'np-navigation-drawer-backdrop',
		attributes.class,
	]}
>
	<div class="np-navigation-wrapper">
		<div class="np-navigation-drawer">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</nav>

<style>
	.np-navigation-drawer-container {
		color: var(--np-color-on-surface-variant);
		border-top-right-radius: var(--np-shape-corner-large);
		border-bottom-right-radius: var(--np-shape-corner-large);
		overflow: hidden;
		scrollbar-width: thin;
		overflow-y: auto;
		border: 0;
		margin: 0;
		padding: 0;
		background-color: transparent;
	}
	.np-navigation-wrapper {
		background-color: var(--np-navigation-drawer-background, var(--np-color-surface-container-low));
		width: var(--np-navigation-drawer-width, 22.5rem);
		height: var(--np-navigation-drawer-height, 100dvh);
		overflow-y: auto;
	}
	.np-navigation-drawer-container[popover] {
		width: 0;
		transition:
			overlay 0.2s allow-discrete,
			display 0.2s allow-discrete,
			width 0.2s ease-in;
	}
	.np-navigation-drawer-container:popover-open {
		width: var(--np-navigation-drawer-width, 22.5rem);
		@starting-style {
			width: 0;
		}
	}

	.np-navigation-drawer-container[popover] .np-navigation-wrapper {
		transform: translateX(-100%);
		transition: transform 0.2s ease-in;
	}
	.np-navigation-drawer-container:popover-open .np-navigation-wrapper {
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
		z-index: 100;
	}
	.np-navigation-drawer-backdrop[popover]::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0;
		transition: opacity 0.2s linear;
	}
	.np-navigation-drawer-backdrop[popover]:popover-open::backdrop {
		opacity: 0.38;
		@starting-style {
			opacity: 0;
		}
	}
</style>
