<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface MenuProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
		anchor: HTMLElement | undefined
	}

	let { anchor, children, ...attributes }: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let scrollY = $state(0)
	let scrollX = $state(0)
	let popoverElement: HTMLDivElement | undefined = $state()

	/*let maxHeight = $derived(
		(anchorRect.top > innerHeight - anchorRect.bottom
			? anchorRect.top
			: innerHeight - anchorRect.bottom) - distanceToBorder,
	)
*/
	const refreshValues = () => {
		if (popoverElement && anchor) {
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight) {
				popoverElement.style.setProperty('--np-offset', '50%')
				popoverElement.style.top = `${anchorRect.top - clientHeight - 2}px`
			} else {
				popoverElement.style.setProperty('--np-offset', '-50%')
				popoverElement.style.top = `${anchorRect.bottom + 2}px`
			}
			const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
			if (left > innerWidth - clientWidth) {
				popoverElement.style.left = `${innerWidth - clientWidth - 8}px`
			} else if (left < 8) {
				popoverElement.style.left = '8px'
			} else {
				popoverElement.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
			}
		}
	}
	$effect(refreshValues)

	$effect(() => {
		if (anchor) {
			anchor.addEventListener('click', () => {
				refreshValues()
			})
			window.addEventListener(
				'scroll',
				() => {
					refreshValues()
				},
				{ passive: true },
			)
		}
	})
</script>

<svelte:window
	bind:scrollX
	bind:scrollY
	bind:innerHeight
	bind:innerWidth
	onresize={refreshValues}
/>

<div
	bind:this={popoverElement}
	bind:clientWidth
	bind:clientHeight
	{...attributes}
	popover="auto"
	class="np-menu"
	role="menu"
>
	{@render children()}
</div>

<style>
	.np-menu[popover] {
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		overflow: auto;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 1rem 0;
		box-shadow: var(--np-elevation-2);
		margin: 0;
		margin-right: 2rem;
		transition:
			overlay 0.1s allow-discrete,
			display 0.1s allow-discrete,
			opacity 0.1s linear;
		opacity: 0;
		z-index: 1;
	}
	.np-menu:popover-open {
		opacity: 1;
		animation: fade-in 0.2s ease-out;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(var(--np-offset, -50%)) scaleY(0);
		}
		to {
			opacity: 1;
			transform: translateY(0) scaleY(1);
		}
	}
</style>
