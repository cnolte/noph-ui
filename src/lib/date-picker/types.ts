import type { Issue } from '#lib/shared/types.js'
import type { Snippet } from 'svelte'
import type { DockedFieldProps } from '#lib/internal/fieldTypes.js'
import type { TextFieldElement } from '#lib/text-field/types.js'
import type { HTMLAttributes } from 'svelte/elements'

export type ISODate = string

export type ISODateTime = string

/** A modal picker's view: the calendar, or text fields to type into. */
export type DatePickerMode = 'calendar' | 'input'

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

/** The keys of a calendar's shortcuts, as its tooltips name them. */
export interface DatePickerShortcutLabels {
	previousMonth: string
	nextMonth: string
	previousYear: string
	nextYear: string
	monthList: string
	yearList: string
}

interface MonthStepperLabelProps {
	nextMonthLabel?: string
	previousMonthLabel?: string
	/** The keys named in the tooltips, in English by default. An empty one leaves its key out. */
	shortcutLabels?: Partial<DatePickerShortcutLabels>
}

interface DockedDateFieldProps extends DockedFieldProps {
	displayMonth?: ISODate
}

export interface DockedDatePickerProps
	extends
		Omit<HTMLAttributes<TextFieldElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps,
		MonthStepperLabelProps,
		DockedDateFieldProps {
	value?: ISODate | number | null
	defaultValue?: ISODate | number | null
	type?: 'date'
	nextYearLabel?: string
	previousYearLabel?: string
	selectMonthLabel?: string
	selectYearLabel?: string
	openCalendarLabel?: string
	invalidDateMessage?: string
	onchange?: (value: ISODate | undefined) => void
}

export interface DockedDateTimePickerProps
	extends
		Omit<HTMLAttributes<TextFieldElement>, 'onchange'>,
		DatePickerLocaleProps,
		Omit<DatePickerRangeProps, 'min' | 'max'>,
		DatePickerCommonLabelProps,
		MonthStepperLabelProps,
		DockedDateFieldProps {
	value?: ISODateTime | number | null
	defaultValue?: ISODateTime | number | null
	min?: ISODate | ISODateTime
	max?: ISODate | ISODateTime
	type?: 'datetime-local'
	minuteStep?: number
	hour12?: boolean
	defaultTime?: string
	nextYearLabel?: string
	previousYearLabel?: string
	selectMonthLabel?: string
	selectYearLabel?: string
	openCalendarLabel?: string
	invalidDateMessage?: string
	hourLabel?: string
	minuteLabel?: string
	dayPeriodLabel?: string
	onchange?: (value: ISODateTime | undefined) => void
}

export interface TimeOption {
	value: number
	label: string
	disabled?: boolean
}

export interface DatePickerDialogProps
	extends
		Omit<HTMLAttributes<HTMLDialogElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps,
		MonthStepperLabelProps {
	value?: ISODate | null
	displayMonth?: ISODate
	open?: boolean
	element?: HTMLDialogElement
	name?: string
	form?: string
	title?: string
	headline?: string
	/** The view it opens in. Bindable, so it holds the view a person switched to. */
	mode?: DatePickerMode
	modeToggle?: boolean
	label?: string
	supportingText?: string
	issues?: Issue[]
	selectYearLabel?: string
	calendarModeLabel?: string
	inputModeLabel?: string
	onchange?: (value: ISODate | undefined) => void
	onconfirm?: (value: ISODate | undefined) => void
	oncancel?: () => void
}

export interface DateRangePickerProps
	extends
		Omit<HTMLAttributes<HTMLDialogElement>, 'onchange'>,
		DatePickerLocaleProps,
		DatePickerRangeProps,
		DatePickerCommonLabelProps {
	value?: DateRange
	open?: boolean
	element?: HTMLDialogElement
	title?: string
	headline?: string
	name?: string
	endName?: string
	form?: string
	startLabel?: string
	endLabel?: string
	/** The view it opens in. Bindable, so it holds the view a person switched to. */
	mode?: DatePickerMode
	modeToggle?: boolean
	calendarModeLabel?: string
	inputModeLabel?: string
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
	/** Enter on a day: the picker saves it and closes. Without it, Enter picks the day as a click does. */
	onconfirm?: (date: Date) => void
	onfocusday?: (date: Date) => void
	onmonthstep?: (delta: number) => void
	monthSubhead?: Snippet<[string]>
}
