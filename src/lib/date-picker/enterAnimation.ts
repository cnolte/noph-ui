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
