// Morphs the rail between its collapsed and expanded layouts. CSS cannot animate a change of grid
// layout, so the items are measured before and after the switch and animated from the old boxes
// to the new ones (FLIP), along with the width of the rail itself.

/** Cancels what runs on the elements. Collected first, so styles are flushed only once. */
export const cancel = (elements: (Element | null)[]) => {
	elements.flatMap((element) => element?.getAnimations() ?? []).forEach((a) => a.cancel())
}

// The expanded rail's min-width would snap it open at once, so it is lifted while the width moves.
const animateWidth = (
	rail: HTMLElement,
	from: number,
	to: number,
	timing: KeyframeAnimationOptions,
) =>
	rail.animate(
		[
			{ width: `${from}px`, minWidth: '0px' },
			{ width: `${to}px`, minWidth: '0px' },
		],
		timing,
	)

type Parts = { item: HTMLElement; icon: HTMLElement | null; indicator: HTMLElement | null }
type Boxes = { item: DOMRect; icon?: DOMRect; indicator?: DOMRect }

const measure = ({ item, icon, indicator }: Parts): Boxes => ({
	item: item.getBoundingClientRect(),
	icon: icon?.getBoundingClientRect(),
	indicator: indicator?.getBoundingClientRect(),
})

/**
 * Animates an element back from where it sat inside its parent before. Offsets count from the
 * parent, so a parent that moves carries the element along. `size` also animates its box.
 */
const flip = (
	element: HTMLElement,
	[before, beforeParent]: [DOMRect, DOMRect],
	[after, afterParent]: [DOMRect, DOMRect],
	timing: KeyframeAnimationOptions,
	size = false,
) => {
	const x = before.left - beforeParent.left - (after.left - afterParent.left)
	const y = before.top - beforeParent.top - (after.top - afterParent.top)
	const box = (rect: DOMRect) =>
		size ? { width: `${rect.width}px`, height: `${rect.height}px` } : {}
	element.animate(
		[
			{ transform: `translate(${x}px, ${y}px)`, ...box(before) },
			{ transform: 'none', ...box(after) },
		],
		timing,
	)
}

/**
 * Switches the layout through `apply` and animates the rail and its items from where they were.
 * Resolves when the rail has finished moving.
 */
export const morph = async (
	rail: HTMLElement,
	apply: () => void,
	timing: KeyframeAnimationOptions,
	/** Timing for the rail's own width, when it moves differently from its items. */
	railTiming: KeyframeAnimationOptions = timing,
) => {
	const parts = [...rail.querySelectorAll<HTMLElement>('.np-navigation-action')].map(
		(item): Parts => ({
			item,
			icon: item.querySelector('.np-navigation-action-icon'),
			indicator: item.querySelector('.np-navigation-action-indicator'),
		}),
	)
	const firstRail = rail.getBoundingClientRect()
	const first = parts.map(measure)
	cancel([rail, ...parts.flatMap(({ item, icon, indicator }) => [item, icon, indicator])])

	apply()

	// Measure everything before anything moves: the rail's own animation can shift its container.
	const lastRail = rail.getBoundingClientRect()
	const last = parts.map(measure)

	const animation = animateWidth(rail, firstRail.width, lastRail.width, railTiming)
	parts.forEach(({ item, icon, indicator }, i) => {
		const before = first[i]
		const after = last[i]
		// An item that appears or goes with the switch, in a section shown only when expanded, fades
		// instead.
		if (!before.item.width || !after.item.width) return
		flip(item, [before.item, firstRail], [after.item, lastRail], timing)
		if (icon) flip(icon, [before.icon!, before.item], [after.icon!, after.item], timing)
		if (indicator) {
			flip(
				indicator,
				[before.indicator!, before.item],
				[after.indicator!, after.item],
				timing,
				true,
			)
		}
	})
	await animation.finished.catch(() => {})
}

/**
 * Grows the rail out of nothing or shrinks it away, for a rail that is hidden when collapsed.
 * Shrinking holds the end, so the rail stays gone until it is hidden.
 */
export const resize = (rail: HTMLElement, grow: boolean, timing: KeyframeAnimationOptions) => {
	cancel([rail])
	const width = rail.getBoundingClientRect().width
	return animateWidth(rail, grow ? 0 : width, grow ? width : 0, {
		...timing,
		fill: grow ? 'none' : 'forwards',
	}).finished.catch(() => {})
}
