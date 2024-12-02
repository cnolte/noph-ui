import type { LayoutServerLoad } from './$types.js'

export const prerender = true

export const load: LayoutServerLoad = async ({ cookies }) => {
	return {
		theme: cookies.get('theme'),
	}
}
