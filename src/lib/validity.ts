import type { Attachment } from 'svelte/attachments'

export const customValidity =
	(message: string): Attachment<HTMLInputElement> =>
	(input) => {
		input.setCustomValidity(message)
		return () => input.setCustomValidity('')
	}
