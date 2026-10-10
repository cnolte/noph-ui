/** What a navigation destination reads after its name for its badge: the given label, else the count, else "New notification". */
export const badgeDescription = (label: string | number | undefined, ariaLabel?: string) =>
	ariaLabel ?? (label !== undefined ? String(label) : 'New notification')

/** Shows counts above 999 as "999+", so a large badge keeps to four characters. */
export const badgeText = (label: string | number) =>
	typeof label === 'number' && label > 999 ? '999+' : String(label)
