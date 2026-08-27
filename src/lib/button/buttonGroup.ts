export const resolveItem = (item: HTMLElement): HTMLElement => {
	let current = item
	while (current.ownerDocument.defaultView?.getComputedStyle(current).display === 'contents') {
		const child = (Array.from(current.children) as HTMLElement[]).find(
			(candidate) => !candidate.hasAttribute('popover'),
		)
		if (!child) return current
		current = child
	}
	return current
}

export const expandedWidths = (
	widths: number[],
	index: number,
	expandedRatio: number,
	compressionLimit: number,
): number[] => {
	const next = [...widths]
	if (widths.length < 2 || index < 0 || index >= widths.length || expandedRatio <= 0) return next

	const neighbours = [index - 1, index + 1].filter((i) => i >= 0 && i < widths.length)
	const target = Math.round(
		Math.min((expandedRatio * widths[index]) / neighbours.length, compressionLimit),
	)
	for (const neighbour of neighbours) {
		const growth = Math.min(target, widths[neighbour])
		next[neighbour] -= growth
		next[index] += growth
	}
	return next
}

export const parseMotion = (token: string): { duration: number; easing: string } => {
	const [time, ...rest] = token.trim().split(/\s+/)
	const value = Number.parseFloat(time)
	const easing = rest.join(' ')
	return {
		duration: Number.isNaN(value) ? 0 : time.endsWith('ms') ? value : value * 1000,
		easing: easing || 'linear',
	}
}
