import type { Attachment } from 'svelte/attachments'
import type { TimeOption } from './types.ts'

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
