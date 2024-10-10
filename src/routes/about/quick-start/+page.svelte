<script>
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Quick Start - Noph UI</title>
</svelte:head>

<h1>Quick Start</h1>
<h2>Install</h2>
<p>Install Noph UI components using npm and node.</p>
<Code value={`npm install noph-ui`} />
<h2>Tailwind CSS</h2>
<p>
	Noph UI requires Tailwind CSS. You need to add Noph UI to your tailwind.config.js file as follows:
</p>
<Code
	value={`export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/noph-ui/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: []
}`}
/>
<h2>Theme</h2>
<p>
	If it doesn't already exist, create a file named app.css in your root directory and add the
	following CSS class to it. Then, import this file into your +layout.svelte file.
</p>
<Code
	value={`:root {
	--np-color-background: #f7fafe;
	--np-color-error: #ba1a1a;
	--np-color-error-container: #ffdad6;
	--np-color-inverse-on-surface: #eef1f5;
	--np-color-inverse-primary: #7dd0ff;
	--np-color-inverse-surface: #2d3134;
	--np-color-neutral-palette-key-color: #73777b;
	--np-color-neutral-variant-palette-key-color: #6f787f;
	--np-color-on-background: #181c1f;
	--np-color-on-error: #ffffff;
	--np-color-on-error-container: #93000a;
	--np-color-on-primary: #ffffff;
	--np-color-on-primary-container: #004863;
	--np-color-on-primary-fixed: #001e2c;
	--np-color-on-primary-fixed-variant: #004c69;
	--np-color-on-secondary: #ffffff;
	--np-color-on-secondary-container: #4a687b;
	--np-color-on-secondary-fixed: #001e2c;
	--np-color-on-secondary-fixed-variant: #2c4a5c;
	--np-color-on-surface: #181c1f;
	--np-color-on-surface-variant: #3f484e;
	--np-color-on-tertiary: #f7fafe;
	--np-color-on-tertiary-container: #5d2e73;
	--np-color-on-tertiary-fixed: #310048;
	--np-color-on-tertiary-fixed-variant: #623377;
	--np-color-outline: #6f787f;
	--np-color-outline-variant: #bec8cf;
	--np-color-primary: #00658b;
	--np-color-primary-container: #5fb9e9;
	--np-color-primary-fixed: #c4e7ff;
	--np-color-primary-fixed-dim: #7dd0ff;
	--np-color-primary-palette-key-color: #0980ad;
	--np-color-scrim: #000000;
	--np-color-secondary: #446274;
	--np-color-secondary-container: #c7e7fd;
	--np-color-secondary-fixed: #c7e7fd;
	--np-color-secondary-fixed-dim: #abcbe0;
	--np-color-secondary-palette-key-color: #5d7b8e;
	--np-color-shadow: #000000;
	--np-color-surface: #f7fafe;
	--np-color-surface-bright: #f7fafe;
	--np-color-surface-container: #ebeef2;
	--np-color-surface-container-high: #e5e8ec;
	--np-color-surface-container-highest: #e0e3e7;
	--np-color-surface-container-low: #f1f4f8;
	--np-color-surface-container-lowest: #ffffff;
	--np-color-surface-dim: #d7dade;
	--np-color-surface-tint: #00658b;
	--np-color-surface-variant: #dae4ec;
	--np-color-tertiary: #7b4b91;
	--np-color-tertiary-container: #d29be8;
	--np-color-tertiary-fixed: #f7d8ff;
	--np-color-tertiary-fixed-dim: #eab2ff;
	--np-color-tertiary-palette-key-color: #d29be8;
	--np-elevation-1: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
	--np-elevation-2: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
	--np-elevation-3: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
	--np-shape-corner-full: 9999px;
}`}
/>
