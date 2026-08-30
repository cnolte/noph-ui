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
import {
	clampMinutes,
	formatMinutes,
	getTimePattern,
	isMinuteWithin,
	parseISOTime,
	parseTimeInput,
	snapToStep,
} from './timeUtils.js'

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

describe('parseISOTime', () => {
	it('reads a wall clock time as minutes since midnight', () => {
		expect(parseISOTime('00:00')).toBe(0)
		expect(parseISOTime('14:30')).toBe(870)
		expect(parseISOTime('23:59')).toBe(1439)
	})

	it('takes a single digit hour and drops seconds', () => {
		expect(parseISOTime('9:05')).toBe(545)
		expect(parseISOTime('14:30:45')).toBe(870)
	})

	it('takes minutes since midnight straight through', () => {
		expect(parseISOTime(870)).toBe(870)
		expect(parseISOTime(0)).toBe(0)
		expect(parseISOTime(1440)).toBeUndefined()
		expect(parseISOTime(-1)).toBeUndefined()
	})

	it('refuses a time the clock cannot hold, or nothing at all', () => {
		expect(parseISOTime('24:00')).toBeUndefined()
		expect(parseISOTime('14:60')).toBeUndefined()
		expect(parseISOTime('2:30 PM')).toBeUndefined()
		expect(parseISOTime('')).toBeUndefined()
		expect(parseISOTime(undefined)).toBeUndefined()
		expect(parseISOTime(null)).toBeUndefined()
	})
})

describe('clampMinutes / isMinuteWithin', () => {
	it('pulls a minute back to the nearer end of the range', () => {
		expect(clampMinutes(500, 540, 1020)).toBe(540)
		expect(clampMinutes(1100, 540, 1020)).toBe(1020)
		expect(clampMinutes(600, 540, 1020)).toBe(600)
	})

	it('leaves a minute alone when there is no bound on that side', () => {
		expect(clampMinutes(0, undefined, 1020)).toBe(0)
		expect(clampMinutes(1439, 540, undefined)).toBe(1439)
	})

	it('takes the ends of the range and refuses a minute outside it', () => {
		expect(isMinuteWithin(540, 540, 1020)).toBe(true)
		expect(isMinuteWithin(1020, 540, 1020)).toBe(true)
		expect(isMinuteWithin(539, 540, 1020)).toBe(false)
		expect(isMinuteWithin(1021, 540, 1020)).toBe(false)
		expect(isMinuteWithin(0)).toBe(true)
	})
})

describe('snapToStep', () => {
	it('rounds the minute to the nearest step', () => {
		expect(snapToStep(872, 5)).toBe(870)
		expect(snapToStep(873, 5)).toBe(875)
		expect(snapToStep(900, 15)).toBe(900)
		expect(snapToStep(908, 15)).toBe(915)
	})

	it('holds the hour rather than rolling into the next one', () => {
		expect(snapToStep(898, 5)).toBe(895)
		expect(snapToStep(1439, 15)).toBe(1425)
		expect(snapToStep(59, 30)).toBe(30)
	})

	it('leaves every minute reachable at a step of one', () => {
		expect(snapToStep(871, 1)).toBe(871)
		expect(snapToStep(871, 0)).toBe(871)
	})
})

describe('formatMinutes / getTimePattern', () => {
	it('formats in the fields and the order of the locale', () => {
		expect(formatMinutes(870, 'en-US', true)).toBe('02:30 PM')
		expect(formatMinutes(870, 'de-DE', false)).toBe('14:30')
		expect(formatMinutes(0, 'en-US', true)).toBe('12:00 AM')
	})

	it('describes that same shape as a hint', () => {
		expect(getTimePattern('en-US', true)).toBe('hh:mm AM/PM')
		expect(getTimePattern('de-DE', false)).toBe('HH:mm')
	})
})

describe('parseTimeInput', () => {
	it('reads the field order of the locale', () => {
		expect(parseTimeInput('02:30 PM', 'en-US', true)).toBe(870)
		expect(parseTimeInput('14:30', 'de-DE', false)).toBe(870)
	})

	it('takes a loosely typed entry', () => {
		expect(parseTimeInput('2:05 pm', 'en-US', true)).toBe(845)
		expect(parseTimeInput('9:5', 'de-DE', false)).toBe(545)
	})

	it('reads midnight and noon off the day period', () => {
		expect(parseTimeInput('12:00 AM', 'en-US', true)).toBe(0)
		expect(parseTimeInput('12:00 PM', 'en-US', true)).toBe(720)
	})

	it('waits for the day period rather than guessing a half of the day', () => {
		expect(parseTimeInput('02:30', 'en-US', true)).toBeUndefined()
		expect(parseTimeInput('02:30 AM PM', 'en-US', true)).toBeUndefined()
	})

	it('refuses an hour the clock cannot hold', () => {
		expect(parseTimeInput('13:30 PM', 'en-US', true)).toBeUndefined()
		expect(parseTimeInput('00:30 AM', 'en-US', true)).toBeUndefined()
		expect(parseTimeInput('24:30', 'de-DE', false)).toBeUndefined()
		expect(parseTimeInput('14:60', 'de-DE', false)).toBeUndefined()
	})

	it('refuses anything that is not a full entry', () => {
		expect(parseTimeInput('14', 'de-DE', false)).toBeUndefined()
		expect(parseTimeInput('', 'de-DE', false)).toBeUndefined()
	})
})
