<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import { setTabsContext } from './context.js'
	import type { TabsContext, TabsProps } from './types.ts'

	let {
		children,
		element = $bindable(),
		value = $bindable(),
		variant = 'primary',
		...attributes
	}: TabsProps = $props()

	// svelte-ignore state_referenced_locally
	let tabsContext = $state<TabsContext>({
		value,
		indicatorValue: value,
		variant,
	})
	$effect(() => {
		value = tabsContext.value
	})

	$effect(() => {
		tabsContext.value = value
		tabsContext.variant = variant
	})
	setTabsContext(tabsContext)

	const secondaryStyle = $derived(
		tabsContext.variant === 'secondary' ? '--np-indicator-radius: 0;--_indicator-gap: 0' : '',
	)

	const handleKeydown = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement
		},
	) => {
		const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('.np-tab'))
		if (tabs && tabs.length > 0 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
			const focusedTab = event.currentTarget.querySelector<HTMLElement>('.np-tab:focus')
			const currentIndex = focusedTab ? tabs.indexOf(focusedTab) : 0
			const index = currentIndex + (event.key === 'ArrowRight' ? 1 : -1)
			const newTab =
				index < 0 ? tabs[tabs.length - 1] : index >= tabs.length ? tabs[0] : tabs[index]
			newTab.focus()
			event.preventDefault()
		}
	}
</script>

<nav {...attributes} bind:this={element} style={secondaryStyle}>
	<div
		class={['np-tabs']}
		role="tablist"
		aria-orientation="horizontal"
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		{@render children?.()}
	</div>
	<Divider />
</nav>

<style>
	:global(.np-tabs .np-indicator-anchor) {
		anchor-name: --np-tab-indicator;
	}
	.np-tabs {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: end;
		width: 100%;
		height: 100%;
		scrollbar-width: none;
		scroll-behavior: smooth;
		overflow: auto;
		background-color: var(--np-color-surface);
		position: relative;

		&::after {
			content: '';
			position: absolute;
			height: 3px;
			left: anchor(left);
			right: anchor(right);
			bottom: anchor(bottom);
			background-color: var(--np-color-primary);
			border-start-start-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
			border-start-end-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
			position-anchor: --np-tab-indicator;
			transition: var(--np-motion-expressive-fast-spatial);
		}
	}
</style>
