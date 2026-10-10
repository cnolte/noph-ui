<script lang="ts">
	import { getNavigationRailContext } from './context.js'
	import type { NavigationRailSectionProps } from './types.js'

	let {
		label,
		children,
		element = $bindable(),
		...attributes
	}: NavigationRailSectionProps = $props()

	const uid = $props.id()
	const rail = getNavigationRailContext()
	let expanded = $derived(rail?.expanded ?? false)
</script>

<!-- Secondary destinations under a header. They show only in the expanded rail. -->
<div
	{...attributes}
	bind:this={element}
	role="group"
	aria-labelledby="{uid}-label"
	hidden={!expanded}
	class={['np-navigation-rail-section', attributes.class]}
>
	<div id="{uid}-label" class="np-navigation-rail-section-label">{label}</div>
	{@render children?.()}
</div>

<style>
	.np-navigation-rail-section {
		display: flex;
		flex-direction: column;
	}
	.np-navigation-rail-section[hidden] {
		display: none;
	}
	/* 20dp above and 8dp below, the text in line with the icons. */
	.np-navigation-rail-section-label {
		padding: 1.25rem 2.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		letter-spacing: 0.006rem;
		white-space: nowrap;
		color: var(--np-color-on-surface-variant);
	}
	/* It fades in as the destinations above settle, like the labels beside the icons. */
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-rail-section {
			transition: opacity var(--np-motion-standard-fast-effects) 100ms;
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
