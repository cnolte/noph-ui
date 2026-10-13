import type { DatePickerShortcutLabels } from './types.ts'

/** The keys a calendar takes, shown in the tooltips of the controls they stand for. */
export const DEFAULT_SHORTCUT_LABELS: DatePickerShortcutLabels = {
	previousMonth: 'Page up',
	nextMonth: 'Page down',
	previousYear: 'Shift+Page up',
	nextYear: 'Shift+Page down',
	monthList: 'Shift+M',
	yearList: 'Shift+Y',
}

/** A control's tooltip: what it does, then its key, as in "Previous year (Shift+Page up)". */
export const withShortcut = (label: string, keys: string) => (keys ? `${label} (${keys})` : label)

/**
 * The picker key an event presses. The picker listens on the whole of itself, so the keys work
 * wherever focus is in it. A text field takes them as typing, and the days take Page up and Page
 * down first, as they move focus.
 */
export const pickerShortcut = (
	event: KeyboardEvent,
): keyof DatePickerShortcutLabels | undefined => {
	if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey) return undefined
	if (event.target instanceof Element && event.target.closest('input, textarea, [contenteditable]'))
		return undefined
	if (event.key === 'PageUp') return event.shiftKey ? 'previousYear' : 'previousMonth'
	if (event.key === 'PageDown') return event.shiftKey ? 'nextYear' : 'nextMonth'
	if (!event.shiftKey) return undefined
	// A layout without Latin letters, such as Cyrillic, has M and Y where QWERTY has them. Only a
	// letter falls back to its key position, so a symbol on that key, like `?` on AZERTY, is typing.
	if (!/^\p{L}$/u.test(event.key)) return undefined
	const letter = /^[a-z]$/i.test(event.key)
		? event.key.toLowerCase()
		: event.code.slice(3).toLowerCase()
	if (letter === 'm') return 'monthList'
	if (letter === 'y') return 'yearList'
	return undefined
}
