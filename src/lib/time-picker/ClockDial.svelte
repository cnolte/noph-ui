<script lang="ts">
	import {
		formatMinutes,
		formatTwoDigits,
		isMinuteWithin,
		MINUTES_IN_HOUR,
		snapToStep,
	} from '#lib/date-picker/timeUtils.js'
	import { tick } from 'svelte'
	import type { ClockDialProps } from './types.ts'

	let {
		value,
		selection = 'hour',
		hour12 = false,
		minuteStep = 1,
		min,
		max,
		locale,
		disabled = false,
		element = $bindable(),
		isTimeEnabled,
		selectHourLabel = 'Select hour',
		selectMinuteLabel = 'Select minute',
		hourOptionLabel = (hourValue, total) =>
			`${hourValue} ${hourValue === '1' ? 'hour' : 'hours'} of ${total}`,
		minuteOptionLabel = (minuteValue, total) =>
			`${minuteValue} ${minuteValue === '1' ? 'minute' : 'minutes'} of ${total}`,
		onselect,
		onselectionend,
		...attributes
	}: ClockDialProps = $props()

	const OUTER_RATIO = 0.454
	const INNER_RATIO = 0.3021
	const DRAG_THRESHOLD = 3
	const FULL_CIRCLE = 360

	let tracking = $state(false)
	let announcement = $state('')
	let handleElement = $state<HTMLDivElement>()

	let step = $derived(Math.max(1, Math.trunc(minuteStep) || 1))
	let hour = $derived(Math.floor(value / MINUTES_IN_HOUR))
	let minute = $derived(value % MINUTES_IN_HOUR)
	let isPm = $derived(hour >= 12)

	const usable = (minutes: number) =>
		isMinuteWithin(minutes, min, max) && (isTimeEnabled?.(minutes) ?? true)

	const hourReachable = (candidate: number) => {
		for (let each = 0; each < MINUTES_IN_HOUR; each += step) {
			if (usable(candidate * MINUTES_IN_HOUR + each)) return true
		}
		return false
	}

	/** Minutes for an hour ring position, keeping the minute that is already selected. */
	const hourMinutes = (position: number) =>
		(hour12 ? (position % 12) + (isPm ? 12 : 0) : position) * MINUTES_IN_HOUR + minute

	interface DialOption {
		/** Minutes since midnight this option selects. */
		minutes: number
		/** Ring position, 0 at the top going clockwise. */
		position: number
		/** How many positions the ring has. */
		positions: number
		label?: string
		inner: boolean
		disabled: boolean
		accessibleLabel: string
	}

	let options = $derived.by<DialOption[]>(() => {
		if (selection === 'hour') {
			const total = hour12 ? 12 : 24
			return Array.from({ length: total }, (_, index) => {
				const minutes = hourMinutes(index)
				const inner = !hour12 && index >= 12
				const shown = hour12 ? index % 12 || 12 : index
				const label = hour12 ? `${shown}` : index === 0 ? '00' : `${index}`
				return {
					minutes,
					position: index % 12,
					positions: 12,
					label,
					inner,
					disabled: !hourReachable(hour12 ? (index % 12) + (isPm ? 12 : 0) : index),
					accessibleLabel: hourOptionLabel(`${shown}`, total),
				}
			})
		}
		const positions = Math.floor(MINUTES_IN_HOUR / step)
		const total = positions
		return Array.from({ length: positions }, (_, index) => {
			const each = index * step
			const minutes = hour * MINUTES_IN_HOUR + each
			return {
				minutes,
				position: (each / MINUTES_IN_HOUR) * 12,
				positions: 12,
				// Only every fifth minute carries a number, as on a real clock face.
				label: each % 5 === 0 ? formatTwoDigits(each, locale) : undefined,
				inner: false,
				disabled: !usable(minutes),
				accessibleLabel: minuteOptionLabel(`${each}`, total),
			}
		})
	})

	/** The option the handle is resting on, or the nearest one when it sits between two. */
	let selectedIndex = $derived.by(() => {
		let nearest = -1
		let distance = Infinity
		options.forEach((option, index) => {
			const gap = Math.abs(option.minutes - value)
			if (gap < distance) {
				distance = gap
				nearest = index
			}
		})
		return nearest
	})

	let tabStopIndex = $derived.by(() => {
		if (selectedIndex >= 0 && !options[selectedIndex].disabled) return selectedIndex
		const offered = options.findIndex((option) => !option.disabled)
		return offered >= 0 ? offered : Math.max(selectedIndex, 0)
	})

	const angleOf = (position: number, positions: number) => (position / positions) * FULL_CIRCLE - 90

	const ratioFor = (inner: boolean) => (inner ? INNER_RATIO : OUTER_RATIO)

	/**
	 * How far the numbers and the handle sit from the centre. The handle's own radius comes off the
	 * ring, the way Compose reads the ratios, which keeps a 48dp handle inside the 256dp dial instead
	 * of hanging over its edge.
	 */
	const radiusOf = (inner: boolean) =>
		`calc(var(--_size) * ${ratioFor(inner)} - var(--_handle) / 2)`

	/** The angle the handle points at, from the live value rather than the nearest labelled option. */
	let handleAngle = $derived(
		selection === 'hour' ? angleOf(hour % 12, 12) : angleOf((minute / MINUTES_IN_HOUR) * 12, 12),
	)

	let handleInner = $derived(selection === 'hour' && !hour12 && hour >= 12)

	// Rotating to the nearest equivalent angle keeps 11 -> 12 going forwards by 30 degrees instead of
	// spinning back 330. The running total is a plain variable so reading it creates no dependency.
	let unwrapped = 0
	let rotation = $state(0)

	$effect(() => {
		const target = handleAngle
		const delta = ((((target - unwrapped) % FULL_CIRCLE) + FULL_CIRCLE * 1.5) % FULL_CIRCLE) - 180
		unwrapped += delta
		rotation = unwrapped
	})

	const geometry = () => {
		const rect = element?.getBoundingClientRect()
		if (!rect) return undefined
		// Measured rather than assumed, so the ratios hold at any root font size or dial size.
		const handleRadius = (handleElement?.offsetWidth ?? 0) / 2
		return {
			cx: rect.left + rect.width / 2,
			cy: rect.top + rect.height / 2,
			radius: (inner: boolean) => rect.width * ratioFor(inner) - handleRadius,
		}
	}

	/** Reads a pointer position as minutes since midnight. */
	const fromPointer = (clientX: number, clientY: number, gesture: 'tap' | 'drag') => {
		const box = geometry()
		if (!box) return undefined
		const dx = clientX - box.cx
		const dy = clientY - box.cy
		const turn = ((Math.atan2(dy, dx) + Math.PI / 2) / (2 * Math.PI) + 1) % 1

		if (selection === 'hour') {
			const position = Math.round(turn * 12) % 12
			if (hour12) return hourMinutes(position)
			const midpoint = (box.radius(false) + box.radius(true)) / 2
			const inner = Math.hypot(dx, dy) < midpoint
			return (position + (inner ? 12 : 0)) * MINUTES_IN_HOUR + minute
		}

		// A tap lands on a whole five minutes, the way the numbers read; a drag keeps the full step.
		const snap = gesture === 'tap' ? Math.max(step, 5) : step
		const raw = Math.round(turn * MINUTES_IN_HOUR) % MINUTES_IN_HOUR
		return snapToStep(hour * MINUTES_IN_HOUR + raw, snap)
	}

	const announce = () => {
		announcement = formatMinutes(value, locale, hour12)
	}

	let pointerId: number | undefined
	let origin: { x: number; y: number } | undefined
	let moved = false

	// Capturing keeps the drag alive once the finger leaves the dial. It throws when the pointer is
	// already gone, which is nothing to act on, so both directions are guarded.
	const capture = (id: number, hold: boolean) => {
		try {
			if (hold) element?.setPointerCapture(id)
			else element?.releasePointerCapture(id)
		} catch {
			// The pointer ended on its own; there is nothing left to capture or release.
		}
	}

	const handlePointerdown = (event: PointerEvent) => {
		if (disabled || event.button !== 0) return
		event.preventDefault()
		pointerId = event.pointerId
		origin = { x: event.clientX, y: event.clientY }
		moved = false
		capture(event.pointerId, true)
	}

	const handlePointermove = (event: PointerEvent) => {
		if (disabled || pointerId !== event.pointerId || !origin) return
		if (!moved && Math.hypot(event.clientX - origin.x, event.clientY - origin.y) < DRAG_THRESHOLD) {
			return
		}
		moved = true
		tracking = true
		const next = fromPointer(event.clientX, event.clientY, 'drag')
		if (next !== undefined) onselect?.(next)
	}

	const handlePointerup = (event: PointerEvent) => {
		if (disabled || pointerId !== event.pointerId) return
		capture(event.pointerId, false)
		const next = fromPointer(event.clientX, event.clientY, moved ? 'drag' : 'tap')
		if (next !== undefined) onselect?.(next)
		pointerId = undefined
		origin = undefined
		tracking = false
		moved = false
		announce()
		onselectionend?.('pointer')
	}

	const handlePointercancel = (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return
		capture(event.pointerId, false)
		pointerId = undefined
		origin = undefined
		tracking = false
		moved = false
	}

	const focusOption = async (index: number) => {
		const target = options[index]
		if (!target) return
		onselect?.(target.minutes)
		announcement = formatMinutes(target.minutes, locale, hour12)
		// The buttons are keyed by their minute, so let the list settle before reaching for one.
		await tick()
		element
			?.querySelector<HTMLElement>(`.np-clock-dial-option[data-minutes="${target.minutes}"]`)
			?.focus()
	}

	const stepBy = (delta: number) => {
		const from = tabStopIndex
		const count = options.length
		focusOption((((from + delta) % count) + count) % count)
	}

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return
		const keys: Record<string, () => void> = {
			ArrowRight: () => stepBy(1),
			ArrowUp: () => stepBy(1),
			ArrowLeft: () => stepBy(-1),
			ArrowDown: () => stepBy(-1),
			PageUp: () => stepBy(5),
			PageDown: () => stepBy(-5),
			Home: () => focusOption(0),
			End: () => focusOption(options.length - 1),
		}
		const action = keys[event.key]
		if (!action) return
		event.preventDefault()
		action()
	}
</script>

<div
	{...attributes}
	bind:this={element}
	role="listbox"
	aria-label={selection === 'hour' ? selectHourLabel : selectMinuteLabel}
	aria-disabled={disabled || undefined}
	class={['np-clock-dial', tracking && 'np-tracking', disabled && 'np-disabled', attributes.class]}
	onpointerdown={handlePointerdown}
	onpointermove={handlePointermove}
	onpointerup={handlePointerup}
	onpointercancel={handlePointercancel}
	onkeydown={handleKeydown}
>
	<div class="np-clock-dial-selector" style="rotate: {rotation}deg">
		<div class="np-clock-dial-track" style="--_r: {radiusOf(handleInner)}"></div>
		<div
			bind:this={handleElement}
			class="np-clock-dial-handle"
			style="--_r: {radiusOf(handleInner)}"
		></div>
	</div>
	<div class="np-clock-dial-center"></div>

	{#each options as option, index (option.minutes)}
		{@const angle = (angleOf(option.position, option.positions) * Math.PI) / 180}
		{@const radius = radiusOf(option.inner)}
		<button
			type="button"
			role="option"
			{disabled}
			data-minutes={option.minutes}
			aria-selected={index === selectedIndex}
			aria-disabled={option.disabled || undefined}
			aria-label={option.accessibleLabel}
			tabindex={tabStopIndex === index ? 0 : -1}
			class={[
				'np-clock-dial-option',
				option.minutes === value && 'selected',
				!option.label && 'np-unlabelled',
			]}
			style="--_x: calc({radius} * {Math.cos(angle).toFixed(5)}); --_y: calc({radius} * {Math.sin(
				angle,
			).toFixed(5)})"
			onclick={() => {
				if (option.disabled) return
				onselect?.(option.minutes)
				announcement = formatMinutes(option.minutes, locale, hour12)
				onselectionend?.('keyboard')
			}}
		>
			<span aria-hidden="true">{option.label ?? ''}</span>
		</button>
	{/each}

	<span class="np-clock-dial-sr-only" aria-live="polite">{announcement}</span>
</div>

<style>
	.np-clock-dial {
		--_size: var(--np-time-picker-clock-dial-size, 16rem);
		--_handle: 3rem;
		position: relative;
		box-sizing: border-box;
		width: var(--_size);
		height: var(--_size);
		flex: none;
		border-radius: var(--np-time-picker-clock-dial-container-shape, var(--np-shape-corner-full));
		background-color: var(
			--np-time-picker-clock-dial-container-color,
			var(--np-color-surface-container-highest)
		);
		touch-action: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	}

	.np-clock-dial:focus-visible {
		outline: none;
	}

	.np-clock-dial.np-disabled {
		cursor: default;
	}

	.np-clock-dial-center,
	.np-clock-dial-handle,
	.np-clock-dial-track {
		background-color: var(--np-time-picker-clock-dial-selector-color, var(--np-color-primary));
	}

	.np-clock-dial-center {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0.5rem;
		height: 0.5rem;
		margin: -0.25rem 0 0 -0.25rem;
		border-radius: var(--np-shape-corner-full);
	}

	/*
	 * A point at the centre rather than a box over the whole dial: rotating a 256dp box would push its
	 * corners some 47px past every edge and make the panel scroll, even though nothing is drawn there.
	 */
	.np-clock-dial-selector {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
	}

	.np-clock-dial-track {
		position: absolute;
		left: 0;
		top: 0;
		height: 0.125rem;
		width: var(--_r);
		transform-origin: 0 50%;
		translate: 0 -0.0625rem;
	}

	.np-clock-dial-handle {
		position: absolute;
		left: 0;
		top: 0;
		width: var(--_handle);
		height: var(--_handle);
		margin: calc(var(--_handle) / -2) 0 0 calc(var(--_handle) / -2);
		border-radius: var(--np-shape-corner-full);
		translate: var(--_r) 0;
	}

	.np-clock-dial-option {
		font: inherit;
		position: absolute;
		left: 50%;
		top: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: var(--_handle);
		height: var(--_handle);
		margin: calc(var(--_handle) / -2) 0 0 calc(var(--_handle) / -2);
		padding: 0;
		border: 0;
		border-radius: var(--np-shape-corner-full);
		background: none;
		translate: var(--_x) var(--_y);
		font-size: 1rem;
		line-height: 1.5rem;
		font-variant-numeric: tabular-nums;
		color: var(--np-time-picker-clock-dial-label-color, var(--np-color-on-surface));
		/* The dial itself reads every pointer position, so the numbers only exist for the keyboard. */
		pointer-events: none;
	}

	.np-clock-dial-option.np-unlabelled {
		width: 1.5rem;
		height: 1.5rem;
		margin: -0.75rem 0 0 -0.75rem;
	}

	.np-clock-dial-option.selected {
		color: var(--np-time-picker-clock-dial-selected-label-color, var(--np-color-on-primary));
	}

	.np-clock-dial-option[aria-disabled='true'] {
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-clock-dial-option:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}

	.np-clock-dial-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-clock-dial-selector {
			transition: rotate var(--np-motion-expressive-default-spatial);
		}

		.np-clock-dial-track {
			transition: width var(--np-motion-expressive-default-spatial);
		}

		.np-clock-dial-handle {
			transition: translate var(--np-motion-expressive-default-spatial);
		}

		.np-clock-dial-option {
			transition: color var(--np-motion-expressive-fast-effects);
		}
	}

	/* While a finger is down the handle has to follow it exactly, so nothing may lag behind. */
	.np-clock-dial.np-tracking .np-clock-dial-selector,
	.np-clock-dial.np-tracking .np-clock-dial-track,
	.np-clock-dial.np-tracking .np-clock-dial-handle {
		transition: none;
	}

	@media (forced-colors: active) {
		.np-clock-dial {
			border: 1px solid CanvasText;
		}

		.np-clock-dial-center,
		.np-clock-dial-handle,
		.np-clock-dial-track {
			background-color: Highlight;
		}

		.np-clock-dial-option.selected {
			color: HighlightText;
		}

		.np-clock-dial-option[aria-disabled='true'] {
			color: GrayText;
		}
	}
</style>
