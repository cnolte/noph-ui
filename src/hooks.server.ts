import { type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const handleTheme = (async ({ event, resolve }) => {
	const cookieTheme = event.cookies.get('theme') || ''
	const theme = ['light', 'dark'].find((supportedTheme) => supportedTheme === cookieTheme) ?? ''
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%theme%', theme ? `data-theme="${theme}"` : '')
		},
	})
}) satisfies Handle

export const handle = sequence(handleTheme)
