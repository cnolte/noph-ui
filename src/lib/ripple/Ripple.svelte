<script lang="ts">
	// Funktion zum Erstellen des Ripple-Effekts

	let element: HTMLSpanElement

	const createRipple = (event: MouseEvent | TouchEvent): void => {
		const container: HTMLElement = event.currentTarget as HTMLElement

		const isTouchEvent = event instanceof TouchEvent
		const clientX = isTouchEvent ? event.touches[0].clientX : (event as MouseEvent).clientX
		const clientY = isTouchEvent ? event.touches[0].clientY : (event as MouseEvent).clientY

		const diameter = Math.max(container.clientWidth, container.clientHeight)
		const radius = diameter / 2
		const clientRect = container.getBoundingClientRect()
		element.style.width = element.style.height = `${diameter}px`
		element.style.left = `${clientX - clientRect.x - radius}px`
		element.style.top = `${clientY - clientRect.y - radius}px`
		element.classList.add('ripple')

		setTimeout(() => {
			element.classList.remove('ripple')
		}, 600)
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
