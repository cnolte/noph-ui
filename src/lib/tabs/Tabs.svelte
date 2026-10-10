<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { setTabsContext } from './context.js'
	import type { TabsContext, TabsProps } from './types.js'

	let {
		children,
		element = $bindable(),
		value = $bindable(),
		variant = 'primary',
		scrollable = false,
		...attributes
	}: TabsProps = $props()

	let indicatorValue = $state(value)
	let list = $state<HTMLElement>()
	// The first reveal jumps, so a page that opens on a later tab does not scroll it into view.
	let revealed = false
	const tabsContext: TabsContext = {
		get value() {
			return value
		},
		set value(next) {
			value = next
		},
		get indicatorValue() {
			return indicatorValue
		},
		set indicatorValue(next) {
			indicatorValue = next
		},
		get variant() {
			return variant
		},
		set variant(next) {
			variant = next
		},
		// A selected tab that scrolls is brought to the middle of the strip, as far as it goes.
		reveal(tab) {
			if (!scrollable || !list) return
			const strip = list.getBoundingClientRect()
			const box = tab.getBoundingClientRect()
			const left = box.left + box.width / 2 - (strip.left + strip.width / 2)
			list.scrollBy({ left, behavior: revealed ? 'auto' : 'instant' })
			revealed = true
		},
	}
	setTabsContext(tabsContext)

	let secondaryStyle = $derived(
		tabsContext.variant === 'secondary'
			? '--np-tabs-indicator-radius: 0;--_indicator-gap: 0;--_indicator-height: 2px'
			: '',
	)

	const attach = rovingTabindex('.np-tab', { currentAttr: 'aria-selected', currentValue: 'true' })
	const onkeydown = arrowKeyNav('.np-tab', 'horizontal')
</script>

<nav {...attributes} bind:this={element} style={secondaryStyle}>
	<div
		{@attach attach}
		bind:this={list}
		class={['np-tabs', scrollable && 'np-tabs-scrollable']}
		role="tablist"
		aria-orientation="horizontal"
		tabindex="-1"
		{onkeydown}
	>
		{@render children?.()}
	</div>
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
		overflow: auto;
		background-color: var(--np-color-surface);
		/* The divider lies inside the tabs' height, under the indicator. */
		box-shadow: inset 0 -1px var(--np-divider-color, var(--np-color-outline-variant));
		position: relative;
		@media (prefers-reduced-motion: no-preference) {
			scroll-behavior: smooth;
		}

		&::after {
			content: '';
			position: absolute;
			height: var(--_indicator-height, 3px);
			left: anchor(left);
			right: anchor(right);
			bottom: anchor(bottom);
			background-color: var(--np-color-primary);
			border-start-start-radius: var(--np-tabs-indicator-radius, var(--np-shape-corner-full));
			border-start-end-radius: var(--np-tabs-indicator-radius, var(--np-shape-corner-full));
			position-anchor: --np-tab-indicator;

			@media (prefers-reduced-motion: no-preference) {
				transition: var(--np-motion-expressive-default-spatial);
			}
		}
	}
	/* Scrollable tabs are as wide as their labels, the first one 52dp from the leading edge, so it
	   shows that the strip goes on. */
	.np-tabs-scrollable {
		padding-inline-start: 3.25rem;
	}
	.np-tabs-scrollable > :global(.np-tab) {
		flex: none;
	}
</style>
