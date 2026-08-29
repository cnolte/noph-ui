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
