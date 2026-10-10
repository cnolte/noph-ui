<script lang="ts">
	import { formReset } from '#lib/form-reset.js'
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { reducedMotion } from '#lib/media.js'
	import { onMount, untrack } from 'svelte'
	import { motionOf } from '#lib/animation.js'
	import { expandedWidths, resolveItem } from './buttonGroup.js'
	import { setButtonGroupContext } from './groupContext.js'
	import type { ButtonGroupProps } from './types.js'

	let {
		variant = 'standard',
		size,
		shape,
		selection,
		value = $bindable(),
		required = false,
		name,
		form,
		arrowKeys = true,
		expandedRatio = 0.15,
		compressionLimit = 24,
		element = $bindable(),
		children,
		...attributes
	}: ButtonGroupProps = $props()

	const selectedValues = $derived(
		value == null ? [] : Array.isArray(value) ? value.map(String) : [String(value)],
	)
	setButtonGroupContext({
		get selection() {
			return selection
		},
		get size() {
			return size
		},
		get shape() {
			return shape
		},
		isSelected: (item) => selectedValues.includes(item),
		toggle: (item) => {
			const on = selectedValues.includes(item)
			if (on && required && selectedValues.length === 1) return
			if (selection === 'single') value = on ? null : item
			else value = on ? selectedValues.filter((v) => v !== item) : [...selectedValues, item]
		},
	})

	// A form reset brings back the selection the group started with.
	const initialValue = untrack(() => (Array.isArray(value) ? [...value] : value))
	const restore = () => (value = Array.isArray(initialValue) ? [...initialValue] : initialValue)

	// The buttons share one tab stop, Tab enters the group and the arrow keys move inside it.
	const ITEMS = 'button, a[href]'
	const roving = rovingTabindex(ITEMS)
	const arrows = arrowKeyNav(ITEMS, 'horizontal')

	const settleRatio = 0.75

	type Timing = { duration: number; easing: string }

	let animations: Animation[] = []
	let pressed: {
		items: HTMLElement[]
		widths: number[]
		timing: Timing
		growing?: Animation
	} | null = null
	let releaseFrame: number | undefined
	let moving = $state(false)

	const items = () =>
		element
			? (Array.from(element.children) as HTMLElement[])
					.filter(
						(item) => !item.hasAttribute('popover') && !item.matches('.np-button-group-input'),
					)
					.map(resolveItem)
			: []

	const motion = () =>
		element
			? motionOf(element, '--np-motion-expressive-fast-spatial')
			: { duration: 0, easing: 'linear' }

	const animate = (
		targets: HTMLElement[],
		from: number[],
		to: number[],
		keep: boolean,
		timing: Timing,
	) =>
		targets.map((item, index) => {
			if (keep) {
				item.style.width = `${to[index]}px`
			} else {
				item.style.removeProperty('width')
			}
			if (from[index] === to[index]) return undefined
			const animation = item.animate(
				[{ width: `${from[index]}px` }, { width: `${to[index]}px` }],
				timing,
			)
			animations.push(animation)
			return animation
		})

	const stop = () => {
		if (releaseFrame !== undefined) cancelAnimationFrame(releaseFrame)
		releaseFrame = undefined
		for (const animation of animations) animation.cancel()
		animations = []
		moving = false
		if (!pressed) return
		for (const item of pressed.items) item.style.removeProperty('width')
		pressed = null
	}

	const press = (target: EventTarget | null) => {
		if (variant === 'connected') return
		if (!element || expandedRatio <= 0 || reducedMotion.current) return
		stop()
		const all = items()
		if (all.length < 2) return
		const index = all.findIndex((item) => item.contains(target as Node))
		if (index < 0) return
		const widths = all.map((item) => item.getBoundingClientRect().width)
		const targets = expandedWidths(widths, index, expandedRatio, compressionLimit)
		const timing = motion()
		const growing = animate(all, widths, targets, true, timing)[index]
		pressed = { items: all, widths, timing, growing }
		moving = true
	}

	const settled = () => {
		const progress = pressed?.growing?.effect?.getComputedTiming().progress
		return progress == null || progress >= settleRatio
	}

	const release = () => {
		if (!pressed || releaseFrame !== undefined) return
		const back = () => {
			if (!pressed) {
				releaseFrame = undefined
				return
			}
			if (!settled()) {
				releaseFrame = requestAnimationFrame(back)
				return
			}
			const { items: targets, widths, timing } = pressed
			const from = targets.map((item) => item.getBoundingClientRect().width)
			for (const animation of animations) animation.cancel()
			animations = []
			pressed = null
			releaseFrame = undefined
			animate(targets, from, widths, false, timing)
			const returning = animations
			Promise.allSettled(returning.map((animation) => animation.finished)).then(() => {
				if (animations !== returning) return
				animations = []
				moving = false
			})
		}
		releaseFrame = requestAnimationFrame(back)
	}

	onMount(() => stop)
</script>

<div
	{...attributes}
	role={attributes.role ?? 'group'}
	bind:this={element}
	{@attach (node) => (arrowKeys ? roving(node) : undefined)}
	class={['np-button-group', variant, moving && 'moving', attributes.class]}
	onpointerdown={(event) => {
		press(event.target)
		attributes.onpointerdown?.(event)
	}}
	onpointerup={(event) => {
		release()
		attributes.onpointerup?.(event)
	}}
	onpointercancel={(event) => {
		release()
		attributes.onpointercancel?.(event)
	}}
	onpointerleave={(event) => {
		release()
		attributes.onpointerleave?.(event)
	}}
	onkeydown={(event) => {
		if (!event.repeat && (event.key === ' ' || event.key === 'Enter')) {
			press(event.target)
		}
		attributes.onkeydown?.(event)
		if (arrowKeys && !event.defaultPrevented) arrows(event)
	}}
	onkeyup={(event) => {
		release()
		attributes.onkeyup?.(event)
	}}
	onfocusout={(event) => {
		if (!element?.contains(event.relatedTarget as Node)) release()
		attributes.onfocusout?.(event)
	}}
>
	{@render children?.()}
	{#if selection && name}
		<!-- Takes part in the form like a radio or checkbox group: submit, reset and required. -->
		<select
			class="np-button-group-input"
			{name}
			{form}
			{required}
			multiple={selection === 'multiple'}
			tabindex="-1"
			aria-hidden="true"
			{@attach formReset(restore)}
		>
			{#each selectedValues as selected (selected)}
				<option value={selected} selected>{selected}</option>
			{/each}
		</select>
	{/if}
</div>

<style>
	/* A standard group hugs its buttons. The space between them grows as they shrink, so each
	   keeps a 48px target: 18px beside extra small buttons, 12px beside small ones, 8px above. */
	.np-button-group {
		position: relative;
		display: inline-flex;
		align-items: flex-start;
		gap: var(--np-button-group-space, var(--_space, 0.5rem));
		isolation: isolate;
	}
	.np-button-group:has(> :global(:is(.np-button, .np-icon-button).s)) {
		--_space: 0.75rem;
	}
	.np-button-group:has(> :global(:is(.np-button, .np-icon-button).xs)) {
		--_space: 1.125rem;
	}
	/* A connected group spans its container and widens its buttons to fill it. */
	.connected {
		display: flex;
		gap: var(--np-button-group-space, 0.125rem);
	}
	.connected > :global(:not([popover], .np-button-group-input)) {
		flex: 1 1 auto;
	}
	.connected > :global(.np-icon-button:is(.xs, .s)) {
		min-width: 3rem;
	}
	/* The corners where two buttons meet, and every corner of a square group. */
	.connected > :global(.xs) {
		--_inner-corner: 0.25rem;
	}
	.connected > :global(:is(.s, .m)) {
		--_inner-corner: 0.5rem;
	}
	.connected > :global(.l) {
		--_inner-corner: 1rem;
	}
	.connected > :global(.xl) {
		--_inner-corner: 1.25rem;
	}
	.connected > :global(.square:not(.selected)) {
		border-radius: var(--np-button-group-inner-corner, var(--_inner-corner));
	}

	.np-button-group-input {
		position: absolute;
		inset-inline-start: 0;
		bottom: 0;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.np-button-group > :global(:focus-visible) {
		z-index: 1;
	}
	/* While widths animate, a button may be narrower than its label for a moment. */
	.moving {
		--_button-min-width: 0;
		--_button-label-overflow: hidden;
	}

	.connected
		> :global(
			:not([popover], .np-button-group-input):has(~ :not([popover], .np-button-group-input))
		) {
		border-start-end-radius: var(--np-button-group-inner-corner, var(--_inner-corner));
		border-end-end-radius: var(--np-button-group-inner-corner, var(--_inner-corner));
	}
	.connected
		> :global(:not([popover], .np-button-group-input) ~ :not([popover], .np-button-group-input)) {
		border-start-start-radius: var(--np-button-group-inner-corner, var(--_inner-corner));
		border-end-start-radius: var(--np-button-group-inner-corner, var(--_inner-corner));
	}

	@media (prefers-reduced-motion: no-preference) {
		.connected
			> :global(
				:not([popover], .np-button-group-input):has(~ :not([popover], .np-button-group-input)):is(
						:active,
						.pressed
					)
			) {
			border-start-end-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
			border-end-end-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
		}
		.connected
			> :global(
				:not([popover], .np-button-group-input)
					~ :not([popover], .np-button-group-input):is(:active, .pressed)
			) {
			border-start-start-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
			border-end-start-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
		}
	}

	.connected > :global(:not([popover], .np-button-group-input).selected) {
		border-radius: var(--_round-radius, var(--np-shape-corner-full));
	}
</style>
