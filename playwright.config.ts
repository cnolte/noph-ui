import { defineConfig } from '@playwright/test'

export default defineConfig({
	webServer: { command: 'npm run build && npm run preview', port: 4173 },
	// End to end tests live next to the page they drive.
	testDir: 'src/routes',
	testMatch: '**/*.e2e.{ts,js}',
})
