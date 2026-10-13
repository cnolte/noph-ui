import type { Attachment } from 'svelte/attachments'

export const afterTwoFrames = (fn: () => void) => {
	let inner = 0
	const outer = requestAnimationFrame(() => {
		inner = requestAnimationFrame(fn)
	})
	return () => {
		cancelAnimationFrame(outer)
		cancelAnimationFrame(inner)
	}
}

export const afterExit = (
	element: Element | undefined,
	fn: () => void,
	{ subtree = false }: { subtree?: boolean } = {},
) => {
	if (!element) {
		fn()
		return () => {}
	}
	let cancelled = false
	const finish = () => {
		if (!cancelled) fn()
	}
	const cancelFrames = afterTwoFrames(() => {
		const animations = element
			.getAnimations({ subtree })
			.filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
		if (animations.length === 0) {
			finish()
			return
		}
		Promise.allSettled(animations.map(({ finished }) => finished)).then(finish)
	})
	return () => {
		cancelled = true
		cancelFrames()
	}
}

export const parseMotion = (token: string): { duration: number; easing: string } => {
	const [time, ...rest] = token.trim().split(/\s+/)
	const value = Number.parseFloat(time)
	const easing = rest.join(' ')
	return {
		duration: Number.isNaN(value) ? 0 : time.endsWith('ms') ? value : value * 1000,
		easing: easing || 'linear',
	}
}

export const motionOf = (element: Element, token: string) =>
	parseMotion(getComputedStyle(element).getPropertyValue(token))

export const exitAnimation: Attachment<HTMLElement> = (element) => {
	if (CSS.supports('overlay: auto')) return
	let cancel = () => {}
	const done = () => {
		cancel()
		delete element.dataset.npExiting
	}
	const onBeforeToggle = (event: Event) => {
		done()
		if ((event as ToggleEvent).newState !== 'closed') return
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
		element.dataset.npExiting = ''
		cancel = afterExit(element, done, { subtree: true })
	}
	element.addEventListener('beforetoggle', onBeforeToggle)
	return () => {
		element.removeEventListener('beforetoggle', onBeforeToggle)
		done()
	}
}

export const morphSize = (element: HTMLElement | undefined, apply: () => void, token: string) => {
	if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) {
		apply()
		return
	}
	const from = element.getBoundingClientRect()
	element.getAnimations().forEach((animation) => animation.cancel())
	apply()
	const to = element.getBoundingClientRect()
	const frame = (rect: DOMRect) => ({
		...(from.width !== to.width && { width: `${rect.width}px` }),
		...(from.height !== to.height && { height: `${rect.height}px` }),
	})
	if (from.width === to.width && from.height === to.height) return
	element.style.overflow = 'hidden'
	element.animate([frame(from), frame(to)], motionOf(element, token)).finished.then(
		() => element.style.removeProperty('overflow'),
		() => {},
	)
}
