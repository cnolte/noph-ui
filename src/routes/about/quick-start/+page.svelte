<script>
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Quick start - Material 3 components for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Install Noph UI and get Material 3 components running in a Svelte or SvelteKit app: package, default theme, icon font and a first button."
	/>
</svelte:head>

<h1>Quick start</h1>
<p>
	Noph UI requires <a class="link" href="https://svelte.dev" target="_blank">Svelte</a> 5.56.5 or newer.
	It works with SvelteKit or with a plain Vite + Svelte project.
</p>
<h2 id="install">Install<a href="#install" aria-hidden="true" tabindex="-1">#</a></h2>
<p>Install Noph UI with npm.</p>
<Code value="npm install noph-ui" />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The quickest way to start is the default theme. Import it in your <code>+layout.svelte</code>:
</p>
<Code value="import 'noph-ui/defaultTheme'" />
<p>
	To use the theme's background and text color in the whole app, set them on
	<code>&lt;body&gt;</code> in your app.css:
</p>

<Code
	value={`body {
	background-color: var(--np-color-background);
	color: var(--np-color-on-background);
}`}
/>
<p style="margin-top:1rem">
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
	The theme has a dark and a light color scheme. By default it follows the user's system setting. To
	force one, set the <code>data-theme</code> attribute in your <code>app.html</code> to
	<code>dark</code> or <code>light</code>.
</p>
<Code value="<html lang=&quot;en&quot; data-theme=&quot;dark&quot;>" />

<h2 id="typography">Typography<a href="#typography" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Set a font family in your <code>app.css</code>. For example, load the default 'Roboto' font from
	fonts.google.com.
</p>
<Code
	value={`body {
	font-family: 'Roboto';
	...
}`}
/>

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Buttons, fields and navigation take icons where Material 3 uses them. The <code>Icon</code>
	component draws them from the Material Symbols font. The font is not part of the package, so load it
	in your <code>app.html</code>. Otherwise you see the icon name instead of the icon. Request the
	icons you use from Google Fonts, here <code>search</code> and <code>home</code>:
</p>
<Code
	value={`<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=search,home"
/>`}
/>
<p>
	<a class="link" href="/about/icons">Icons</a> covers the font settings, and how to pass your own SVG
	instead.
</p>

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
