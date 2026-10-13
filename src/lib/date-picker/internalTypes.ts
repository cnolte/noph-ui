import type { DockedFieldProps } from '#lib/internal/fieldTypes.js'
import type { TextFieldElement } from '#lib/text-field/types.js'
import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { DatePickerShortcutLabels, TimeOption } from './types.ts'

export interface TimeColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
	options: TimeOption[]
	value?: number
	onselect?: (value: number) => void
}

export interface DockedPickerFieldProps
	extends Omit<HTMLAttributes<TextFieldElement>, 'onchange'>, DockedFieldProps {
	/** Names its classes and tokens, such as np-docked-date-picker. */
	kind: 'date-picker' | 'date-time-picker' | 'time-picker'
	value?: string | number | null
	/** The value the field holds, as the picker writes it. */
	current: string | undefined
	/** The value a form reset brings back. */
	resetValue: string | undefined
	menuElement?: HTMLDivElement
	/** The format to type in, shown as supporting text. */
	pattern: string
	openLabel: string
	invalidMessage: string
	/** The value the field holds, as text in the field. */
	format: () => string
	/** Typed text as a value the picker takes, or undefined. */
	parse: (text: string) => string | undefined
	icon: Snippet
	onopen?: () => void
	/** Once the menu has closed and finished its animation. */
	onclosed?: () => void
	onrestore?: () => void
	/** A usable value was typed. */
	ontyped?: (value: string) => void
	/** A key pressed anywhere in the menu. */
	onmenukeydown?: (event: KeyboardEvent) => void
	onchange?: (value: string | undefined) => void
	children: Snippet
}

export interface MonthPanelProps {
	/** The month on show, its first day. */
	month: Date
	selected?: Date
	min?: Date
	max?: Date
	locale?: string
	firstDayOfWeek: number
	yearRange: [number, number]
	isDateEnabled?: (date: Date) => boolean
	adjacentMonthDays?: boolean
	today: Date
	previousMonthLabel: string
	nextMonthLabel: string
	previousYearLabel: string
	nextYearLabel: string
	selectMonthLabel: string
	selectYearLabel: string
	selectedDateLabel: string
	shortcutLabels?: Partial<DatePickerShortcutLabels>
	/** Shows another month, given by any day in it. */
	onmonth: (date: Date) => void
	onselect: (date: Date) => void
	/** Enter on a day, to save it and close. */
	onconfirm?: (date: Date) => void
}
