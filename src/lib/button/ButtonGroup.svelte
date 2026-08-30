<script lang="ts">
	import { reducedMotion } from '#lib/media.js'
	import { onMount } from 'svelte'
	import { expandedWidths, parseMotion, resolveItem } from './buttonGroup.ts'
	import type { ButtonGroupProps } from './types.ts'

	let {
		variant = 'standard',
		expandedRatio = 0.15,
		compressionLimit = 24,
		element = $bindable(),
		children,
		...attributes
	}: ButtonGroupProps = $props()

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
					.filter((item) => !item.hasAttribute('popover'))
					.map(resolveItem)
			: []

	const motion = () =>
		element
			? parseMotion(
					getComputedStyle(element).getPropertyValue('--np-motion-expressive-fast-spatial'),
				)
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
</div>

<style>
	.np-button-group {
		display: flex;
		align-items: flex-start;
		gap: var(--np-button-group-space, 0.75rem);
		isolation: isolate;
	}
	.connected {
		gap: var(--np-button-group-space, 0.125rem);
	}

	.np-button-group > :global(:focus-visible) {
		z-index: 1;
	}
	.moving {
		--_button-label-overflow: visible;
		--_button-label-text-overflow: clip;
	}

	.connected > :global(:not([popover]):has(~ :not([popover]))) {
		border-start-end-radius: var(--np-button-group-inner-corner, var(--np-shape-corner-small));
		border-end-end-radius: var(--np-button-group-inner-corner, var(--np-shape-corner-small));
	}
	.connected > :global(:not([popover]) ~ :not([popover])) {
		border-start-start-radius: var(--np-button-group-inner-corner, var(--np-shape-corner-small));
		border-end-start-radius: var(--np-button-group-inner-corner, var(--np-shape-corner-small));
	}

	@media (prefers-reduced-motion: no-preference) {
		.connected > :global(:not([popover]):has(~ :not([popover])):is(:active, .pressed)) {
			border-start-end-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
			border-end-end-radius: var(
				--np-button-group-pressed-inner-corner,
				var(--np-shape-corner-extra-small)
			);
		}
		.connected > :global(:not([popover]) ~ :not([popover]):is(:active, .pressed)) {
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

	.connected > :global(:not([popover]).selected) {
		border-radius: var(--_round-radius, var(--np-shape-corner-full));
	}
</style>
