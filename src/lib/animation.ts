/**
 * Runs `fn` after two frames, so a class or attribute change written just before it has been through
 * one style recalculation. Returns a canceller.
 */
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
 * Runs `fn` once `element` has finished the transitions it is playing, so content gated on `open`
 * can stay mounted for as long as its container is still on screen. A container that animates its
 * exit is still painted after `open` has flipped to `false`, and content dropped on that flip empties
 * the container a frame before it starts to leave.
 *
 * The wait starts two frames in because a transition does not exist until the browser has
 * recalculated styles, so `getAnimations()` reads empty straight after the change that starts it.
 * An element with no exit animation therefore finishes on the second frame. Returns a canceller for
 * the container reopening mid exit.
 */
export const afterExit = (element: Element | undefined, fn: () => void) => {
	if (!element) {
		fn()
		return () => {}
	}
	let cancelled = false
	const finish = () => {
		if (!cancelled) fn()
	}
	const cancelFrames = afterTwoFrames(() => {
		const animations = element.getAnimations()
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
