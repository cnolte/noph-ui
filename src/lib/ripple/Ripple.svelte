<script lang="ts">
	import type { RippleProps } from './types.ts'

	let {
		forceHover = false,
		element = $bindable(),
		forElement,
		...attributes
	}: RippleProps = $props()
	let pressed = $state(false)

	const PRESS_GROW_MS = 450
	const MINIMUM_PRESS_MS = 225
	const INITIAL_ORIGIN_SCALE = 0.2
	const PADDING = 10
	const SOFT_EDGE_MINIMUM_SIZE = 75
	const SOFT_EDGE_CONTAINER_RATIO = 0.35
	const PRESS_PSEUDO = '::after'
	const ANIMATION_FILL = 'forwards'
	const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)'
	const TOUCH_DELAY_MS = 150

	let rippleSize = $state('')
	let rippleScale = $state('')
	let initialSize = $state(0)
	let growAnimation: Animation | undefined = $state()
	let step: 'INACTIVE' | 'TOUCH_DELAY' | 'HOLDING' | 'WAITING_FOR_CLICK' = $state('INACTIVE')
	let rippleStartEvent: PointerEvent | undefined = $state()
	let checkBoundsAfterContextMenu = $state(false)

	const isTouch = (event: PointerEvent) => {
		return event.pointerType === 'touch'
	}

	const shouldReactToEvent = (event: PointerEvent) => {
		if (!event.isPrimary) {
			return false
		}

		if (rippleStartEvent && rippleStartEvent.pointerId !== event.pointerId) {
			return false
		}

		if (event.type === 'pointerenter' || event.type === 'pointerleave') {
			return !isTouch(event)
		}

		const isPrimaryButton = event.buttons === 1
		return isTouch(event) || isPrimaryButton
	}

	const determineRippleSize = () => {
		const { height, width } = element!.parentElement!.getBoundingClientRect()
		const maxDim = Math.max(height, width)
		const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE)

		initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE)
		const hypotenuse = Math.sqrt(width ** 2 + height ** 2)
		const maxRadius = hypotenuse + PADDING

		rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`
		rippleSize = `${initialSize}px`
	}

	const getNormalizedPointerEventCoords = (
		pointerEvent: PointerEvent,
	): {
		x: number
		y: number
	} => {
		const { scrollX, scrollY } = window
		const { left, top } = element!.parentElement!.getBoundingClientRect()
		const documentX = scrollX + left
		const documentY = scrollY + top
		const { pageX, pageY } = pointerEvent
		return { x: pageX - documentX, y: pageY - documentY }
	}

	const getTranslationCoordinates = (positionEvent?: Event) => {
		const { height, width } = element!.parentElement!.getBoundingClientRect()
		// end in the center
		const endPoint = {
			x: (width - initialSize) / 2,
			y: (height - initialSize) / 2,
		}

		let startPoint
		if (positionEvent instanceof PointerEvent) {
			startPoint = getNormalizedPointerEventCoords(positionEvent)
		} else {
			startPoint = {
				x: width / 2,
				y: height / 2,
			}
		}

		startPoint = {
			x: startPoint.x - initialSize / 2,
			y: startPoint.y - initialSize / 2,
		}

		return { startPoint, endPoint }
	}

	const startPressAnimation = (positionEvent?: Event) => {
		if (!element) {
			return
		}

		pressed = true
		growAnimation?.cancel()
		determineRippleSize()
		const { startPoint, endPoint } = getTranslationCoordinates(positionEvent)
		const translateStart = `${startPoint.x}px, ${startPoint.y}px`
		const translateEnd = `${endPoint.x}px, ${endPoint.y}px`

		growAnimation = element.animate(
			{
				top: [0, 0],
				left: [0, 0],
				height: [rippleSize, rippleSize],
				width: [rippleSize, rippleSize],
				transform: [
					`translate(${translateStart}) scale(1)`,
					`translate(${translateEnd}) scale(${rippleScale})`,
				],
			},
			{
				pseudoElement: PRESS_PSEUDO,
				duration: PRESS_GROW_MS,
				easing: EASING_STANDARD,
				fill: ANIMATION_FILL,
			},
		)
	}

	const endPressAnimation = async () => {
		rippleStartEvent = undefined
		step = 'INACTIVE'
		const animation = growAnimation
		let pressAnimationPlayState = Infinity
		if (typeof animation?.currentTime === 'number') {
			pressAnimationPlayState = animation.currentTime
		} else if (animation?.currentTime) {
			pressAnimationPlayState = animation.currentTime.to('ms').value
		}

		if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
			pressed = false
			return
		}

		// TODO This is buggy in async svelte
		// await new Promise((resolve) => {
		// 	setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState)
		// })

		if (growAnimation !== animation) {
			return
		}
		pressed = false
	}

	const inBounds = ({ x, y }: PointerEvent) => {
		const { top, left, bottom, right } = element!.parentElement!.getBoundingClientRect()
		return x >= left && x <= right && y >= top && y <= bottom
	}

	const handlePointerleave = (event: PointerEvent) => {
		if (!shouldReactToEvent(event)) {
			return
		}

		if (step !== 'INACTIVE') {
			endPressAnimation()
		}
	}

	const handlePointerup = (event: PointerEvent) => {
		if (!shouldReactToEvent(event)) {
			return
		}

		if (step === 'HOLDING') {
			step = 'WAITING_FOR_CLICK'
			return
		}

		if (step === 'TOUCH_DELAY') {
			step = 'WAITING_FOR_CLICK'
			startPressAnimation(rippleStartEvent)
			return
		}
	}

	const handlePointerdown = async (event: PointerEvent) => {
		if (!shouldReactToEvent(event)) {
			return
		}

		rippleStartEvent = event
		if (!isTouch(event)) {
			step = 'WAITING_FOR_CLICK'
			startPressAnimation(event)
			return
		}

		if (checkBoundsAfterContextMenu && !inBounds(event)) {
			return
		}

		checkBoundsAfterContextMenu = false

		step = 'TOUCH_DELAY'
		await new Promise((resolve) => {
			setTimeout(resolve, TOUCH_DELAY_MS)
		})

		if (step !== 'TOUCH_DELAY') {
			return
		}

		step = 'HOLDING'
		startPressAnimation(event)
	}

	const handleClick = () => {
		if (step === 'WAITING_FOR_CLICK') {
			endPressAnimation()
			return
		}

		if (step === 'INACTIVE') {
			startPressAnimation()
			endPressAnimation()
		}
	}

	const handlePointercancel = (event: PointerEvent) => {
		if (!shouldReactToEvent(event)) {
			return
		}

		endPressAnimation()
	}

	const handleContextmenu = () => {
		checkBoundsAfterContextMenu = true
		endPressAnimation()
	}

	const removeEvents = (el: HTMLElement) => {
		el.removeEventListener('click', handleClick)
		el.removeEventListener('contextmenu', handleContextmenu)
		el.removeEventListener('pointercancel', handlePointercancel)
		el.removeEventListener('pointerdown', handlePointerdown)
		el.removeEventListener('pointerleave', handlePointerleave)
		el.removeEventListener('pointerup', handlePointerup)
	}

	const addEvents = (el: HTMLElement) => {
		removeEvents(el)

		el.addEventListener('click', handleClick)
		el.addEventListener('contextmenu', handleContextmenu)
		el.addEventListener('pointercancel', handlePointercancel)
		el.addEventListener('pointerdown', handlePointerdown)
		el.addEventListener('pointerleave', handlePointerleave)
		el.addEventListener('pointerup', handlePointerup)
	}

	$effect(() => {
		const forcedColors = window?.matchMedia('(forced-colors: active)')
		if (!forcedColors.matches && forElement) {
			addEvents(forElement)
		} else {
			if (!forcedColors.matches && element) {
				addEvents(element)
			}
		}
		return () => {
			if (forElement) {
				removeEvents(forElement)
			}
			if (element) {
				removeEvents(element)
			}
		}
	})
</script>

<div
	aria-hidden="true"
	{...attributes}
	class={[
		pressed && 'np-ripple-pressed',
		forceHover && 'np-ripple-hovered',
		'np-ripple-surface',
		attributes.class,
	]}
	bind:this={element}
></div>

<style>
	@media (forced-colors: active) {
		.np-ripple-surface {
			display: none;
		}
	}

	.np-ripple-surface {
		border-radius: inherit;
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.np-ripple-surface {
		-webkit-tap-highlight-color: transparent;

		&::before,
		&::after {
			content: '';
			opacity: 0;
			position: absolute;
		}

		&::before {
			background-color: var(--np-ripple-hover-color, var(--np-color-on-surface));
			inset: 0;
			transition:
				opacity 15ms linear,
				background-color 15ms linear;
		}

		&::after {
			background: radial-gradient(
				closest-side,
				var(--np-ripple-pressed-color, var(--np-color-on-surface)) max(calc(100% - 70px), 65%),
				transparent 100%
			);
			transform-origin: center center;
			transition: opacity 375ms linear;
		}
	}

	.np-ripple-surface:hover:before,
	.np-ripple-hovered::before {
		background-color: var(--np-ripple-hover-color, var(--np-color-on-surface));
		opacity: var(--np-ripple-hover-opacity, 0.08);
	}

	.np-ripple-pressed::after {
		opacity: var(--np-ripple-pressed-opacity, 0.12);
		transition-duration: 105ms;
	}
</style>
