<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import { setContext } from 'svelte'
	import type { TabsProps } from './types.ts'

	let { children, element = $bindable(), value = $bindable(), ...attributes }: TabsProps = $props()
	let active = $state({
		value: value,
		node: element?.firstChild as HTMLElement | undefined,
	})
	setContext('activeTab', active)

	$effect(() => {
		value = active.value
	})
	$effect(() => {
		active.value = value
	})
</script>

<div {...attributes} class={[attributes.class]}>
	<div
		class={['np-tabs']}
		role="tablist"
		tabindex="-1"
		bind:this={element}
		onkeydown={(event) => {
			if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
				const tabs: HTMLElement[] = Array.from(event.currentTarget.querySelectorAll('.np-tab'))
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
