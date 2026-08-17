export const DAYS_IN_WEEK = 7

export const MAX_CALENDAR_ROWS = 6

export const DEFAULT_YEAR_RANGE: [number, number] = [1900, 2100]

const pad = (value: number, length = 2) => `${value}`.padStart(length, '0')

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

const formatterCache = new Map<string, Intl.DateTimeFormat>()

const getFormatter = (locale: string | undefined, options: Intl.DateTimeFormatOptions) => {
	const key = `${locale ?? ''}|${JSON.stringify(options)}`
	let formatter = formatterCache.get(key)
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(locale, options)
		formatterCache.set(key, formatter)
	}
	return formatter
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

const numericOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
}

export const formatDate = (date: Date, locale?: string): string =>
	getFormatter(locale, numericOptions).format(date)

export const formatDateMedium = (date: Date, locale?: string): string =>
	getFormatter(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date)

export const formatDateLong = (date: Date, locale?: string): string =>
	getFormatter(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(
		date,
	)

export const formatMonthYear = (date: Date, locale?: string): string =>
	getFormatter(locale, { year: 'numeric', month: 'long' }).format(date)

type DateFieldOrder = ('year' | 'month' | 'day')[]

const getFieldOrder = (locale?: string): DateFieldOrder =>
	getFormatter(locale, numericOptions)
		.formatToParts(new Date(2024, 0, 2))
		.filter((part) => part.type === 'year' || part.type === 'month' || part.type === 'day')
		.map((part) => part.type as 'year' | 'month' | 'day')

export const getDatePattern = (locale?: string): string =>
	getFormatter(locale, numericOptions)
		.formatToParts(new Date(2024, 0, 2))
		.map((part) => {
			if (part.type === 'year') return 'YYYY'
			if (part.type === 'month') return 'MM'
			if (part.type === 'day') return 'DD'
			return part.value
		})
		.join('')

export const parseDateInput = (value: string, locale?: string): Date | undefined => {
	const groups = value.match(/\d+/g)
	if (!groups || groups.length !== 3) return undefined
	const order = getFieldOrder(locale)
	const year = order.indexOf('year')
	const month = order.indexOf('month')
	const day = order.indexOf('day')
	if (year < 0 || month < 0 || day < 0) return undefined
	if (groups[year].length !== 4) return undefined
	return createDate(Number(groups[year]), Number(groups[month]) - 1, Number(groups[day]))
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
