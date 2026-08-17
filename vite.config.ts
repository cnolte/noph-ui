import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import adapter from '@sveltejs/adapter-vercel'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true },
			},
			adapter: adapter({ runtime: 'nodejs24.x' }),
			experimental: { remoteFunctions: true },
		}),
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					setupFiles: ['./src/vitest-setup-client.ts'],
					browser: {
						enabled: true,
						// Animations are turned off, so a component settles in the frame it changes in and
						// nothing has to be waited out.
						provider: playwright({ contextOptions: { reducedMotion: 'reduce' } }),
						instances: [
							{ browser: 'chromium', headless: true, viewport: { width: 1024, height: 900 } },
						],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
	},
})
