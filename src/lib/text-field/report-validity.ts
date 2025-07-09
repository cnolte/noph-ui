export const isFirstInvalidControlInForm = (
	form: HTMLFormElement | null,
	control: HTMLElement,
): boolean => {
	if (!form) {
		return true
	}

	return getFirstInvalidControlInForm(form) === control
}

export const getFirstInvalidControlInForm = (form: HTMLFormElement) => {
	let firstInvalidControl: Element | undefined
	for (const element of form.elements) {
		if (element.matches(':invalid')) {
			firstInvalidControl = element
			break
		}
	}
	return firstInvalidControl
}
