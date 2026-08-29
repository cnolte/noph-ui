import { onMount } from 'svelte'

export const PRESS_DURATION = 100

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
