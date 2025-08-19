<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import { onMount } from 'svelte'
	import type { TabsProps } from './types.ts'

	let { children, element = $bindable(), value = $bindable(), ...attributes }: TabsProps = $props()
	let tabs: HTMLElement[] | undefined = $state()
	let activeTab: HTMLElement | undefined = $state()
	const initialValue = value

	$effect(() => {
		if (value) {
			const oldTab = activeTab
			const newTab = tabs?.find((tab) => tab.getAttribute('data-value') === value)
			if (newTab && oldTab && newTab !== oldTab) {
				selectTab(newTab, oldTab, { id: newTab.id, value })
			}
		}
	})

	const selectTab = (
		newTab: HTMLElement,
		oldTab: HTMLElement,
		detail: { id: string; value: string | number },
	) => {
		const oldIndicator = oldTab.querySelector('.np-indicator') as HTMLElement
		const oldIndicatorRect = oldIndicator.getBoundingClientRect()
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
		activeTab = newTab
		tabs?.forEach((tab) => {
			tab.dispatchEvent(new CustomEvent('change', { detail }))
		})
	}

	const onChange = (event: Event) => {
		const { detail } = event as CustomEvent<{ id: string; value: string | number }>
		const oldTab = activeTab
		const newTab = tabs?.find((tab) => tab.id === detail.id)
		if (newTab && oldTab && newTab !== oldTab) {
			selectTab(newTab, oldTab, detail)
		}
	}

	onMount(() => {
		element?.addEventListener('change', onChange)
		return () => {
			element?.removeEventListener('change', onChange)
		}
	})
	const initialSetup = (el: HTMLElement) => {
		if (activeTab === undefined) {
			const childTabs = Array.from(el.querySelectorAll<HTMLElement>('.np-tab'))
			activeTab =
				childTabs && childTabs.length > 0
					? (childTabs.find((t) => {
							return t.getAttribute('data-value') === initialValue
						}) ?? childTabs[0])
					: undefined
			if (initialValue === undefined) {
				value = activeTab?.getAttribute('data-value') ?? undefined
			} else {
				value = initialValue
			}
			tabs = childTabs
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
			if (tabs && tabs.length > 0 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
				const focusedTab = event.currentTarget.querySelector('.np-tab:focus') as HTMLElement
				const currentIndex = tabs.indexOf(focusedTab)
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
