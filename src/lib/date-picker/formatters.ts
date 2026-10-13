export const pad = (value: number, length = 2) => `${value}`.padStart(length, '0')

const formatterCache = new Map<string, Intl.DateTimeFormat>()

export const getFormatter = (locale: string | undefined, options: Intl.DateTimeFormatOptions) => {
	const key = `${locale ?? ''}|${JSON.stringify(options)}`
	return formatterCache.getOrInsertComputed(key, () => new Intl.DateTimeFormat(locale, options))
}

const numberFormatterCache = new Map<string, Intl.NumberFormat>()

export const formatTwoDigits = (value: number, locale?: string): string =>
	numberFormatterCache
		.getOrInsertComputed(
			locale ?? '',
			() => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false }),
		)
		.format(value)

export const numericDateOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
}

/** A moment whose every field differs, to read a locale's format from. */
export const PROBE = new Date(2024, 0, 2, 13, 45)

type Field = 'year' | 'month' | 'day' | 'hour' | 'minute'

const TOKENS: Partial<Record<Intl.DateTimeFormatPartTypes, string>> = {
	year: 'YYYY',
	month: 'MM',
	day: 'DD',
	minute: 'mm',
}

/**
 * A hint like `DD.MM.YYYY` or `hh:mm AM/PM` for a text field's supporting text, written the way the
 * locale formats with `options`. `dayPeriod` stands in for the locale's AM and PM.
 */
export const getPattern = (
	locale: string | undefined,
	options: Intl.DateTimeFormatOptions,
	dayPeriod = '',
): string =>
	getFormatter(locale, options)
		.formatToParts(PROBE)
		.map((part) => {
			if (part.type === 'hour') return options.hour12 ? 'hh' : 'HH'
			if (part.type === 'dayPeriod') return dayPeriod
			return TOKENS[part.type] ?? part.value
		})
		.join('')

const WIDTHS: Record<Field, number> = { year: 4, month: 2, day: 2, hour: 2, minute: 2 }

/**
 * Splits typed text into its numbers and names each by the field the locale writes in its place.
 * The field order comes from the locale's own format rather than a per-locale regex. Digits typed
 * without separators, such as 08172025, are cut into the fields when they fill them exactly. Text
 * with a number too many or too few is not read.
 */
export const readFields = (
	value: string,
	locale: string | undefined,
	options: Intl.DateTimeFormatOptions,
): Partial<Record<Field, string>> | undefined => {
	const order = getFormatter(locale, options)
		.formatToParts(PROBE)
		.map((part) => part.type)
		.filter((type): type is Field => type in TOKENS || type === 'hour')
	let groups: string[] | null = value.match(/\d+/g)
	const digits = groups?.length === 1 && order.length > 1 ? groups[0] : ''
	if (digits.length === order.reduce((sum, field) => sum + WIDTHS[field], 0)) {
		let at = 0
		groups = order.map((field) => digits.slice(at, (at += WIDTHS[field])))
	}
	if (!groups || groups.length !== order.length) return undefined
	return Object.fromEntries(order.map((field, index) => [field, groups[index]]))
}
