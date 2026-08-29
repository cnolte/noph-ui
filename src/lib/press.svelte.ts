import { onMount } from 'svelte'

export const PRESS_DURATION = 100

/**
 * The corner morph a Button, an IconButton or a FAB plays when it is activated. `:active` covers
 * the press itself, but it drops the moment the pointer lifts, so a quick click would show only a
 * frame or two of the morph. The `pressed` this returns is held for as long as the round trip
 * takes to be seen, and is set from `click`, which arrives for the keyboard as well as the pointer.
 */
export const pressMorph = () => {
	let pressed = $state(false)
	let timeout: ReturnType<typeof setTimeout>

	const cancel = () => {
		clearTimeout(timeout)
		pressed = false
	}

	onMount(() => cancel)

	return {
		get pressed() {
			return pressed
		},
		press: () => {
			clearTimeout(timeout)
			pressed = true
			timeout = setTimeout(() => (pressed = false), PRESS_DURATION)
		},
		/**
		 * A change of `shape` supersedes the morph. Both describe the same corner, and the pressed
		 * radius is the shape the element is not, so holding the press across a shape change cancels
		 * the change out and stalls it until the timer runs down. FabMenu's trigger does exactly
		 * that, flipping to `square` on the click that opens the menu; dropping the press there
		 * leaves that click one continuous morph.
		 */
		supersededBy: (shape: () => unknown) => {
			let previous: unknown
			$effect(() => {
				const next = shape()
				const was = previous
				previous = next
				if (was === undefined || was === next) return
				cancel()
			})
		},
	}
}
