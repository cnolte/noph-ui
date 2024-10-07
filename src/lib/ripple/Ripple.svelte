<script lang="ts">
	let element: HTMLSpanElement
	let timeoutId: number | undefined = $state()

	const createRipple = (event: MouseEvent | TouchEvent): void => {
		const container: HTMLElement = event.currentTarget as HTMLElement

		const isMouseEvent = event instanceof MouseEvent
		const clientX = isMouseEvent ? (event as MouseEvent).clientX : event.touches[0].clientX
		const clientY = isMouseEvent ? (event as MouseEvent).clientY : event.touches[0].clientY
		const diameter = Math.max(container.clientWidth, container.clientHeight)
		const radius = diameter / 2
		const clientRect = container.getBoundingClientRect()
		if (element) {
			element.style.width = `${diameter}px`
			element.style.height = `${diameter}px`
			element.style.left = `${clientX - clientRect.x - radius}px`
			element.style.top = `${clientY - clientRect.y - radius}px`
			clearTimeout(timeoutId)
			element.classList.remove('np-ripple')
			void element.offsetWidth
			element.classList.add('np-ripple')

			timeoutId = setTimeout(() => {
				element?.classList.remove('np-ripple')
			}, 600)
			return
		}
	}

	$effect(() => {
		element?.parentElement?.addEventListener('mousedown', createRipple)
		element?.parentElement?.addEventListener('touchstart', createRipple)
	})
</script>

<span bind:this={element}></span>

<style>
	span {
		border-radius: 50%;
		position: absolute;
		pointer-events: none;
	}
	:global(.np-ripple) {
		background: color-mix(
			in srgb,
			var(--np-color-primary-ripple, var(--np-color-primary-fixed)) 30%,
			transparent
		);
		transform: scale(0);
		animation: ripple-animation 600ms linear;
	}

	@keyframes ripple-animation {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
