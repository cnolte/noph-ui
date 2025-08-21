<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import { setContext } from 'svelte'
	import type { TabsContext, TabsProps } from './types.ts'

	let {
		children,
		element = $bindable(),
		value = $bindable(),
		variant = 'primary',
		...attributes
	}: TabsProps = $props()

	let uid = $props.id()

	let tabsContext = $state<TabsContext>({
		value,
		variant,
		id: uid,
	})
	$effect(() => {
		value = tabsContext.value
	})

	$effect(() => {
		tabsContext.value = value
		tabsContext.variant = variant
	})
	setContext('np-tabs', tabsContext)
</script>

<nav {...attributes}>
	<div
		class={['np-tabs']}
		role="tablist"
		tabindex="-1"
		bind:this={element}
		onkeydown={(event) => {
			const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('.np-tab'))
			if (tabs && tabs.length > 0 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
				const focusedTab = event.currentTarget.querySelector<HTMLElement>('.np-tab:focus')
				const currentIndex = focusedTab ? tabs.indexOf(focusedTab) : 0
				const index = currentIndex + (event.key === 'ArrowRight' ? 1 : -1)
				const newTab =
					index < 0 ? tabs[tabs.length - 1] : index >= tabs.length ? tabs[0] : tabs[index]
				newTab.focus()
			}
		}}
	>
		{@render children?.()}
	</div>
	<Divider />
</nav>

<style>
	:global(.np-tabs .np-tab-content-active .np-indicator) {
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
			border-top-left-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
			border-top-right-radius: var(--np-indicator-radius, var(--np-shape-corner-full));
			position-anchor: --np-tab-indicator;
			transition: cubic-bezier(0.42, 1.67, 0.21, 0.9) 0.35s;
		}
	}
</style>
