<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemeGenerator from '../../ThemeGenerator.svelte'
	import ComponentOverride from './demos/ComponentOverride.svelte'
	import ComponentOverrideSource from './demos/ComponentOverride.svelte?raw'
</script>

<svelte:head>
	<title>Theming - Material 3 color roles for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Theme Material 3 components in Svelte from one source color. Every color, shape, motion and elevation role is a CSS custom property you can change at runtime."
	/>
</svelte:head>

<h1>Theming</h1>
<p>
	Every color, corner, easing curve and shadow in Noph UI comes from a CSS custom property.
	Components never hard code a value, so a theme is nothing more than a set of variables you own.
	Change one and every component that reads it follows, at build time or while the page is running.
</p>

<h2 id="how-the-theme-works">
	How the theme works<a href="#how-the-theme-works" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A theme declares 54 color roles on <code>:root</code>. Each one holds both schemes at once, in a
	<code>light-dark()</code>
	pair, and <code>color-scheme: light dark</code> tells the browser it may pick either.
</p>
<Code
	value={`:root {
	color-scheme: light dark;
	--np-color-primary: light-dark(#00668c, #75ceff);
	--np-color-on-primary: light-dark(#f4f9ff, #00435d);
	--np-color-primary-container: light-dark(#75ceff, #4eaad9);
	--np-color-on-primary-container: light-dark(#00435d, #002637);
}`}
/>
<p>
	The same file also carries the shape, motion and elevation tokens, which are listed further down.
	Because it is plain CSS, you can ship it as a stylesheet, inline it, or overwrite single values
	from a component.
</p>

<h2 id="using-the-default-theme">
	Using the default theme<a href="#using-the-default-theme" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>Import the default theme once, in your root layout.</p>
<Code value="import 'noph-ui/defaultTheme'" />
<p>Then hand the page background and text color to the theme.</p>
<Code
	value={`body {
	background-color: var(--np-color-background);
	color: var(--np-color-on-background);
}`}
/>
<p>
	The default theme is the source color <code>#5fb9e9</code> run through the Content variant on the 2025
	spec with no contrast adjustment. That is why the generator below starts out matching the shipped file
	exactly, token for token.
</p>

<h2 id="generate-your-own-theme">
	Generate your own theme<a href="#generate-your-own-theme" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Pick a source color and Noph UI derives all 54 roles for both schemes. Every change here applies
	to this page right away, so you can judge a palette on real components instead of swatches.
	<strong>Copy CSS</strong> puts a complete replacement for the default theme on your clipboard.
	<strong>Reset</strong> brings back the shipped theme.
</p>
<ThemeGenerator />

<h3 id="spec-versions">
	Spec versions<a href="#spec-versions" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	<code>SPEC_2021</code> is the original Material 3 color system. <code>SPEC_2025</code> is the Material
	3 Expressive revision, with brighter containers and different surface tones, and it is what the default
	theme uses.
</p>

<h2 id="light-and-dark-color-schemes">
	Light and dark color schemes<a
		href="#light-and-dark-color-schemes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h2>
<p>
	Because every token is a <code>light-dark()</code> pair, the browser follows the operating system setting
	on its own. No JavaScript, no class toggling.
</p>
<p>
	To force one scheme, set <code>data-theme</code> on the <code>html</code> element. Valid values
	are
	<code>light</code> and <code>dark</code>.
</p>
<Code value="<html lang=&quot;en&quot; data-theme=&quot;dark&quot;>" />
<p>
	If visitors get to choose, store the choice and set the attribute in an inline
	<code>&lt;script&gt;</code> in the <code>&lt;head&gt;</code> of your <code>app.html</code>, before
	the page paints. That avoids a flash of the wrong scheme.
</p>
<Code
	value={`const stored = localStorage.getItem('theme')
if (stored === 'light' || stored === 'dark') {
	document.documentElement.setAttribute('data-theme', stored)
}`}
/>

<h2 id="applying-a-theme-at-runtime">
	Applying a theme at runtime<a href="#applying-a-theme-at-runtime" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	Setting the custom properties on the root element beats swapping stylesheets, since only the
	changed values repaint. This is exactly what the generator above does.
</p>
<Code
	value={`const setTheme = (tokens) => {
	for (const [token, value] of Object.entries(tokens)) {
		document.documentElement.style.setProperty(token, value)
	}
}

setTheme({ '--np-color-primary': 'light-dark(#00668c, #75ceff)' })`}
/>
<p>
	Call <code>removeProperty</code> with the same token names to fall back to the stylesheet again.
</p>

<h2 id="shape-tokens">
	Shape tokens<a href="#shape-tokens" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>Corner radii are shared by every component, so rounding stays consistent across the app.</p>
<table>
	<thead>
		<tr><th>Token</th><th>Value</th></tr>
	</thead>
	<tbody>
		<tr><td><code>--np-shape-corner-none</code></td><td>0</td></tr>
		<tr><td><code>--np-shape-corner-extra-small</code></td><td>0.25rem</td></tr>
		<tr><td><code>--np-shape-corner-small</code></td><td>0.5rem</td></tr>
		<tr><td><code>--np-shape-corner-medium</code></td><td>0.75rem</td></tr>
		<tr><td><code>--np-shape-corner-large</code></td><td>1rem</td></tr>
		<tr><td><code>--np-shape-corner-extra-large</code></td><td>1.75rem</td></tr>
		<tr><td><code>--np-shape-corner-full</code></td><td>9999px</td></tr>
	</tbody>
</table>

<h2 id="motion-tokens">
	Motion tokens<a href="#motion-tokens" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Motion tokens pair a duration with an easing curve. <strong>Spatial</strong> tokens move things,
	<strong>effects</strong> tokens change color and opacity. The <strong>expressive</strong> curves
	overshoot slightly and settle, the <strong>standard</strong> curves do not.
</p>
<table>
	<thead>
		<tr><th>Token</th><th>Duration</th></tr>
	</thead>
	<tbody>
		<tr><td><code>--np-motion-expressive-fast-spatial</code></td><td>350ms</td></tr>
		<tr><td><code>--np-motion-expressive-default-spatial</code></td><td>500ms</td></tr>
		<tr><td><code>--np-motion-expressive-slow-spatial</code></td><td>650ms</td></tr>
		<tr><td><code>--np-motion-expressive-fast-effects</code></td><td>150ms</td></tr>
		<tr><td><code>--np-motion-expressive-default-effects</code></td><td>200ms</td></tr>
		<tr><td><code>--np-motion-expressive-slow-effects</code></td><td>300ms</td></tr>
		<tr><td><code>--np-motion-standard-fast-spatial</code></td><td>350ms</td></tr>
		<tr><td><code>--np-motion-standard-default-spatial</code></td><td>500ms</td></tr>
		<tr><td><code>--np-motion-standard-slow-spatial</code></td><td>750ms</td></tr>
		<tr><td><code>--np-motion-standard-fast-effects</code></td><td>150ms</td></tr>
		<tr><td><code>--np-motion-standard-default-effects</code></td><td>200ms</td></tr>
		<tr><td><code>--np-motion-standard-slow-effects</code></td><td>300ms</td></tr>
	</tbody>
</table>
<Code value="transition: background-color var(--np-motion-expressive-default-effects);" />

<h2 id="elevation-tokens">
	Elevation tokens<a href="#elevation-tokens" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Three layered shadows, from the lightest lift to the most pronounced. Cards, menus and dialogs use
	them, and so can you.
</p>
<Code
	value={`box-shadow: var(--np-elevation-1);
box-shadow: var(--np-elevation-2);
box-shadow: var(--np-elevation-3);`}
/>

<h2 id="overriding-a-single-component">
	Overriding a single component<a
		href="#overriding-a-single-component"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h2>
<p>
	Components expose their own properties, named
	<code>--np-&lt;component&gt;-&lt;part&gt;-&lt;role&gt;</code>. Set one as a style prop to restyle
	a single instance, or on any ancestor to restyle a whole region.
</p>
<DemoContainer>
	<ComponentOverride />
</DemoContainer>
<Code value={ComponentOverrideSource} />
