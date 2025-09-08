import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'firefox',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			use: { ...devices['Desktop Safari'] },
		},
	],
}

export default config
