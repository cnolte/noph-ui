import { afterExit } from '#lib/animation.js'

export const exitVisibility = () => {
	let visible = $state(false)
	let pending: { cancel: () => void; onDone?: () => void } | undefined

	$effect(() => () => pending?.cancel())

	return {
		get visible() {
			return visible
		},
		show: () => {
			// Opened again while the last close still animates: its cleanup runs now, so the new
			// opening starts from the state a finished close leaves.
			const unfinished = pending
			pending = undefined
			unfinished?.cancel()
			unfinished?.onDone?.()
			visible = true
		},
		scheduleExit: (element: Element | undefined, onDone?: () => void) => {
			const exit: NonNullable<typeof pending> = { cancel: () => {}, onDone }
			pending = exit
			exit.cancel = afterExit(element, () => {
				if (pending === exit) pending = undefined
				visible = false
				onDone?.()
			})
		},
	}
}
