import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import adapter from '@sveltejs/adapter-auto'

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			experimental: {
				remoteFunctions: true,
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
