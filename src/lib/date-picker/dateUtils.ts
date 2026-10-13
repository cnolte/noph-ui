import { getFormatter, getPattern, numericDateOptions, pad, readFields } from './formatters.js'
import {
	getDayPeriodLabels,
	HOURS_IN_DAY,
	MINUTES_IN_HOUR,
	readHour,
	timeOptions,
	uses12HourClock,
	withMinutes,
} from './timeUtils.js'

export {
	compareTimes,
	formatMinutes,
	formatTime,
	formatTwoDigits,
	getDayPeriodLabels,
	getHourLabels,
	getTimePattern,
	HOURS_IN_DAY,
	isMinuteWithin,
	isTimeWithin,
	MINUTES_IN_DAY,
	MINUTES_IN_HOUR,
	minutesOfDay,
	parseISOTime,
	parseTimeInput,
	toISOTime,
	uses12HourClock,
	withMinutes,
} from './timeUtils.js'
export type { ISOTime } from './timeUtils.js'

export const DAYS_IN_WEEK = 7

export const MAX_CALENDAR_ROWS = 6

export const DEFAULT_YEAR_RANGE: [number, number] = [1900, 2100]

export const toISODate = (date: Date): string =>
	`${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const parseISODate = (value: string | null | undefined): Date | undefined => {
	if (!value) return undefined
	const match = /^(\d{4,})-(\d{2})-(\d{2})$/.exec(value.trim())
	if (!match) return undefined
	const [, year, month, day] = match
	return createDate(Number(year), Number(month) - 1, Number(day))
}

export const createDate = (year: number, month: number, day: number): Date | undefined => {
	const date = new Date(year, month, day)
	date.setHours(0, 0, 0, 0)
	if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
		return undefined
	}
	return date
}

export const startOfDay = (date: Date): Date => {
	const copy = new Date(date)
	copy.setHours(0, 0, 0, 0)
	return copy
}

export const today = (): Date => startOfDay(new Date())

export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1)

const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

export const addMonths = (date: Date, delta: number): Date => {
	const year = date.getFullYear()
	const month = date.getMonth() + delta
	const day = Math.min(date.getDate(), daysInMonth(year, month))
	return new Date(year, month, day)
}

export const addDays = (date: Date, delta: number): Date => {
	const copy = new Date(date)
	copy.setDate(copy.getDate() + delta)
	return copy
}

export const isSameDay = (a: Date | undefined, b: Date | undefined): boolean =>
	!!a &&
	!!b &&
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate()

export const isSameMonth = (a: Date | undefined, b: Date | undefined): boolean =>
	!!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

export const compareDays = (a: Date, b: Date): number =>
	startOfDay(a).getTime() - startOfDay(b).getTime()

export const clampDate = (date: Date, min?: Date, max?: Date): Date => {
	if (min && compareDays(date, min) < 0) return min
	if (max && compareDays(date, max) > 0) return max
	return date
}

export const isWithin = (date: Date, min?: Date, max?: Date): boolean =>
	(!min || compareDays(date, min) >= 0) && (!max || compareDays(date, max) <= 0)

export const isMonthWithin = (year: number, month: number, min?: Date, max?: Date): boolean =>
	isWithin(new Date(year, month + 1, 0), min, undefined) &&
	isWithin(new Date(year, month, 1), undefined, max)

export const isYearWithin = (year: number, min?: Date, max?: Date): boolean =>
	isWithin(new Date(year, 11, 31), min, undefined) && isWithin(new Date(year, 0, 1), undefined, max)

export const clampMonthInYear = (year: number, month: number, min?: Date, max?: Date): number => {
	const lower = min && year === min.getFullYear() ? min.getMonth() : 0
	const upper = max && year === max.getFullYear() ? max.getMonth() : 11
	return Math.min(Math.max(month, lower), upper)
}

export const getFirstDayOfWeek = (locale?: string): number => {
	try {
		const resolved = new Intl.Locale(locale ?? getFormatter(locale, {}).resolvedOptions().locale)
		const weekInfo = resolved as Intl.Locale & {
			getWeekInfo?: () => { firstDay: number }
			weekInfo?: { firstDay: number }
		}
		const firstDay = weekInfo.getWeekInfo?.().firstDay ?? weekInfo.weekInfo?.firstDay
		if (typeof firstDay === 'number') return firstDay % 7
	} catch {
		return 0
	}
	return 0
}

const WEEKDAY_ANCHOR = new Date(2024, 0, 7)

export interface WeekdayLabel {
	narrow: string
	long: string
}

export const getWeekdayLabels = (locale: string | undefined, firstDayOfWeek: number) => {
	const narrow = getFormatter(locale, { weekday: 'narrow' })
	const long = getFormatter(locale, { weekday: 'long' })
	return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
		const date = addDays(WEEKDAY_ANCHOR, (firstDayOfWeek + index) % DAYS_IN_WEEK)
		return { narrow: narrow.format(date), long: long.format(date) } satisfies WeekdayLabel
	})
}

export const getMonthNames = (locale: string | undefined, month: 'long' | 'short') => {
	const formatter = getFormatter(locale, { month })
	return Array.from({ length: 12 }, (_, index) => formatter.format(new Date(2024, index, 1)))
}

const numericOptions = numericDateOptions

export const formatDate = (date: Date, locale?: string): string =>
	getFormatter(locale, numericOptions).format(date)

export const formatDateMedium = (date: Date, locale?: string): string =>
	getFormatter(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date)

/** The headline of the modal picker, as M3 shows it: "Mon, Aug 17". */
export const formatDateHeadline = (date: Date, locale?: string): string =>
	getFormatter(locale, { weekday: 'short', month: 'short', day: 'numeric' }).format(date)

/** Each end in the headline of the range picker, as M3 shows it: "Aug 17". */
export const formatMonthDay = (date: Date, locale?: string): string =>
	getFormatter(locale, { month: 'short', day: 'numeric' }).format(date)

export const formatDateLong = (date: Date, locale?: string): string =>
	getFormatter(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(
		date,
	)

export const formatMonthYear = (date: Date, locale?: string): string =>
	getFormatter(locale, { year: 'numeric', month: 'long' }).format(date)

export const getDatePattern = (locale?: string): string => getPattern(locale, numericOptions)

export const parseDateInput = (value: string, locale?: string): Date | undefined => {
	const { year, month, day } = readFields(value, locale, numericOptions) ?? {}
	if (year?.length !== 4 || !month || !day) return undefined
	return createDate(Number(year), Number(month) - 1, Number(day))
}

export interface CalendarDay {
	date: Date
	inMonth: boolean
}

const leadingOffset = (month: Date, firstDayOfWeek: number) =>
	(startOfMonth(month).getDay() - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK

export const getWeekRowCount = (month: Date, firstDayOfWeek: number): number => {
	const first = startOfMonth(month)
	const days = daysInMonth(first.getFullYear(), first.getMonth())
	return Math.ceil((leadingOffset(month, firstDayOfWeek) + days) / DAYS_IN_WEEK)
}

export const getCalendarDays = (
	month: Date,
	firstDayOfWeek: number,
	rows: number = MAX_CALENDAR_ROWS,
): CalendarDay[] => {
	const first = startOfMonth(month)
	const start = addDays(first, -leadingOffset(month, firstDayOfWeek))
	return Array.from({ length: rows * DAYS_IN_WEEK }, (_, index) => {
		const date = addDays(start, index)
		return { date, inMonth: date.getMonth() === first.getMonth() }
	})
}

export const toISODateTime = (date: Date): string =>
	`${toISODate(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`

export const createDateTime = (
	year: number,
	month: number,
	day: number,
	hours: number,
	minutes: number,
): Date | undefined => {
	if (hours < 0 || hours >= HOURS_IN_DAY || minutes < 0 || minutes >= MINUTES_IN_HOUR) {
		return undefined
	}
	const date = createDate(year, month, day)
	if (!date) return undefined
	date.setHours(hours, minutes, 0, 0)
	return date
}

export const parseISODateTime = (
	value: string | null | undefined,
	dateOnlyMinutes = 0,
): Date | undefined => {
	if (!value) return undefined
	const match = /^(\d{4,})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?)?$/.exec(
		value.trim(),
	)
	if (!match) return undefined
	const [, year, month, day, hours, minutes] = match
	if (hours === undefined) {
		const date = createDate(Number(year), Number(month) - 1, Number(day))
		return date && withMinutes(date, dateOnlyMinutes)
	}
	return createDateTime(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hours),
		Number(minutes),
	)
}

const dateTimeOptions = (hour12: boolean): Intl.DateTimeFormatOptions => ({
	...numericOptions,
	...timeOptions(hour12),
})

export const formatDateTime = (
	date: Date,
	locale?: string,
	hour12 = uses12HourClock(locale),
): string => getFormatter(locale, dateTimeOptions(hour12)).format(date)

export const getDateTimePattern = (locale?: string, hour12 = uses12HourClock(locale)): string =>
	getPattern(locale, dateTimeOptions(hour12), getDayPeriodLabels(locale).join('/'))

export const parseDateTimeInput = (
	value: string,
	locale?: string,
	hour12 = uses12HourClock(locale),
): Date | undefined => {
	const { year, month, day, hour, minute } =
		readFields(value, locale, dateTimeOptions(hour12)) ?? {}
	if (year?.length !== 4 || !month || !day || !hour || !minute) return undefined
	const hours = readHour(hour, value, locale, hour12)
	if (hours === undefined) return undefined
	return createDateTime(Number(year), Number(month) - 1, Number(day), hours, Number(minute))
}
