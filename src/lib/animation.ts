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

/**
 * Calls `fn` once the element's animations have finished, two frames from now so that transitions
 * just started are counted. `subtree` includes those of its descendants. Endless animations, such
 * as a spinner's, are not waited for.
 */
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

/** Reads a motion token such as `--np-motion-standard-fast-spatial` off an element's styles. */
export const motionOf = (element: Element, token: string) =>
	parseMotion(getComputedStyle(element).getPropertyValue(token))

/**
 * Keeps a dialog or popover on screen while it animates out, in browsers that drop it from the top
 * layer the moment it closes because they cannot transition `overlay`, such as Safari. From the
 * start of closing until its exit animations end it carries `data-np-exiting`, and the rules in
 * `internal/exit.css` keep it shown meanwhile, over the page but not blocking it. `beforetoggle`
 * fires before every way of closing, from Escape and light dismiss to `close()`.
 */
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
