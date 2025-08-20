<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import { onMount } from 'svelte'
	import type { TabsProps } from './types.ts'

	let { children, element = $bindable(), value = $bindable(), ...attributes }: TabsProps = $props()
	const initialValue = value

	const getCurrentTabs = () => {
		if (!element) {
			return []
		}
		return Array.from(element.querySelectorAll<HTMLElement>('.np-tab'))
	}

	$effect(() => {
		if (value) {
			const tabs = getCurrentTabs()
			const newTab = tabs?.find((tab) => tab.getAttribute('data-value') === value)
			if (newTab) {
				selectTab(newTab, tabs, { id: newTab.id, value })
			}
		}
	})

	const selectTab = (
		newTab: HTMLElement,
		tabs: HTMLElement[],
		detail: { id: string; value: string | number },
	) => {
		const oldTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')
		if (!oldTab || oldTab === newTab) {
			return
		}
		const oldIndicator = oldTab.querySelector<HTMLElement>('.np-indicator')
		const oldIndicatorRect = oldIndicator?.getBoundingClientRect()
		if (oldIndicatorRect) {
			const newIndicator = newTab.querySelector<HTMLElement>('.np-indicator')
			if (newIndicator) {
				newIndicator.style.setProperty(
					'--np-tab-indicator-start',
					`${oldIndicatorRect.x - newIndicator.getBoundingClientRect().x}px`,
				)
				newIndicator.style.setProperty(
					'--np-tab-indicator-scale',
					`${oldIndicatorRect.width / newIndicator.clientWidth}`,
				)
			}
		}
		value = detail.value
		tabs?.forEach((tab) => {
			tab.dispatchEvent(new CustomEvent('change', { detail }))
		})
	}

	const onChange = (event: Event) => {
		const { detail } = event as CustomEvent<{ id: string; value: string | number }>
		const tabs = getCurrentTabs()
		const newTab = tabs?.find((tab) => tab.id === detail.id)
		if (newTab) {
			selectTab(newTab, tabs, detail)
		}
	}

	onMount(() => {
		element?.addEventListener('change', onChange)
		return () => {
			element?.removeEventListener('change', onChange)
		}
	})
	const initialSetup = (el: HTMLElement) => {
		const tabs = Array.from(el.querySelectorAll<HTMLElement>('.np-tab'))
		const activeTab =
			tabs && tabs.length > 0
				? (tabs.find((t) => {
						return t.getAttribute('data-value') === initialValue
					}) ?? tabs[0])
				: undefined
		if (initialValue === undefined) {
			value = activeTab?.getAttribute('data-value') ?? undefined
		} else {
			value = initialValue
		}
	}
</script>

<div {@attach initialSetup} {...attributes} class={[attributes.class]}>
	<div
		class={['np-tabs']}
		role="tablist"
		data-value={value}
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
</div>

<style>
	.np-tabs {
		display: flex;
		align-items: end;
		width: 100%;
		height: 100%;
		scrollbar-width: none;
		scroll-behavior: smooth;
		overflow: auto;
		background-color: var(--np-color-surface);
	}
</style>
