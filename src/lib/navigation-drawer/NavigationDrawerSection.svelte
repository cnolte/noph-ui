<script lang="ts">
	import type { NavigationDrawerSectionProps } from './types.js'

	let {
		label,
		children,
		element = $bindable(),
		...attributes
	}: NavigationDrawerSectionProps = $props()

	const uid = $props.id()
</script>

<!-- A group of related destinations, set off by a divider and named by its label. -->
<div
	{...attributes}
	bind:this={element}
	role="group"
	aria-labelledby="{uid}-label"
	class={['np-navigation-drawer-section', attributes.class]}
>
	<div class="np-navigation-drawer-section-divider"></div>
	<div id="{uid}-label" class="np-navigation-drawer-section-label">{label}</div>
	{@render children?.()}
</div>

<style>
	.np-navigation-drawer-section {
		display: flex;
		flex-direction: column;
	}
	/* 16dp above, and 28dp in from both edges of the drawer, like the labels. */
	.np-navigation-drawer-section-divider {
		height: 1px;
		margin: 1rem 1rem 0;
		background-color: var(--np-divider-color, var(--np-color-outline-variant));
	}
	.np-navigation-drawer-section-label {
		display: flex;
		align-items: center;
		min-height: 3.5rem;
		padding-inline: 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		letter-spacing: 0.006rem;
		color: var(--np-color-on-surface-variant);
	}
</style>
