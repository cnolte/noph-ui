import { formatTwoDigits, getFormatter, pad } from './formatters.js'

export { formatTwoDigits }

export type ISOTime = string

export const MINUTES_IN_HOUR = 60

export const HOURS_IN_DAY = 24

export const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR

const TIME_PROBE = new Date(2024, 0, 2, 13, 45)

export const minutesOfDay = (date: Date): number =>
	date.getHours() * MINUTES_IN_HOUR + date.getMinutes()

export const withMinutes = (date: Date, minutes: number): Date => {
	const copy = new Date(date)
	copy.setHours(Math.floor(minutes / MINUTES_IN_HOUR), minutes % MINUTES_IN_HOUR, 0, 0)
	return copy
}

export const toISOTime = (minutes: number): string =>
	`${pad(Math.floor(minutes / MINUTES_IN_HOUR))}:${pad(minutes % MINUTES_IN_HOUR)}`

export const parseISOTime = (value: ISOTime | number | null | undefined): number | undefined => {
	if (value === null || value === undefined || value === '') return undefined
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) return undefined
		const minutes = Math.trunc(value)
		return minutes >= 0 && minutes < MINUTES_IN_DAY ? minutes : undefined
	}
	const match = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(value.trim())
	if (!match) return undefined
	const hours = Number(match[1])
	const minutes = Number(match[2])
	if (hours >= HOURS_IN_DAY || minutes >= MINUTES_IN_HOUR) return undefined
	return hours * MINUTES_IN_HOUR + minutes
}

export const clampMinutes = (minutes: number, min?: number, max?: number): number => {
	if (min !== undefined && minutes < min) return min
	if (max !== undefined && minutes > max) return max
	return minutes
}

export const isMinuteWithin = (minutes: number, min?: number, max?: number): boolean =>
	(min === undefined || minutes >= min) && (max === undefined || minutes <= max)

/**
 * Snaps the minute part to the nearest multiple of `step` without ever rolling into the next hour,
 * so dragging the dial past the last step lands on it rather than changing the hour.
 */
export const snapToStep = (minutes: number, step: number): number => {
	if (!Number.isFinite(step) || step <= 1) return minutes
	const hour = Math.floor(minutes / MINUTES_IN_HOUR)
	const last = Math.floor((MINUTES_IN_HOUR - 1) / step) * step
	const snapped = Math.min(Math.round((minutes % MINUTES_IN_HOUR) / step) * step, last)
	return hour * MINUTES_IN_HOUR + snapped
}

const hourOptions = (hour12: boolean): Intl.DateTimeFormatOptions => ({
	hour: '2-digit',
	hour12,
})

export const timeOptions = (hour12: boolean): Intl.DateTimeFormatOptions => ({
	...hourOptions(hour12),
	minute: '2-digit',
})

const minuteStamp = (date: Date): number => {
	const copy = new Date(date)
	copy.setSeconds(0, 0)
	return copy.getTime()
}

export const compareTimes = (a: Date, b: Date): number => minuteStamp(a) - minuteStamp(b)

export const isTimeWithin = (date: Date, min?: Date, max?: Date): boolean =>
	(!min || compareTimes(date, min) >= 0) && (!max || compareTimes(date, max) <= 0)

export const uses12HourClock = (locale?: string): boolean =>
	getFormatter(locale, { hour: 'numeric' }).resolvedOptions().hour12 ?? false

export const getDayPeriodLabels = (locale?: string): [string, string] => {
	const formatter = getFormatter(locale, { hour: 'numeric', hour12: true })
	const label = (hour: number, fallback: string) =>
		formatter.formatToParts(new Date(2024, 0, 2, hour)).find((part) => part.type === 'dayPeriod')
			?.value ?? fallback
	return [label(9, 'AM'), label(21, 'PM')]
}

export const getHourLabels = (locale: string | undefined, hour12: boolean): string[] => {
	const formatter = getFormatter(locale, hourOptions(hour12))
	return Array.from({ length: hour12 ? 12 : HOURS_IN_DAY }, (_, hour) => {
		const parts = formatter.formatToParts(new Date(2024, 0, 2, hour))
		return parts.find((part) => part.type === 'hour')?.value ?? `${hour}`
	})
}

export const formatTime = (date: Date, locale?: string, hour12 = uses12HourClock(locale)): string =>
	getFormatter(locale, timeOptions(hour12)).format(date)

/** The same as {@link formatTime}, taking minutes since midnight instead of a `Date`. */
export const formatMinutes = (
	minutes: number,
	locale?: string,
	hour12 = uses12HourClock(locale),
): string => formatTime(withMinutes(TIME_PROBE, minutes), locale, hour12)

/** A hint like `HH:mm` or `hh:mm AM/PM`, for a text field's supporting text. */
export const getTimePattern = (locale?: string, hour12 = uses12HourClock(locale)): string => {
	const [am, pm] = getDayPeriodLabels(locale)
	return getFormatter(locale, timeOptions(hour12))
		.formatToParts(TIME_PROBE)
		.map((part) => {
			if (part.type === 'hour') return hour12 ? 'hh' : 'HH'
			if (part.type === 'minute') return 'mm'
			if (part.type === 'dayPeriod') return `${am}/${pm}`
			return part.value
		})
		.join('')
}

type TimeField = 'hour' | 'minute'

const getTimeFieldOrder = (locale: string | undefined, hour12: boolean): TimeField[] =>
	getFormatter(locale, timeOptions(hour12))
		.formatToParts(TIME_PROBE)
		.filter((part) => part.type === 'hour' || part.type === 'minute')
		.map((part) => part.type as TimeField)

/**
 * Reads typed text as minutes since midnight. The field order comes from the locale's own format
 * rather than a per-locale regex, and the day period is matched against the locale's labels with an
 * `am`/`pm` fallback.
 */
export const parseTimeInput = (
	value: string,
	locale?: string,
	hour12 = uses12HourClock(locale),
): number | undefined => {
	const groups = value.match(/\d+/g)
	if (!groups || groups.length !== 2) return undefined
	const order = getTimeFieldOrder(locale, hour12)
	if (order.length !== 2) return undefined
	const hour = groups[order.indexOf('hour')]
	const minute = groups[order.indexOf('minute')]
	if (hour === undefined || minute === undefined) return undefined
	let hours = Number(hour)
	const minutes = Number(minute)
	if (minutes >= MINUTES_IN_HOUR) return undefined
	if (hour12) {
		const [am, pm] = getDayPeriodLabels(locale)
		const text = value.toLocaleLowerCase(locale)
		const isPm = text.includes(pm.toLocaleLowerCase(locale)) || /\bpm\b/.test(text)
		const isAm = text.includes(am.toLocaleLowerCase(locale)) || /\bam\b/.test(text)
		if (isPm === isAm) return undefined
		if (hours > 12 || hours < 1) return undefined
		hours = (hours % 12) + (isPm ? 12 : 0)
	} else if (hours >= HOURS_IN_DAY) {
		return undefined
	}
	return hours * MINUTES_IN_HOUR + minutes
}
