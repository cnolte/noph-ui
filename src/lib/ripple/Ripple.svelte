<script lang="ts">
	let element: HTMLSpanElement
	let timeoutId: number | undefined = $state()
	let pressed = $state(false)
	let hovered = $state(false)
	let timerStarted = $state(false)
	let lastTouchTime = $state(0)
	const TOUCH_DELAY = 500

	const createRipple = (event: MouseEvent | TouchEvent): void => {
		const container: HTMLElement = event.currentTarget as HTMLElement
		const isMouseEvent = event instanceof MouseEvent
		const clientX = isMouseEvent ? (event as MouseEvent).clientX : event.touches[0].clientX
		const clientY = isMouseEvent ? (event as MouseEvent).clientY : event.touches[0].clientY
		const diameter = Math.max(container.clientWidth, container.clientHeight)
		const clientRect = container.getBoundingClientRect()
		if (element) {
			element.style.width = `${diameter * 2}px`
			element.style.height = `${diameter * 2}px`
			element.style.left = `${clientX - clientRect.x - diameter}px`
			element.style.top = `${clientY - clientRect.y - diameter}px`
			pressed = true
			clearTimeout(timeoutId)
			timerStarted = true
			timeoutId = setTimeout(() => {
				timerStarted = false
			}, 150)
		}
	}

	$effect(() => {
		element?.parentElement?.addEventListener('touchstart', (event) => {
			createRipple(event)
		})
		element?.parentElement?.addEventListener('touchend', () => {
			lastTouchTime = Date.now()
			pressed = false
		})
		element?.parentElement?.addEventListener('mousedown', (event) => {
			if (Date.now() - lastTouchTime < TOUCH_DELAY) {
				return
			}
			createRipple(event)
		})
		element?.parentElement?.addEventListener('mouseup', () => {
			if (Date.now() - lastTouchTime < TOUCH_DELAY) {
				return
			}
			pressed = false
		})
		element?.parentElement?.addEventListener('mouseenter', () => {
			hovered = true
		})
		element?.parentElement?.addEventListener('mouseleave', () => {
			hovered = false
		})
	})
</script>

<div class:hovered class="surface" bind:this={element}>
	<span class:pressed={pressed || timerStarted} class="ripple" bind:this={element}></span>
</div>

<style>
	:host,
	.surface {
		border-radius: inherit;
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	.surface::before,
	.ripple {
		content: '';
		position: absolute;
	}
	.ripple {
		content: '';
		position: absolute;
	}
	.surface::before {
		background-color: var(--np-ripple-hover-color, var(--np-color-on-surface));
		inset: 0;
		opacity: 0;
		transition:
			opacity 15ms linear,
			background-color 15ms linear;
	}
	.hovered::before {
		opacity: var(--np-ripple-hover-opacity, 0.08);
	}
	.ripple {
		background-color: var(--md-ripple-pressed-color, var(--np-color-on-surface));
		opacity: 0;
		border-radius: 9999px;
		overflow: hidden;
		transition: opacity 0.3s linear;
	}
	.pressed {
		animation: ripple-animation 600ms linear;
		opacity: 0.12;
	}

	@keyframes ripple-animation {
		from {
			transform: scale(0);
			opacity: 0.12;
		}
		to {
			transform: scale(4);
		}
	}
</style>
