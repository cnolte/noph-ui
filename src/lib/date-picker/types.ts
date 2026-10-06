import type { Issue } from '#lib/shared/types.js'
import type { Snippet } from 'svelte'
import type { DockedFieldProps } from '#lib/internal/fieldTypes.js'
import type { TextFieldElement } from '#lib/text-field/types.js'
import type { HTMLAttributes } from 'svelte/elements'

export type ISODate = string

export type ISODateTime = string

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
