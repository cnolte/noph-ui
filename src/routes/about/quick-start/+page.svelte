<script>
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Quick start - Noph UI</title>
</svelte:head>

<h1>Quick start</h1>
<p>
	Noph UI requires <a class="link" href="https://svelte.dev" target="_blank">Svelte</a> 5.40 or newer.
	It works inside SvelteKit or in a plain Vite + Svelte project alike, SvelteKit is not required.
</p>
<h2 id="install">Install<a href="#install" aria-hidden="true" tabindex="-1">#</a></h2>
<p>Install Noph UI components using npm and node.</p>
<Code value="npm install noph-ui" />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The quickest way to get started with Noph UI is by using the default theme. You can import it into
	your <code>+layout.svelte</code> file as shown below:
</p>
<Code value="import 'noph-ui/defaultTheme'" />
<p>
	To apply both the theme's background color and text color to the entire app, you can target the
	<code>&lt;body&gt;</code> element directly in your app.css file like this:
</p>

<Code
	value={`body {
	background-color: var(--np-color-background);
	color: var(--np-color-on-background);
}`}
/>
<p style="margin-top:1rem">
	This will ensure that the background and text color for the entire app are set to match the
	theme's color scheme.
</p>
<p>
	<a class="link" href="/about/theming">Theming</a> goes further: generate a theme from your own source
	color, browse every color, shape and motion token, and switch themes while the app is running.
</p>
<h3 id="dark-and-light-color-schemes">
	Dark and light color schemes<a
		href="#dark-and-light-color-schemes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<p>
	The theme includes color schemes for both dark and light modes. The selected theme is
	automatically determined based on the user's system settings. Alternatively, you can enforce a
	specific theme by setting the <code>data-theme</code> attribute in your <code>app.html</code>.
	Valid values for this attribute are <code>dark</code> and <code>light</code>.
</p>
<Code value="<html lang=&quot;en&quot; data-theme=&quot;dark&quot;>" />

<h2 id="typography">Typography<a href="#typography" aria-hidden="true" tabindex="-1">#</a></h2>
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

<h2 id="put-it-together">
	Put it together<a href="#put-it-together" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>A minimal SvelteKit app with the pieces above wired up.</p>
<p><code>src/routes/+layout.svelte</code></p>
<!-- eslint-disable no-useless-escape -- the escape keeps the closing script tag from ending the surrounding block -->
<Code
	value={`<script>
	import 'noph-ui/defaultTheme'
	import './app.css'

	let { children } = $props()
<\/script>

{@render children()}`}
/>
<!-- eslint-enable no-useless-escape -->
<p>
	<code>app.css</code> is the file from the <a class="link" href="#theming">Theming</a> section
	above, the one that sets <code>background-color</code> and <code>color</code> on
	<code>body</code>.
</p>
<p><code>src/routes/+page.svelte</code></p>
<!-- eslint-disable no-useless-escape -- the escape keeps the closing script tag from ending the surrounding block -->
<Code
	value={`<script>
	import { Button } from 'noph-ui'
<\/script>

<h1>Hello Noph UI</h1>
<Button variant="filled">Get started</Button>`}
/>
<!-- eslint-enable no-useless-escape -->
