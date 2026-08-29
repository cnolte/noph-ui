import { afterExit } from '#lib/animation.js'

export const exitVisibility = () => {
	let visible = $state(false)
	let cancelExit: (() => void) | undefined

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
