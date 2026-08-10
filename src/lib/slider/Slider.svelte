<script lang="ts">
	import type { SliderProps } from './types.ts'

	let {
		value = $bindable(0),
		endValue = $bindable(),
		min = 0,
		max = 100,
		step = 0,
		size = 'xs',
		orientation = 'horizontal',
		range = false,
		centered = false,
		labeled = false,
		ticks = false,
		disabled = false,
		format,
		icon,
		endInputAttributes,
		style,
		element = $bindable(),
		inputElement = $bindable(),
		endInputElement = $bindable(),
		...attributes
	}: SliderProps = $props()

	const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

	let span = $derived(max - min || 1)

	const quantize = (v: number) => {
		const c = clamp(v, min, max)
		if (!(step > 0)) return c
		return clamp(Number((min + Math.round((c - min) / step) * step).toFixed(10)), min, max)
	}

	let lo = $derived(clamp(value ?? min, min, max))
	let hi = $derived(clamp(endValue ?? max, min, max))
	let f1 = $derived(((range ? Math.min(lo, hi) : lo) - min) / span)
	let f2 = $derived(((range ? Math.max(lo, hi) : lo) - min) / span)

	const positionOf = (f: number) =>
		step > 0 && f > 0 && f < 1
			? `calc(var(--_corner) + ${f} * (100% - 2 * var(--_corner)))`
			: `${f * 100}%`

	let p1 = $derived(positionOf(f1))
	let p2 = $derived(positionOf(f2))

	let edges = $derived.by(() => {
		const gap = 'var(--_gap)'
		if (range) {
			return {
				a1: `calc(${p1} + ${gap})`,
				a2: `calc(${p2} - ${gap})`,
				i1: `calc(${p1} - ${gap})`,
				i2: `calc(${p2} + ${gap})`,
			}
		}
		if (centered) {
			return {
				a1: `min(calc(${p1} + ${gap}), 50%)`,
				a2: `max(calc(${p1} - ${gap}), 50%)`,
				i1: `calc(min(${p1}, 50%) - ${gap})`,
				i2: `calc(max(${p1}, 50%) + ${gap})`,
			}
		}
		return { a1: '0%', a2: `calc(${p1} - ${gap})`, i1: '0%', i2: `calc(${p1} + ${gap})` }
	})

	let hostStyle = $derived(
		`--_p1:${p1};--_p2:${p2};--_a1:${edges.a1};--_a2:${edges.a2};--_i1:${edges.i1};--_i2:${edges.i2};` +
			(style ?? ''),
	)

	let hasStartStop = $derived(centered || range)

	let tickList = $derived.by(() => {
		if (!ticks || !(step > 0)) return []
		const count = Math.floor(span / step)
		if (count < 1 || count > 250) return []
		return Array.from({ length: count + 1 }, (_, i) => Math.min(1, (i * step) / span))
	})

	let visibleTicks = $derived(
		tickList
			.map((t, i) => ({ t, i }))
			.filter(({ t, i }) => {
				if (i === tickList.length - 1) return false
				if (hasStartStop && i === 0) return false
				if (Math.abs(t - f1) < 1e-9) return false
				if (range && Math.abs(t - f2) < 1e-9) return false
				return true
			}),
	)

	let activeFrom = $derived(centered ? Math.min(f1, 0.5) : range ? f1 : 0)
	let activeTo = $derived(centered ? Math.max(f1, 0.5) : f2)
	const isActive = (t: number) => t >= activeFrom && t <= activeTo

	let dragging = $state<'start' | 'end' | null>(null)
	let trackElement = $state<HTMLDivElement>()
	let pointerFocused = $state(false)

	const fractionFromEvent = (e: PointerEvent) => {
		if (!trackElement) return 0
		const r = trackElement.getBoundingClientRect()
		if (orientation === 'vertical') {
			return r.height ? (r.bottom - e.clientY) / r.height : 0
		}
		const rtl = getComputedStyle(trackElement).direction === 'rtl'
		const offset = rtl ? r.right - e.clientX : e.clientX - r.left
		return r.width ? offset / r.width : 0
	}

	const commit = (input: HTMLInputElement | undefined, v: number) => {
		if (!input) return
		const next = quantize(v)
		if (Number(input.value) === next) return
		input.value = String(next)
		input.dispatchEvent(new Event('input', { bubbles: true }))
	}

	const moveTo = (e: PointerEvent) => {
		if (!dragging) return
		const v = min + clamp(fractionFromEvent(e), 0, 1) * span
		if (dragging === 'start') {
			commit(inputElement, range ? Math.min(quantize(v), hi) : v)
		} else {
			commit(endInputElement, Math.max(quantize(v), lo))
		}
	}

	const onpointerdown = (e: PointerEvent) => {
		if (disabled || e.button !== 0) return
		const v = min + clamp(fractionFromEvent(e), 0, 1) * span
		dragging = !range
			? 'start'
			: lo === hi
				? v < lo
					? 'start'
					: 'end'
				: Math.abs(v - lo) <= Math.abs(v - hi)
					? 'start'
					: 'end'
		element?.setPointerCapture(e.pointerId)
		e.preventDefault()
		;(dragging === 'start' ? inputElement : endInputElement)?.focus()
		pointerFocused = true
		moveTo(e)
	}

	const endDrag = (e: PointerEvent) => {
		if (!dragging) return
		const input = dragging === 'start' ? inputElement : endInputElement
		dragging = null
		element?.releasePointerCapture(e.pointerId)
		input?.dispatchEvent(new Event('change', { bubbles: true }))
	}

	const labelFor = (v: number) => format?.(v) ?? String(v)
</script>

<div
	bind:this={element}
	style={hostStyle}
	class={[
		'np-slider',
		`np-size-${size}`,
		orientation === 'vertical' && 'np-vertical',
		range && 'np-range',
		centered && 'np-centered',
		labeled && 'np-labeled',
		disabled && 'np-disabled',
		dragging && 'np-dragging',
		pointerFocused && 'np-pointer-focused',
		attributes.class,
	]}
	role="presentation"
	{onpointerdown}
	onpointermove={moveTo}
	onpointerup={endDrag}
	onpointercancel={endDrag}
	onkeydown={() => (pointerFocused = false)}
	onfocusout={() => (pointerFocused = false)}
>
	<div class="np-slider-track" bind:this={trackElement}>
		{#if hasStartStop}
			<div class="np-slider-lane np-slider-inactive-start">
				<span class="np-slider-stop np-slider-stop-start"></span>
			</div>
		{/if}
		<div class="np-slider-lane np-slider-active">
			{#if icon}
				<span class="np-slider-icon">{@render icon()}</span>
			{/if}
		</div>
		<div class="np-slider-lane np-slider-inactive-end">
			<span class="np-slider-stop np-slider-stop-end"></span>
		</div>

		{#each visibleTicks as { t, i } (i)}
			<span class={['np-slider-tick', isActive(t) && 'np-on-active']} style="--_t:{t}"></span>
		{/each}

		<div class="np-slider-handle np-slider-handle-start">
			{#if labeled}
				<div class="np-slider-label-anchor">
					<div class="np-slider-label">{labelFor(range ? Math.min(lo, hi) : lo)}</div>
				</div>
			{/if}
		</div>
		{#if range}
			<div class="np-slider-handle np-slider-handle-end">
				{#if labeled}
					<div class="np-slider-label-anchor">
						<div class="np-slider-label">{labelFor(Math.max(lo, hi))}</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<input
		{...attributes}
		bind:this={inputElement}
		bind:value
		type="range"
		class="np-slider-input np-slider-input-start"
		{min}
		max={range ? Math.max(min, hi) : max}
		step={step > 0 ? step : 'any'}
		{disabled}
		aria-orientation={orientation}
		aria-valuetext={format ? labelFor(lo) : attributes['aria-valuetext']}
	/>
	{#if range}
		<input
			{...endInputAttributes}
			bind:this={endInputElement}
			bind:value={endValue}
			type="range"
			class="np-slider-input np-slider-input-end"
			min={Math.min(max, lo)}
			{max}
			step={step > 0 ? step : 'any'}
			{disabled}
			aria-orientation={orientation}
			aria-valuetext={format ? labelFor(hi) : endInputAttributes?.['aria-valuetext']}
		/>
	{/if}
</div>

<style>
	.np-slider {
		--_size-track-height: 1rem;
		--_size-handle-height: 2.75rem;
		--_size-corner: 0.5rem;
		--_size-icon-size: 1.5rem;

		--_track-height: var(--np-slider-track-height, var(--_size-track-height));
		--_handle-height: var(--np-slider-handle-height, var(--_size-handle-height));
		--_corner: var(--np-slider-track-shape, var(--_size-corner));
		--_icon-size: var(--np-slider-icon-size, var(--_size-icon-size));
		--_hw: var(--np-slider-handle-width, 0.25rem);
		--_inside: var(--np-slider-track-inside-shape, 0.125rem);
		--_stop: var(--np-slider-stop-indicator-size, 0.25rem);
		--_gap: calc(var(--_hw) / 2 + 0.375rem);

		position: relative;
		display: block;
		inline-size: 100%;
		block-size: var(--_handle-height);
		touch-action: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	}

	.np-slider.np-size-s {
		--_size-track-height: 1.5rem;
	}
	.np-slider.np-size-m {
		--_size-track-height: 2.5rem;
		--_size-corner: 0.75rem;
	}
	.np-slider.np-size-l {
		--_size-track-height: 3.5rem;
		--_size-handle-height: 4.25rem;
		--_size-corner: 1rem;
	}
	.np-slider.np-size-xl {
		--_size-track-height: 6rem;
		--_size-handle-height: 6.75rem;
		--_size-corner: 1.75rem;
		--_size-icon-size: 2rem;
	}

	.np-slider.np-vertical {
		writing-mode: vertical-lr;
		direction: rtl;
		inline-size: var(--np-slider-length, 12rem);
	}

	.np-slider.np-disabled {
		cursor: default;
	}

	.np-slider-track {
		position: absolute;
		inset-inline: calc(var(--_hw) / 2);
		inset-block: calc((var(--_handle-height) - var(--_track-height)) / 2);
	}

	.np-slider-lane {
		position: absolute;
		inset-block: 0;
		border-radius: var(--_inside);
		transition:
			inset-inline-start var(--np-motion-expressive-fast-effects),
			inset-inline-end var(--np-motion-expressive-fast-effects);
	}

	.np-dragging .np-slider-lane,
	.np-dragging .np-slider-handle {
		transition: none;
	}

	.np-slider-active {
		inset-inline-start: var(--_a1);
		inset-inline-end: calc(100% - var(--_a2));
		overflow: hidden;
		background: var(--np-slider-active-track-color, var(--np-color-primary));
	}

	.np-slider-inactive-start {
		inset-inline-start: 0;
		inset-inline-end: calc(100% - var(--_i1));
	}

	.np-slider-inactive-end {
		inset-inline-start: var(--_i2);
		inset-inline-end: 0;
	}

	.np-slider-inactive-start,
	.np-slider-inactive-end {
		background: var(--np-slider-inactive-track-color, var(--np-color-secondary-container));
		overflow: hidden;
	}

	.np-slider-inactive-start,
	.np-slider:not(.np-centered):not(.np-range) .np-slider-active {
		border-start-start-radius: var(--_corner);
		border-end-start-radius: var(--_corner);
	}

	.np-slider-inactive-end {
		border-start-end-radius: var(--_corner);
		border-end-end-radius: var(--_corner);
	}

	.np-slider-icon {
		position: absolute;
		inset-inline-start: var(--np-slider-icon-padding, 0.625rem);
		inset-block: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: var(--_icon-size);
		font-size: var(--_icon-size);
		color: var(--np-slider-icon-color, var(--np-color-on-primary));
		writing-mode: horizontal-tb;
	}

	.np-slider-icon :global(svg) {
		inline-size: var(--_icon-size);
		block-size: var(--_icon-size);
		fill: currentColor;
	}

	.np-slider-stop,
	.np-slider-tick {
		position: absolute;
		inline-size: var(--_stop);
		block-size: var(--_stop);
		inset-block-start: calc((var(--_track-height) - var(--_stop)) / 2);
		border-radius: var(--np-shape-corner-full);
		background: var(--np-slider-inactive-stop-color, var(--np-color-on-secondary-container));
		pointer-events: none;
	}

	.np-slider-stop-end {
		inset-inline-end: calc(var(--_corner) - var(--_stop) / 2);
	}

	.np-slider-stop-start {
		inset-inline-start: calc(var(--_corner) - var(--_stop) / 2);
	}

	.np-slider-tick {
		inset-inline-start: calc(
			var(--_corner) + var(--_t) * (100% - 2 * var(--_corner)) - var(--_stop) / 2
		);
	}

	.np-slider-tick.np-on-active {
		background: var(--np-slider-active-stop-color, var(--np-color-on-primary));
	}

	.np-slider-handle {
		position: absolute;
		inset-inline-start: calc(var(--_p) - var(--_hw) / 2);
		inset-block-start: calc((var(--_track-height) - var(--_handle-height)) / 2);
		inline-size: var(--_hw);
		block-size: var(--_handle-height);
		border-radius: var(--np-slider-handle-shape, var(--np-shape-corner-full));
		background: var(--np-slider-handle-color, var(--np-color-primary));
		transition:
			inset-inline-start var(--np-motion-expressive-fast-effects),
			inline-size var(--np-motion-expressive-fast-effects),
			block-size var(--np-motion-expressive-fast-effects);
	}

	.np-slider-handle-start {
		--_p: var(--_p1);
	}

	.np-slider-handle-end {
		--_p: var(--_p2);
	}

	.np-slider:not(.np-disabled, .np-pointer-focused):has(.np-slider-input-start:focus-visible)
		.np-slider-handle-start,
	.np-slider:not(.np-disabled, .np-pointer-focused):has(.np-slider-input-end:focus-visible)
		.np-slider-handle-end {
		inline-size: var(--np-slider-handle-width-focus, 0.125rem);
		block-size: calc(var(--_handle-height) - 0.375rem);
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 0.125rem;
	}

	.np-dragging .np-slider-handle {
		inline-size: var(--np-slider-handle-width-focus, 0.125rem);
	}

	.np-slider-label-anchor {
		position: absolute;
		inset-block-end: calc(100% + 0.375rem);
		inset-inline: 0;
		display: flex;
		justify-content: center;
		pointer-events: none;
	}

	.np-slider-label {
		flex: none;
		writing-mode: horizontal-tb;
		direction: ltr;
		min-inline-size: 2rem;
		box-sizing: border-box;
		padding: 0.375rem 0.625rem;
		border-radius: var(--np-shape-corner-full);
		background: var(--np-slider-label-container-color, var(--np-color-inverse-surface));
		color: var(--np-slider-label-text-color, var(--np-color-inverse-on-surface));
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		opacity: 0;
		transition: opacity var(--np-motion-expressive-fast-effects);
	}

	.np-slider.np-labeled:hover .np-slider-label,
	.np-slider.np-labeled.np-dragging .np-slider-label,
	.np-slider.np-labeled:has(.np-slider-input:focus-visible) .np-slider-label {
		opacity: 1;
	}

	.np-slider.np-disabled .np-slider-label {
		opacity: 0;
	}

	.np-slider-input {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		margin: 0;
		opacity: 0;
		pointer-events: none;
	}

	.np-slider.np-disabled .np-slider-active {
		background: color-mix(
			in srgb,
			var(--np-slider-disabled-active-track-color, var(--np-color-on-surface)) 38%,
			transparent
		);
	}

	.np-slider.np-disabled .np-slider-inactive-start,
	.np-slider.np-disabled .np-slider-inactive-end {
		background: color-mix(
			in srgb,
			var(--np-slider-disabled-inactive-track-color, var(--np-color-on-surface)) 12%,
			transparent
		);
	}

	.np-slider.np-disabled .np-slider-handle {
		background: color-mix(
			in srgb,
			var(--np-slider-disabled-handle-color, var(--np-color-on-surface)) 38%,
			transparent
		);
	}

	.np-slider.np-disabled .np-slider-stop,
	.np-slider.np-disabled .np-slider-tick {
		background: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-slider.np-disabled .np-slider-stop.np-on-active,
	.np-slider.np-disabled .np-slider-tick.np-on-active {
		background: var(--np-color-surface);
	}

	.np-slider.np-disabled .np-slider-icon {
		color: var(--np-color-surface);
	}

	@media (prefers-reduced-motion: reduce) {
		.np-slider-lane,
		.np-slider-handle,
		.np-slider-label {
			transition: none;
		}
	}

	@media (forced-colors: active) {
		.np-slider-active,
		.np-slider-handle {
			background: CanvasText;
		}
		.np-slider-inactive-start,
		.np-slider-inactive-end {
			outline: 1px solid CanvasText;
		}
		.np-slider.np-disabled .np-slider-active,
		.np-slider.np-disabled .np-slider-handle {
			background: GrayText;
		}
	}
</style>
