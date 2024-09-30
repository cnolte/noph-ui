<script lang="ts">
	// Funktion zum Erstellen des Ripple-Effekts

	let element: HTMLSpanElement
	let timeoutId = $state(0)

	const createRipple = (event: any): void => {
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
			element.classList.remove('ripple')
			void element.offsetWidth
			element.classList.add('ripple')

			timeoutId = setTimeout(() => {
				element?.classList.remove('ripple')
			}, 600)
			return
		}
	}

	$effect(() => {
		element?.parentElement?.addEventListener('mousedown', createRipple)
		element?.parentElement?.addEventListener('touchstart', createRipple)
	})
</script>

<span class="absolute" bind:this={element}></span>

<style>
	:global(.ripple) {
		border-radius: 50%;
		background: color-mix(in srgb, var(--np-ripple-color) 30%, transparent);
		transform: scale(0);
		animation: ripple-animation 600ms linear;
		pointer-events: none;
	}

	@keyframes ripple-animation {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
