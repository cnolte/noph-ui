import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements'

export type ISODate = string

export interface DateRange {
	start?: ISODate
	end?: ISODate
}

interface DatePickerLocaleProps {
	locale?: string
	firstDayOfWeek?: number
}

interface DatePickerRangeProps {
	min?: ISODate
	max?: ISODate
	yearRange?: [number, number]
	isDateEnabled?: (date: Date) => boolean
	adjacentMonthDays?: boolean
}

interface DatePickerCommonLabelProps {
	cancelLabel?: string
	confirmLabel?: string
	selectedDateLabel?: string
}

interface MonthStepperLabelProps {
	nextMonthLabel?: string
	previousMonthLabel?: string
}

export interface DockedDatePickerProps
	extends
		Omit<HTMLAttributes<HTMLDivElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps,
		MonthStepperLabelProps {
	value?: ISODate | null
	displayMonth?: ISODate
	open?: boolean
	element?: HTMLDivElement
	name?: string
	form?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	variant?: 'outlined' | 'filled'
	issues?: { message: string }[]
	noAsterisk?: boolean
	autocomplete?: HTMLInputAttributes['autocomplete']
	label?: string
	supportingText?: string
	nextYearLabel?: string
	previousYearLabel?: string
	selectMonthLabel?: string
	selectYearLabel?: string
	openCalendarLabel?: string
	invalidDateMessage?: string
	onchange?: (value: ISODate | undefined) => void
}

export interface DatePickerDialogProps
	extends
		Omit<HTMLAttributes<HTMLDivElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps,
		MonthStepperLabelProps {
	value?: ISODate | null
	displayMonth?: ISODate
	open?: boolean
	element?: HTMLDivElement
	name?: string
	form?: string
	title?: string
	headline?: string
	modeToggle?: boolean
	label?: string
	supportingText?: string
	selectYearLabel?: string
	calendarModeLabel?: string
	inputModeLabel?: string
	onchange?: (value: ISODate | undefined) => void
	onconfirm?: (value: ISODate | undefined) => void
	oncancel?: () => void
}

export interface DateRangePickerProps
	extends
		Omit<HTMLAttributes<HTMLDivElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps {
	value?: DateRange
	open?: boolean
	element?: HTMLDivElement
	title?: string
	startLabel?: string
	endLabel?: string
	onchange?: (value: DateRange) => void
	onconfirm?: (value: DateRange) => void
	oncancel?: () => void
}

export interface CalendarProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onchange' | 'onselect'
> {
	month: Date
	selected?: Date
	rangeStart?: Date
	rangeEnd?: Date
	min?: Date
	max?: Date
	locale?: string
	firstDayOfWeek: number
	isDateEnabled?: (date: Date) => boolean
	weekdays?: boolean
	adjacentMonthDays?: boolean
	dynamicRows?: boolean
	todayDate?: Date
	focusedDate?: Date
	selectedLabel?: string
	tabStopDate?: Date
	focusRoot?: HTMLElement
	onselect?: (date: Date) => void
	onfocusday?: (date: Date) => void
	onmonthstep?: (delta: number) => void
	monthSubhead?: Snippet<[string]>
}
