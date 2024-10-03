<script>
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Quick Start - Noph UI</title>
</svelte:head>

<div class="paper">
	<h1>Quick Start</h1>
	<h2>Install</h2>
	<p>Install Noph UI components using npm and node.</p>
	<Code value={`npm install noph-ui`} />
	<h2>Tailwind CSS</h2>
	<p>
		Noph UI requires Tailwind CSS. You need to add Noph UI to your tailwind.config.js file as
		follows:
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
	--np-background-color: rgb(235, 238, 242);
	--np-paper-background-color: rgb(244, 248, 251);
	--np-text-color: rgb(24, 28, 31);
	--np-text-color-secondary: rgb(82 82 82);
	--np-color-primary: rgb(4, 102, 138);
	--np-color-success: rgb(2, 183, 139);
	--np-color-error: rgb(228, 56, 52);
	--np-divider-color: rgb(190, 200, 208);
	--np-selected-button-background-color: rgb(223, 227, 231);
	--np-disabled-color: rgb(144, 146, 148);
	--np-disabled-background-color: rgb(224, 225, 226);
	--np-elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.6), 0 0px 0px -1px rgb(0 0 0 / 0.6);
	--np-elevation-2: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
		0px 1px 5px 0px rgba(0, 0, 0, 0.12);
	--np-ripple-color: var(--np-color-primary);
}`}
	/>
</div>
