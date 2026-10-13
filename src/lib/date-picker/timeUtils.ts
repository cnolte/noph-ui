import { formatTwoDigits, getFormatter, getPattern, pad, PROBE, readFields } from './formatters.js'

export { formatTwoDigits }

export type ISOTime = string

export const MINUTES_IN_HOUR = 60

export const HOURS_IN_DAY = 24

export const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR

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

/** A minute step as the pickers use it: a whole number of at least 1. */
export const stepOf = (minuteStep: number): number => Math.max(1, Math.trunc(minuteStep) || 1)

/** Whether an hour has a minute on the step grid that `usable` lets through. */
export const isHourReachable = (
	hour: number,
	step: number,
	usable: (minutes: number) => boolean,
): boolean => {
	for (let minute = 0; minute < MINUTES_IN_HOUR; minute += step) {
		if (usable(hour * MINUTES_IN_HOUR + minute)) return true
	}
	return false
}

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
): string => formatTime(withMinutes(PROBE, minutes), locale, hour12)

/** A hint like `HH:mm` or `hh:mm AM/PM`, for a text field's supporting text. */
export const getTimePattern = (locale?: string, hour12 = uses12HourClock(locale)): string =>
	getPattern(locale, timeOptions(hour12), getDayPeriodLabels(locale).join('/'))

/**
 * Reads a typed hour as the hour of the day. A 12-hour clock takes 1 to 12 and needs its day period
 * in `value`, matched against the locale's labels with an `am`/`pm` fallback.
 */
export const readHour = (
	hour: string,
	value: string,
	locale: string | undefined,
	hour12: boolean,
): number | undefined => {
	const hours = Number(hour)
	if (!hour12) return hours < HOURS_IN_DAY ? hours : undefined
	const [am, pm] = getDayPeriodLabels(locale)
	const text = value.toLocaleLowerCase(locale)
	const isPm = text.includes(pm.toLocaleLowerCase(locale)) || /\bpm\b/.test(text)
	const isAm = text.includes(am.toLocaleLowerCase(locale)) || /\bam\b/.test(text)
	if (isPm === isAm || hours < 1 || hours > 12) return undefined
	return (hours % 12) + (isPm ? 12 : 0)
}

/** Reads typed text as minutes since midnight. */
export const parseTimeInput = (
	value: string,
	locale?: string,
	hour12 = uses12HourClock(locale),
): number | undefined => {
	const fields = readFields(value, locale, timeOptions(hour12))
	if (!fields?.hour || !fields.minute) return undefined
	const hours = readHour(fields.hour, value, locale, hour12)
	const minutes = Number(fields.minute)
	if (hours === undefined || minutes >= MINUTES_IN_HOUR) return undefined
	return hours * MINUTES_IN_HOUR + minutes
}
