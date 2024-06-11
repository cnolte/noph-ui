<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		id,
		backdrop = false,
		width,
		anchor,
		children
	}: {
		id: string
		backdrop?: boolean
		children: Snippet
		width?: number
		anchor: HTMLElement
	} = $props()

	let withStyle = width !== undefined ? `width:${width}px;` : ''
	let anchorRect = $state(anchor.getBoundingClientRect())
	let clientWidth: number = $state(0)
	let clientHeight: number = $state(0)
	let screenHeight = $state(window.innerHeight)
	let screenWidth = $state(window.innerWidth)

	const distanceToBorder = 8

	let maxHeight = $derived(
		(anchorRect.top > screenHeight - anchorRect.bottom
			? anchorRect.top
			: screenHeight - anchorRect.bottom) - distanceToBorder
	)
	let topOrBottom = $derived(
		anchorRect.top > screenHeight - anchorRect.bottom &&
			clientHeight > screenHeight - anchorRect.bottom
			? 'bottom'
			: 'top'
	)

	let calculateRightPos = $derived.by(() => {
		const right =
			screenWidth - anchorRect.left - anchorRect.width > clientWidth / 2 - distanceToBorder ||
			anchorRect.width >= clientWidth
				? (width ? 0 : anchorRect.width + distanceToBorder - clientWidth) / 2
				: (screenWidth - anchorRect.left - anchorRect.width - distanceToBorder) * -1
		if (anchorRect.left + right < 0) {
			return -clientWidth + anchorRect.width + distanceToBorder
		}
		return right
	})
	const resizeWindow = () => {
		screenHeight = window.innerHeight
		screenWidth = window.innerWidth
		anchorRect = anchor.getBoundingClientRect()
	}
</script>

<svelte:window onresize={resizeWindow} />

<div
	popover="auto"
	{id}
	style="max-height:{maxHeight}px;{topOrBottom}:{anchorRect.height +
		2}px;right:{calculateRightPos}px;"
>
	<div class="menu-content" bind:clientWidth bind:clientHeight>
		<ul style={withStyle}>
			{@render children()}
		</ul>
	</div>
</div>

<style>
	.menu-content {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	[popover] {
		border-radius: 1rem;
		background-color: var(--cn-paper-background-color);
		box-shadow:
			0 0px 10px -3px rgb(0 0 0 / 0.2),
			0 4px 6px -4px rgb(0 0 0 / 0.3);
		transition-property: transform;
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: translateY(100%);
	}
	:popover-open {
		transform: translateY(0);
	}
</style>
