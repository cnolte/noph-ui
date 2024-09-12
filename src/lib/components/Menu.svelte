<script lang="ts">
	import type { Snippet } from 'svelte'
	import { slide } from 'svelte/transition'

	let {
		backdrop = true,
		onClose = () => {},
		width,
		anchor,
		children,
	}: {
		backdrop?: boolean
		onClose?: () => void
		children: Snippet
		width?: number
		anchor: HTMLElement
	} = $props()

	let withStyle = width !== undefined ? `width:${width}px;` : ''
	let anchorRect = $state(anchor.getBoundingClientRect())
	let clientWidth: number = $state(0)
	let clientHeight: number = $state(0)
	let wrapperHeight: number = $state(0)
	let screenHeight = $state(window.innerHeight)
	let screenWidth = $state(window.innerWidth)

	const distanceToBorder = 8

	let maxHeight = $derived(
		(anchorRect.top > screenHeight - anchorRect.bottom
			? anchorRect.top
			: screenHeight - anchorRect.bottom) - distanceToBorder,
	)
	let topOrBottom = $derived(
		anchorRect.top > screenHeight - anchorRect.bottom &&
			clientHeight > screenHeight - anchorRect.bottom
			? 'bottom'
			: 'top',
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

	const clickOutside = (element: Node, callbackFunction: (event: Event) => void) => {
		const onClick = (event: MouseEvent) => {
			if (element && !event.defaultPrevented) {
				callbackFunction(event)
			}
		}
		document.addEventListener('click', onClick, {
			capture: true,
			passive: true,
		})

		return {
			update(newCallbackFunction: VoidFunction) {
				callbackFunction = newCallbackFunction
			},
			destroy() {
				document.removeEventListener('click', onClick)
			},
		}
	}
</script>

<svelte:window onresize={resizeWindow} />

{#if backdrop}
	<div class="backdrop"></div>
{/if}

<div
	bind:clientHeight={wrapperHeight}
	class="menu"
	style="max-height:{maxHeight}px;{topOrBottom}:{anchorRect.height +
		2}px;right:{calculateRightPos}px;"
	transition:slide={{ duration: 200 }}
	use:clickOutside={onClose}
>
	<div class="menu-inner" bind:clientWidth bind:clientHeight>
		<ul style={withStyle}>
			{@render children()}
		</ul>
	</div>
</div>

<style>
	.backdrop {
		height: 100vh;
		inset: 0px;
		position: fixed;
		z-index: 20;
	}
	.menu-inner {
		padding-top: 1rem;
		padding-bottom: 1rem;
		background-color: var(--np-paper-background-color);
	}
	.menu {
		position: absolute;
		z-index: 40;
		overflow: auto;
		border-radius: 1rem;
		box-shadow:
			0 0px 10px -3px rgb(0 0 0 / 0.2),
			0 4px 6px -4px rgb(0 0 0 / 0.3);
	}
</style>
