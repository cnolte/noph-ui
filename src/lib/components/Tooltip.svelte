<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fade, scale } from 'svelte/transition'

	let {
		children,
		title
	}: {
		children: Snippet
		title: Snippet
	} = $props()
	let visible = $state(false)
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let containerEl = $state<HTMLElement>()

	let calcualteRightPos = $derived.by(() => {
		if (!containerEl) {
			return 0
		}
		if (containerEl.getBoundingClientRect().left + containerEl.clientWidth < clientWidth) {
			return (clientWidth - containerEl.clientWidth) * -1
		}

		return window.innerWidth - containerEl.getBoundingClientRect().left - containerEl.clientWidth >
			clientWidth / 2 || containerEl.clientWidth >= clientWidth
			? (containerEl.clientWidth - clientWidth) / 2
			: (window.innerWidth -
					containerEl.getBoundingClientRect().left -
					containerEl.clientWidth -
					8) *
					-1
	})
</script>

{#if children && title}
	<div
		role="tooltip"
		bind:this={containerEl}
		onmouseenter={() => {
			if (window.ontouchstart === undefined) {
				visible = true
			}
		}}
		onmouseleave={() => {
			visible = false
		}}
		class="tooltip"
	>
		{@render children()}
		{#if visible}
			<div transition:fade={{ duration: 200 }}>
				<div
					bind:clientWidth
					bind:clientHeight
					transition:scale={{ duration: 200 }}
					style="top:{window.innerHeight <
					containerEl.getBoundingClientRect().bottom + clientHeight + 16
						? -clientHeight - 4
						: containerEl.clientHeight + 4}px;right:{calcualteRightPos}px"
					class="tooltiptext"
				>
					{@render title()}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.tooltip {
		position: relative;
		display: inline-block;
	}
	.tooltiptext {
		width: max-content;
		position: absolute;
		z-index: 1;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		box-shadow: var(--np-shadow);
		border-radius: 0.375rem;
		color: var(--np-background-color, rgb(255, 255, 255));
		background-color: var(--np-text-color-secondary, rgb(82 82 82));
	}
</style>
