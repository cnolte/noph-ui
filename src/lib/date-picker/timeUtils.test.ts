import { describe, expect, it } from 'vitest'
import {
	compareTimes,
	createDateTime,
	formatDateTime,
	formatTime,
	getDateTimePattern,
	getDayPeriodLabels,
	getHourLabels,
	isTimeWithin,
	minutesOfDay,
	parseDateTimeInput,
	parseISODateTime,
	toISODateTime,
	toISOTime,
	uses12HourClock,
	withMinutes,
} from './dateUtils.js'

describe('toISODateTime / parseISODateTime', () => {
	it('round trips a local moment without shifting across timezones', () => {
		const date = createDateTime(2025, 7, 17, 14, 30)!
		expect(toISODateTime(date)).toBe('2025-08-17T14:30')
		expect(parseISODateTime('2025-08-17T14:30')?.getHours()).toBe(14)
		expect(parseISODateTime('2025-08-17T14:30')?.getMinutes()).toBe(30)
	})

	it('reads a bare day as midnight, or as the minute a bound is given', () => {
		expect(toISODateTime(parseISODateTime('2025-08-17')!)).toBe('2025-08-17T00:00')
		expect(toISODateTime(parseISODateTime('2025-08-17', 1439)!)).toBe('2025-08-17T23:59')
	})

	it('drops seconds rather than refusing a fuller ISO string', () => {
		expect(toISODateTime(parseISODateTime('2025-08-17T14:30:45')!)).toBe('2025-08-17T14:30')
		expect(toISODateTime(parseISODateTime('2025-08-17 14:30')!)).toBe('2025-08-17T14:30')
	})

	it('rejects times and days that do not exist', () => {
		expect(parseISODateTime('2025-08-17T24:00')).toBeUndefined()
		expect(parseISODateTime('2025-08-17T14:60')).toBeUndefined()
		expect(parseISODateTime('2025-02-31T10:00')).toBeUndefined()
		expect(parseISODateTime('17.08.2025 14:30')).toBeUndefined()
		expect(parseISODateTime(undefined)).toBeUndefined()
	})
})

describe('minutes of a day', () => {
	it('counts from midnight and back again', () => {
		expect(minutesOfDay(createDateTime(2025, 7, 17, 14, 30)!)).toBe(870)
		expect(toISOTime(870)).toBe('14:30')
		expect(toISOTime(0)).toBe('00:00')
	})

	it('moves a moment to another time of the same day', () => {
		const moved = withMinutes(createDateTime(2025, 7, 17, 14, 30)!, 5)
		expect(toISODateTime(moved)).toBe('2025-08-17T00:05')
	})
})

describe('compareTimes / isTimeWithin', () => {
	const min = createDateTime(2025, 7, 17, 9, 0)!
	const max = createDateTime(2025, 7, 19, 17, 0)!

	it('compares to the minute and ignores what is below it', () => {
		const early = createDateTime(2025, 7, 17, 8, 59)!
		expect(compareTimes(early, min)).toBeLessThan(0)
		const same = new Date(min)
		same.setSeconds(45, 500)
		expect(compareTimes(same, min)).toBe(0)
	})

	it('takes the ends of the range and refuses a minute outside it', () => {
		expect(isTimeWithin(min, min, max)).toBe(true)
		expect(isTimeWithin(max, min, max)).toBe(true)
		expect(isTimeWithin(createDateTime(2025, 7, 17, 8, 59)!, min, max)).toBe(false)
		expect(isTimeWithin(createDateTime(2025, 7, 19, 17, 1)!, min, max)).toBe(false)
		expect(isTimeWithin(createDateTime(2025, 7, 18, 3, 0)!, min, max)).toBe(true)
	})
})

describe('clock of a locale', () => {
	it('follows the locale unless it is asked otherwise', () => {
		expect(uses12HourClock('en-US')).toBe(true)
		expect(uses12HourClock('de-DE')).toBe(false)
	})

	it('labels the hours the way the locale reads them', () => {
		expect(getHourLabels('en-US', false)).toHaveLength(24)
		expect(getHourLabels('en-US', false)[0]).toBe('00')
		expect(getHourLabels('en-US', false)[13]).toBe('13')
		expect(getHourLabels('en-US', true)).toHaveLength(12)
		expect(getHourLabels('en-US', true)[0]).toBe('12')
		expect(getHourLabels('en-US', true)[1]).toBe('01')
	})

	it('names both day periods', () => {
		expect(getDayPeriodLabels('en-US')).toEqual(['AM', 'PM'])
	})
})

describe('formatDateTime / getDateTimePattern', () => {
	const date = createDateTime(2025, 7, 17, 14, 30)!

	it('formats in the fields and the order of the locale', () => {
		expect(formatDateTime(date, 'en-US', true)).toBe('08/17/2025, 02:30 PM')
		expect(formatDateTime(date, 'de-DE', false)).toBe('17.08.2025, 14:30')
		expect(formatTime(date, 'en-US', true)).toBe('02:30 PM')
	})

	it('describes that same shape as a hint', () => {
		expect(getDateTimePattern('en-US', true)).toBe('MM/DD/YYYY, hh:mm AM/PM')
		expect(getDateTimePattern('de-DE', false)).toBe('DD.MM.YYYY, HH:mm')
	})
})

describe('parseDateTimeInput', () => {
	it('reads the field order of the locale', () => {
		expect(toISODateTime(parseDateTimeInput('08/17/2025, 02:30 PM', 'en-US', true)!)).toBe(
			'2025-08-17T14:30',
		)
		expect(toISODateTime(parseDateTimeInput('17.08.2025, 14:30', 'de-DE', false)!)).toBe(
			'2025-08-17T14:30',
		)
	})

	it('takes a loosely typed entry', () => {
		expect(toISODateTime(parseDateTimeInput('8/1/2025 2:05 pm', 'en-US', true)!)).toBe(
			'2025-08-01T14:05',
		)
	})

	it('reads midnight and noon off the day period', () => {
		expect(toISODateTime(parseDateTimeInput('08/17/2025, 12:00 AM', 'en-US', true)!)).toBe(
			'2025-08-17T00:00',
		)
		expect(toISODateTime(parseDateTimeInput('08/17/2025, 12:00 PM', 'en-US', true)!)).toBe(
			'2025-08-17T12:00',
		)
	})

	it('waits for the day period rather than guessing a half of the day', () => {
		expect(parseDateTimeInput('08/17/2025, 02:30', 'en-US', true)).toBeUndefined()
		expect(parseDateTimeInput('08/17/2025, 02:30 AM PM', 'en-US', true)).toBeUndefined()
	})

	it('refuses an hour the clock cannot hold', () => {
		expect(parseDateTimeInput('08/17/2025, 13:30 PM', 'en-US', true)).toBeUndefined()
		expect(parseDateTimeInput('17.08.2025, 24:30', 'de-DE', false)).toBeUndefined()
	})

	it('refuses anything that is not a full entry', () => {
		expect(parseDateTimeInput('08/17/2025', 'en-US', true)).toBeUndefined()
		expect(parseDateTimeInput('', 'en-US', true)).toBeUndefined()
		expect(parseDateTimeInput('17/08/25, 14:30', 'de-DE', false)).toBeUndefined()
	})
})
