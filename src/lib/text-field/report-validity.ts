export const isFirstInvalidControlInForm = (
	form: HTMLFormElement | null,
	control: HTMLElement,
): boolean => {
	if (!form) {
		return true
	}

	return form.querySelector(':invalid') === control
}
