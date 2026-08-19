import { on } from 'svelte/events'

export const onFormReset = (
	control: HTMLInputElement | HTMLSelectElement | undefined,
	restore: () => void,
) => {
	const form = control?.form
	if (!form) return
	return on(form, 'reset', restore)
}
