import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import adapter from '@sveltejs/adapter-vercel'

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ runtime: 'nodejs24.x' }),
			experimental: {
				remoteFunctions: true,
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
