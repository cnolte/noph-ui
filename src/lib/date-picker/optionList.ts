import type { Attachment } from 'svelte/attachments'
import type { TimeOption } from './types.ts'

/**
 * The option that carries the list's single tab stop: the selected one, or else the offered option
 * nearest to the value, so arriving with the keyboard lands next to where the value already is.
 */
export const tabStop = (options: TimeOption[], value: number | undefined) => {
	if (options.some((option) => option.value === value)) return value
	const offered = options.filter((option) => !option.disabled)
	const pool = offered.length ? offered : options
	if (!pool.length) return undefined
	if (value === undefined) return pool[0].value
	return pool.reduce((nearest, option) =>
		Math.abs(option.value - value) < Math.abs(nearest.value - value) ? option : nearest,
	).value
}

/**
 * Scrolls the selected option into view inside its own list, rather than through `scrollIntoView`,
 * which takes every scrollable ancestor with it and would move the page behind the picker.
 *
 * `centre` puts the option in the middle of the list every time it changes. Otherwise the list is
 * centred once, on the option it opens with, and afterwards the selection is only pulled to the
 * nearest edge when it has moved out of view, so stepping through options does not jump the list.
 */
export const revealSelected = (centre = false): Attachment<HTMLElement> => {
	let centred = false
	return (element) => {
		const list = element.parentElement
		if (!list) return
		const top = element.offsetTop
		const bottom = top + element.offsetHeight
		if (centre || !centred) {
			centred = true
			list.scrollTop = top - list.clientHeight / 2 + element.offsetHeight / 2
		} else if (top < list.scrollTop) {
			list.scrollTop = top
		} else if (bottom > list.scrollTop + list.clientHeight) {
			list.scrollTop = bottom - list.clientHeight
		}
	}
}
