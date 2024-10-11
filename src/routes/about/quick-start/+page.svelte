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
<h2>Color</h2>
<p>
	The quickest way to get started with Noph UI is by using the default theme. You can import it into
	your <code>+layout.svelte</code> file as shown below:
</p>
<Code value={`import 'noph-ui/defaultTheme'`} />
<p class="spacer">
	The theme includes color schemes for both dark and light modes. The selected theme is
	automatically determined based on the user's system settings. Alternatively, you can enforce a
	specific theme by setting the <code>data-theme</code> attribute in your <code>app.html</code>.
	Valid values for this attribute are <code>dark</code> and <code>light</code>.
</p>
<Code value={`<html lang="en" data-theme="dark">`} />

<h2>Typography</h2>
<p>
	Define a font family in your <code>app.css</code>. You can load the default 'Roboto' font, for
	example, from fonts.google.com.
</p>
<Code
	value={`body {
	font-family: 'Roboto';
	...
}`}
/>

<style>
	.spacer {
		margin-top: 2rem;
	}
</style>
