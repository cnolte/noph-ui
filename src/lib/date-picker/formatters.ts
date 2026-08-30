export const pad = (value: number, length = 2) => `${value}`.padStart(length, '0')

const formatterCache = new Map<string, Intl.DateTimeFormat>()

export const getFormatter = (locale: string | undefined, options: Intl.DateTimeFormatOptions) => {
	const key = `${locale ?? ''}|${JSON.stringify(options)}`
	let formatter = formatterCache.get(key)
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(locale, options)
		formatterCache.set(key, formatter)
	}
	return formatter
}

const numberFormatterCache = new Map<string, Intl.NumberFormat>()

export const formatTwoDigits = (value: number, locale?: string): string => {
	const key = locale ?? ''
	let formatter = numberFormatterCache.get(key)
	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false })
		numberFormatterCache.set(key, formatter)
	}
	return formatter.format(value)
}

export const numericDateOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
}
