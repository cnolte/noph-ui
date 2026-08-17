/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	semi: false,
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}

export default config
