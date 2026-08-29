import { afterExit } from '#lib/animation.js'

/**
 * `visible` for a dialog that fades itself out, so it stays on screen after `open` has flipped to
 * `false`. Content tied to `open` would leave the fading dialog empty a frame before it starts to
 * leave, so this holds `visible` true until the exit animation has actually finished.
 */
export const exitVisibility = () => {
	let visible = $state(false)
	let cancelExit: (() => void) | undefined

	// A dialog torn down mid fade has nothing left to reveal, and running a stale `onDone` against a
	// parent that has already dropped its state is worse than not running it at all.
	$effect(() => () => cancelExit?.())

	return {
		get visible() {
			return visible
		},
		show: () => {
			cancelExit?.()
			cancelExit = undefined
			visible = true
		},
		scheduleExit: (element: Element | undefined, onDone?: () => void) => {
			cancelExit = afterExit(element, () => {
				visible = false
				onDone?.()
				cancelExit = undefined
			})
		},
	}
}
