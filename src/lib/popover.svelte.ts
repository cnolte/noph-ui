/**
 * `show()`/`close()` for a popover-backed overlay, guarded both ways. `showPopover()` throws if
 * the popover is already showing and `hidePopover()` throws if it is already hidden, so both
 * directions need the `:popover-open` check, not just the one that happens to get exercised first.
 */
export const popoverController = (getElement: () => HTMLElement | undefined) => ({
	show: () => {
		const element = getElement()
		if (element && !element.matches(':popover-open')) element.showPopover()
	},
	close: () => {
		const element = getElement()
		if (element?.matches(':popover-open')) element.hidePopover()
	},
})

/**
 * Keeps a bindable `open` prop in sync with an overlay's own `show`/`close`, so a caller can drive
 * the overlay either by calling the exported methods or by writing to the bound prop.
 */
export const syncOpenEffect = (
	getElement: () => HTMLElement | undefined,
	getOpen: () => boolean | undefined,
	show: () => void,
	close: () => void,
) => {
	$effect(() => {
		if (!getElement()) return
		if (getOpen() === true) show()
		else if (getOpen() === false) close()
	})
}
