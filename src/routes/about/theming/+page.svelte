<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemeGenerator from '../../ThemeGenerator.svelte'
</script>

<svelte:head>
	<title>Theming - Noph UI</title>
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

<h3 id="generating-a-scheme-in-code">
	Generating a scheme in code<a href="#generating-a-scheme-in-code" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<p>
	The generator is roughly twenty lines on top of
	<a
		class="link"
		href="https://github.com/deminearchiver/material-color-utilities-typescript"
		target="_blank"
	>
		material-color-utilities
	</a>. Install it as a dev dependency. It produces CSS, so it never reaches your users and Noph UI
	stays free of runtime dependencies.
</p>
<Code value="npm install -D @materialx/material-color-utilities" />
<p>
	Build one scheme per color scheme from the same source color, then write both hex values into a
	<code>light-dark()</code> pair. Role names map to tokens by turning camel case into dashes, so
	<code>onPrimaryContainer</code> becomes <code>--np-color-on-primary-container</code>.
</p>
<Code
	value={`import {
	argbFromHex,
	DynamicScheme,
	Hct,
	hexFromArgb,
	SpecVersion,
	Variant,
} from '@materialx/material-color-utilities'

const options = {
	sourceColorHct: Hct.fromInt(argbFromHex('#5fb9e9')),
	variant: Variant.CONTENT,
	specVersion: SpecVersion.SPEC_2025,
	contrastLevel: 0,
}

const light = DynamicScheme.from({ ...options, isDark: false })
const dark = DynamicScheme.from({ ...options, isDark: true })

const token = (role) => '--np-color-' + role.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const declarations = ['primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer'].map(
	(role) =>
		token(role) + ': light-dark(' + hexFromArgb(light[role]) + ', ' + hexFromArgb(dark[role]) + ');',
)

console.log(':root {\\n\\t' + declarations.join('\\n\\t') + '\\n}')`}
/>
<p>
	Write the result to a CSS file and import it instead of <code>noph-ui/defaultTheme</code>, or set
	the properties on <code>document.documentElement</code> to switch themes without a reload.
</p>

<h3 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	The variant decides how far the palette travels from the source color. Try each one in the
	generator above, the differences are easier to see than to describe.
</p>
<table>
	<thead>
		<tr><th>Variant</th><th>Character</th></tr>
	</thead>
	<tbody>
		<tr
			><td><code>CONTENT</code></td><td>Keeps the source color itself, good for brand colors</td
			></tr
		>
		<tr
			><td><code>FIDELITY</code></td><td>Like content, with tighter fidelity to the source hue</td
			></tr
		>
		<tr><td><code>TONAL_SPOT</code></td><td>The classic Material You look, moderate chroma</td></tr>
		<tr><td><code>VIBRANT</code></td><td>High chroma accents around the source hue</td></tr>
		<tr
			><td><code>EXPRESSIVE</code></td><td>Shifts hue away from the source for a playful palette</td
			></tr
		>
		<tr><td><code>NEUTRAL</code></td><td>Barely colorful, close to grey</td></tr>
		<tr><td><code>MONOCHROME</code></td><td>Greyscale, no chroma at all</td></tr>
		<tr><td><code>RAINBOW</code></td><td>Neutral surfaces with colorful accents</td></tr>
		<tr
			><td><code>FRUIT_SALAD</code></td><td
				>Hue shifted primary and secondary, the loudest option</td
			></tr
		>
	</tbody>
</table>

<h3 id="contrast">Contrast<a href="#contrast" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>contrastLevel</code> runs from <code>-1</code> to <code>1</code>. Zero is the design as
	specified, one is maximum contrast, minus one the lowest. Raising it is the quickest way to meet a
	stricter contrast requirement without picking new colors by hand.
</p>

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

<h2 id="color-roles">Color roles<a href="#color-roles" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Roles come in families. Every accent family has a base color, an <code>on-</code> color for
	content drawn on top of it, a container variant and an <code>on-</code> color for that container. The
	generator above lists all 54 with the values your current settings produce.
</p>
<table>
	<thead>
		<tr><th>Family</th><th>What it is for</th></tr>
	</thead>
	<tbody>
		<tr><td>Primary</td><td>The main action and anything that should read as branded</td></tr>
		<tr><td>Secondary</td><td>Supporting components that should stay quieter than primary</td></tr>
		<tr><td>Tertiary</td><td>Accents that need to contrast with primary</td></tr>
		<tr><td>Error</td><td>Validation, destructive actions</td></tr>
		<tr
			><td>Surface</td><td
				>Backgrounds, from <code>surface-container-lowest</code> up to <code>highest</code></td
			></tr
		>
		<tr
			><td>Outline</td><td
				>Borders and dividers, <code>outline-variant</code> for the subtle ones</td
			></tr
		>
		<tr><td>Inverse</td><td>Inverted surfaces such as snackbars and value labels</td></tr>
		<tr><td>Fixed</td><td>Colors that keep the same value in both schemes</td></tr>
		<tr
			><td>Palette key colors</td><td>The key color of each tonal palette, useful for tooling</td
			></tr
		>
		<tr
			><td>Utility</td><td
				><code>background</code>, <code>shadow</code>, <code>scrim</code> and
				<code>surface-tint</code></td
			></tr
		>
	</tbody>
</table>

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
	<Button variant="filled">Default</Button>
	<Button
		variant="filled"
		--np-filled-button-container-color="var(--np-color-tertiary)"
		--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
	>
		Tertiary
	</Button>
	<Button variant="filled" shape="square" --np-button-shape="var(--np-shape-corner-extra-small)">
		Square
	</Button>
</DemoContainer>
<Code
	value={`<Button variant="filled">Default</Button>
<Button
	variant="filled"
	--np-filled-button-container-color="var(--np-color-tertiary)"
	--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
>
	Tertiary
</Button>
<Button variant="filled" shape="square" --np-button-shape="var(--np-shape-corner-extra-small)">
	Square
</Button>`}
/>
<p>
	Read the token a component documents before you set it. <code>--np-button-shape</code> holds the
	corner radius of the <em>square</em> button shape, so it only takes effect together with
	<code>shape="square"</code>. A round button is a pill, and its radius follows its height.
</p>
<p>
	Point these at theme tokens rather than raw hex values and your overrides keep working when the
	theme changes. Each component page lists the properties it understands in its own Theming section.
</p>
