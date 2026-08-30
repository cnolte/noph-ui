import type { Attachment } from 'svelte/attachments'
import { on } from 'svelte/events'

export const formReset =
	(restore: () => void): Attachment<HTMLInputElement | HTMLSelectElement> =>
	(control) => {
		const form = control.form
		if (!form) return
		return on(form, 'reset', restore)
	}
