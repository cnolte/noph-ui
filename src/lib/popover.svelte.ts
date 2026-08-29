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
