import { describe, expect, it } from 'vitest'
import {
	addMonths,
	clampMonthInYear,
	createDate,
	getCalendarDays,
	getDatePattern,
	getMonthNames,
	getWeekdayLabels,
	getWeekRowCount,
	isMonthWithin,
	isWithin,
	isYearWithin,
	parseDateInput,
	parseISODate,
	toISODate,
} from './dateUtils.js'

describe('toISODate / parseISODate', () => {
	it('round trips a local date without shifting across timezones', () => {
		const date = createDate(2025, 7, 17)!
		expect(toISODate(date)).toBe('2025-08-17')
		expect(parseISODate('2025-08-17')?.getDate()).toBe(17)
		expect(parseISODate('2025-08-17')?.getMonth()).toBe(7)
	})

	it('rejects days that do not exist rather than rolling over', () => {
		expect(parseISODate('2025-02-31')).toBeUndefined()
		expect(createDate(2025, 1, 30)).toBeUndefined()
	})

	it('accepts a leap day only in a leap year', () => {
		expect(parseISODate('2024-02-29')).toBeDefined()
		expect(parseISODate('2025-02-29')).toBeUndefined()
	})

	it('ignores malformed input', () => {
		expect(parseISODate('')).toBeUndefined()
		expect(parseISODate('17.08.2025')).toBeUndefined()
		expect(parseISODate(undefined)).toBeUndefined()
	})
})

describe('addMonths', () => {
	it('clamps the day when the target month is shorter', () => {
		expect(toISODate(addMonths(createDate(2025, 0, 31)!, 1))).toBe('2025-02-28')
		expect(toISODate(addMonths(createDate(2024, 0, 31)!, 1))).toBe('2024-02-29')
	})

	it('crosses year boundaries in both directions', () => {
		expect(toISODate(addMonths(createDate(2025, 11, 15)!, 1))).toBe('2026-01-15')
		expect(toISODate(addMonths(createDate(2025, 0, 15)!, -1))).toBe('2024-12-15')
	})
})

describe('getCalendarDays', () => {
	it('always fills six weeks', () => {
		expect(getCalendarDays(createDate(2025, 7, 1)!, 0)).toHaveLength(42)
		expect(getCalendarDays(createDate(2026, 1, 1)!, 0)).toHaveLength(42)
	})

	it('pads August 2025 with the trailing days of July when the week starts on Sunday', () => {
		const days = getCalendarDays(createDate(2025, 7, 1)!, 0)
		expect(toISODate(days[0].date)).toBe('2025-07-27')
		expect(days[0].inMonth).toBe(false)
		expect(toISODate(days[5].date)).toBe('2025-08-01')
		expect(days[5].inMonth).toBe(true)
	})

	it('shifts the leading padding when the week starts on Monday', () => {
		const days = getCalendarDays(createDate(2025, 7, 1)!, 1)
		expect(toISODate(days[0].date)).toBe('2025-07-28')
		expect(toISODate(days[4].date)).toBe('2025-08-01')
	})

	it('needs no leading padding when the month starts on the first weekday column', () => {
		const days = getCalendarDays(createDate(2025, 5, 1)!, 0)
		expect(toISODate(days[0].date)).toBe('2025-06-01')
		expect(days[0].inMonth).toBe(true)
	})
})

describe('getWeekRowCount', () => {
	it('needs six rows for a long month that starts late in the week', () => {
		expect(getWeekRowCount(createDate(2025, 7, 1)!, 0)).toBe(6)
	})

	it('needs five rows for a month that starts earlier', () => {
		expect(getWeekRowCount(createDate(2025, 8, 1)!, 0)).toBe(5)
	})

	it('needs only four rows for a non-leap February starting on the first column', () => {
		expect(getWeekRowCount(createDate(2015, 1, 1)!, 0)).toBe(4)
	})

	it('depends on the first day of the week', () => {
		expect(getWeekRowCount(createDate(2026, 2, 1)!, 0)).toBe(5)
		expect(getWeekRowCount(createDate(2026, 2, 1)!, 1)).toBe(6)
	})

	it('never exceeds the six rows the fixed grid reserves', () => {
		for (let month = 0; month < 12; month++) {
			for (let week = 0; week < 7; week++) {
				const rows = getWeekRowCount(createDate(2024, month, 1)!, week)
				expect(rows).toBeGreaterThanOrEqual(4)
				expect(rows).toBeLessThanOrEqual(6)
			}
		}
	})
})

describe('getCalendarDays with a row count', () => {
	it('returns exactly the requested number of weeks', () => {
		const month = createDate(2025, 8, 1)!
		expect(getCalendarDays(month, 0, getWeekRowCount(month, 0))).toHaveLength(35)
	})
})

describe('locale formatting', () => {
	it('derives the numeric input pattern per locale', () => {
		expect(getDatePattern('en-US')).toBe('MM/DD/YYYY')
		expect(getDatePattern('de-DE')).toBe('DD.MM.YYYY')
	})

	it('orders weekday labels from the given first day of week', () => {
		expect(getWeekdayLabels('en-US', 0).map((w) => w.long)[0]).toBe('Sunday')
		expect(getWeekdayLabels('en-US', 1).map((w) => w.long)[0]).toBe('Monday')
		expect(getWeekdayLabels('en-US', 0)).toHaveLength(7)
	})

	it('returns twelve localised month names', () => {
		expect(getMonthNames('en-US', 'long')[7]).toBe('August')
		expect(getMonthNames('en-US', 'short')[7]).toBe('Aug')
		expect(getMonthNames('de-DE', 'long')[7]).toBe('August')
	})
})

describe('parseDateInput', () => {
	it('reads digit groups in the locale field order', () => {
		expect(toISODate(parseDateInput('08/17/2025', 'en-US')!)).toBe('2025-08-17')
		expect(toISODate(parseDateInput('17.08.2025', 'de-DE')!)).toBe('2025-08-17')
	})

	it('accepts unpadded numbers and alternative separators', () => {
		expect(toISODate(parseDateInput('8/17/2025', 'en-US')!)).toBe('2025-08-17')
		expect(toISODate(parseDateInput('08-17-2025', 'en-US')!)).toBe('2025-08-17')
	})

	it('rejects incomplete or impossible input', () => {
		expect(parseDateInput('08/17', 'en-US')).toBeUndefined()
		expect(parseDateInput('', 'en-US')).toBeUndefined()
		expect(parseDateInput('02/31/2025', 'en-US')).toBeUndefined()
		expect(parseDateInput('08/17/25', 'en-US')).toBeUndefined()
	})

	it('rejects text carrying more than the three date fields', () => {
		expect(parseDateInput('08/17/2025 10:30', 'en-US')).toBeUndefined()
		expect(parseDateInput('08/17/2025/1', 'en-US')).toBeUndefined()
	})

	it('reads a year-first locale', () => {
		expect(toISODate(parseDateInput('2025/08/17', 'ja-JP')!)).toBe('2025-08-17')
	})
})

describe('isWithin', () => {
	const day = createDate(2025, 7, 17)!

	it('treats the bounds as inclusive', () => {
		expect(isWithin(day, createDate(2025, 7, 17), createDate(2025, 7, 17))).toBe(true)
	})

	it('excludes days outside the bounds', () => {
		expect(isWithin(day, createDate(2025, 7, 18), undefined)).toBe(false)
		expect(isWithin(day, undefined, createDate(2025, 7, 16))).toBe(false)
	})

	it('is unbounded when no limits are given', () => {
		expect(isWithin(day)).toBe(true)
	})
})

describe('isMonthWithin / isYearWithin', () => {
	const min = createDate(2025, 5, 15)!
	const max = createDate(2026, 2, 10)!

	it('offers a month as soon as one of its days is in range', () => {
		expect(isMonthWithin(2025, 5, min, max)).toBe(true)
		expect(isMonthWithin(2026, 2, min, max)).toBe(true)
	})

	it('refuses a month no day of which is in range', () => {
		expect(isMonthWithin(2025, 4, min, max)).toBe(false)
		expect(isMonthWithin(2026, 3, min, max)).toBe(false)
	})

	it('offers a year as soon as one of its days is in range', () => {
		expect(isYearWithin(2025, min, max)).toBe(true)
		expect(isYearWithin(2026, min, max)).toBe(true)
		expect(isYearWithin(2024, min, max)).toBe(false)
		expect(isYearWithin(2027, min, max)).toBe(false)
	})
})

describe('clampMonthInYear', () => {
	const min = createDate(2025, 5, 15)!
	const max = createDate(2026, 2, 10)!

	it('pulls a month up to the first one the lower bound allows', () => {
		expect(clampMonthInYear(2025, 0, min, max)).toBe(5)
	})

	it('pulls a month down to the last one the upper bound allows', () => {
		expect(clampMonthInYear(2026, 11, min, max)).toBe(2)
	})

	it('leaves a month that already holds selectable days alone', () => {
		expect(clampMonthInYear(2025, 8, min, max)).toBe(8)
		expect(clampMonthInYear(2026, 1, min, max)).toBe(1)
	})

	it('only bounds the year the limit falls in', () => {
		expect(clampMonthInYear(2025, 0, undefined, max)).toBe(0)
		expect(clampMonthInYear(2026, 11, min, undefined)).toBe(11)
	})

	it('is unbounded when no limits are given', () => {
		expect(clampMonthInYear(2025, 7)).toBe(7)
	})
})
