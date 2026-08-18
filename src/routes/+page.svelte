<script lang="ts">
	import { resolve } from '$app/paths'
	import Button from '#lib/button/Button.svelte'
	import BrightnessMediumIcon from '#lib/icons/BrightnessMediumIcon.svelte'
	import DownloadIcon from '#lib/icons/DownloadIcon.svelte'
	import GroupsIcon from '#lib/icons/GroupsIcon.svelte'
	import LanguageIcon from '#lib/icons/LanguageIcon.svelte'
	import PaletteIcon from '#lib/icons/PaletteIcon.svelte'
	import SportsGymnasticsIcon from '#lib/icons/SportsGymnasticsIcon.svelte'
	import Code from './Code.svelte'
	import LandingShowcase from './LandingShowcase.svelte'
	import Logo from './Logo.svelte'
	import MorphShape from './MorphShape.svelte'

	const swatches = [
		{ name: 'Primary', token: '--np-color-primary', on: '--np-color-on-primary' },
		{
			name: 'Primary container',
			token: '--np-color-primary-container',
			on: '--np-color-on-primary-container',
		},
		{
			name: 'Secondary container',
			token: '--np-color-secondary-container',
			on: '--np-color-on-secondary-container',
		},
		{ name: 'Tertiary', token: '--np-color-tertiary', on: '--np-color-on-tertiary' },
		{
			name: 'Tertiary container',
			token: '--np-color-tertiary-container',
			on: '--np-color-on-tertiary-container',
		},
		{
			name: 'Surface variant',
			token: '--np-color-surface-variant',
			on: '--np-color-on-surface-variant',
		},
		{ name: 'Error', token: '--np-color-error', on: '--np-color-on-error' },
		{ name: 'Surface', token: '--np-color-surface-container-highest', on: '--np-color-on-surface' },
	]
</script>

<svelte:head>
	<title>Noph UI - The Ultimate Material 3 Expressive UI Library for Svelte</title>
	<link rel="canonical" href="https://noph.dev/" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://noph.dev/" />
	<meta property="og:title" content="Noph UI - Material 3 Expressive components for Svelte" />
	<meta
		property="og:description"
		content="Material 3 Expressive components for Svelte. Dynamic theming from a single color, zero dependencies, 27 components."
	/>
	<meta name="twitter:card" content="summary" />
</svelte:head>

<section class="hero">
	<div class="glow" aria-hidden="true"></div>
	<div class="hero-copy">
		<h1 class="header">Noph UI</h1>
		<p class="sub-header">Material 3 Expressive components for Svelte</p>
		<p class="hero-text">
			Themed from a single color, shipped without a single runtime dependency, and server rendered
			from the first byte.
		</p>
		<div class="hero-actions">
			<Button
				variant="filled"
				size="m"
				href={resolve('/about/quick-start')}
				--np-filled-button-container-color="var(--np-color-on-primary-container)"
				--np-filled-button-label-text-color="var(--np-color-primary-container)"
			>
				Get started
			</Button>
			<Button
				variant="outlined"
				size="m"
				href={resolve('/components/button')}
				--np-outlined-button-label-text-color="var(--np-color-on-primary-container)"
				--np-outlined-button-outline-color="var(--np-color-on-primary-container)"
			>
				Browse components
			</Button>
		</div>
	</div>
	<div class="hero-art" aria-hidden="true">
		<MorphShape class="art back" duration={34} offset={5} scale={0.98} />
		<MorphShape class="art mid" duration={26} offset={2} scale={0.9} />
		<MorphShape class="art front" duration={21} scale={0.82} />
		<div class="art-logo"><Logo /></div>
	</div>
	<dl class="stats">
		<div>
			<dt>27</dt>
			<dd>components</dd>
		</div>
		<div>
			<dt>0</dt>
			<dd>dependencies</dd>
		</div>
		<div>
			<dt>SVELTE</dt>
			<dd>5.40+</dd>
		</div>
		<div>
			<dt>MIT</dt>
			<dd>license</dd>
		</div>
	</dl>
</section>

<h2>Real components, right here</h2>
<p>Server rendered, then hydrated. Click, drag and type in it.</p>
<LandingShowcase />

<p class="lead">
	Noph UI is a UI library for Svelte that follows the Material 3 Expressive guidelines. It gives you
	the buttons, fields, navigation and feedback components a real app needs, with theming, dark mode
	and accessibility already handled.
</p>

<h2>Why Noph UI</h2>
<div class="features">
	<article class="feature">
		<div class="feature-icon"><LanguageIcon /></div>
		<h3>Server side rendering</h3>
		<p>
			Components render to HTML on the server, so the first paint does not wait for JavaScript. Good
			for load times, good for search engines.
		</p>
	</article>
	<article class="feature">
		<div class="feature-icon"><PaletteIcon /></div>
		<h3>Dynamic theming</h3>
		<p>
			Material 3 color roles are plain CSS variables. Pick a source color and every component
			follows, at runtime if you want.
		</p>
	</article>
	<article class="feature">
		<div class="feature-icon"><DownloadIcon /></div>
		<h3>Zero dependencies</h3>
		<p>
			One package, nothing else pulled in behind your back. Your users download components, not a
			framework on top of a framework.
		</p>
	</article>
	<article class="feature">
		<div class="feature-icon"><SportsGymnasticsIcon /></div>
		<h3>Expressive motion</h3>
		<p>
			Springy shape morphs, ripples and wavy progress from the Material 3 Expressive spec. All of it
			steps aside when a visitor prefers reduced motion.
		</p>
	</article>
	<article class="feature">
		<div class="feature-icon"><GroupsIcon /></div>
		<h3>Accessible by default</h3>
		<p>
			Components build on native elements, so roles, labels, keyboard navigation and focus rings
			come with them.
		</p>
	</article>
	<article class="feature">
		<div class="feature-icon"><BrightnessMediumIcon /></div>
		<h3>Light and dark</h3>
		<p>
			The default theme ships both color schemes and follows the system setting, or whatever setting
			you put in charge.
		</p>
	</article>
</div>

<h2>One color, a whole theme</h2>
<p>
	The default theme is a set of Material 3 color roles written as CSS variables. Use the palette
	button in the header to pick a source color and watch this page recolor, then copy the generated
	theme straight into your project.
</p>
<div class="swatches">
	{#each swatches as swatch (swatch.token)}
		<div class="swatch" style="background-color: var({swatch.token}); color: var({swatch.on})">
			<span class="swatch-name">{swatch.name}</span>
			<span class="swatch-token">{swatch.token}</span>
		</div>
	{/each}
</div>

<h2>Start in two minutes</h2>
<Code value="npm install noph-ui" />
<p>Import the default theme once, in your root layout.</p>
<Code value="import 'noph-ui/defaultTheme'" />
<p>Then import a component and drop it into your markup.</p>
<!-- eslint-disable no-useless-escape -- the backslash keeps this from closing the script block it is written inside of -->
<Code
	value={`<script>
	import { Button } from 'noph-ui'
<\/script>

<Button variant="filled">Get started</Button>`}
/>
<!-- eslint-enable no-useless-escape -->
<p>
	The <a class="link" href={resolve('/about/quick-start')}>quick start</a> covers theming, dark mode and
	typography in a few more lines.
</p>

<section class="closing">
	<MorphShape class="closing-art" duration={30} offset={3} />
	<div>
		<h2>Build something expressive</h2>
		<p>
			Install the package, import the theme and ship a Material 3 interface that renders on the
			server and feels alive in the browser.
		</p>
		<div class="hero-actions">
			<Button
				variant="filled"
				size="m"
				href={resolve('/about/quick-start')}
				--np-filled-button-container-color="var(--np-color-on-primary-container)"
				--np-filled-button-label-text-color="var(--np-color-primary-container)"
			>
				Get started
			</Button>
			<Button
				variant="text"
				size="m"
				href="https://github.com/cnolte/noph-ui"
				target="_blank"
				rel="noreferrer"
				--np-text-button-label-text-color="var(--np-color-on-primary-container)"
			>
				View on GitHub
			</Button>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		position: relative;
		overflow: clip;
		isolation: isolate;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		mask-image: radial-gradient(white, black);
		display: grid;
		gap: 2rem;
		box-sizing: border-box;
		margin: 1rem 0 1.5rem 0;
		padding: 3rem 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		color: var(--np-color-on-primary-container);
		background: linear-gradient(
			140deg,
			var(--np-color-primary-container),
			var(--np-color-tertiary-container)
		);
	}
	.glow {
		position: absolute;
		inset: -25%;
		z-index: -1;
		opacity: 0.5;
		filter: blur(60px);
		background:
			radial-gradient(35% 35% at 20% 30%, var(--np-color-primary-fixed) 0%, transparent 100%),
			radial-gradient(40% 40% at 80% 70%, var(--np-color-tertiary-fixed) 0%, transparent 100%);
	}
	.header {
		margin: 0.5rem 0 0 0;
		line-height: 1;
		letter-spacing: -0.03em;
	}
	.sub-header {
		margin: 1.5rem 0 0 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 300;
	}
	.hero-text {
		margin: 1rem 0 0 0;
		max-width: 32rem;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
	}
	.hero-art {
		position: relative;
		justify-self: center;
		width: min(20rem, 70vw);
		aspect-ratio: 1;
	}
	.hero-art :global(.art) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.hero-art :global(.back) {
		color: var(--np-color-tertiary-fixed-dim);
		opacity: 0.75;
		--morph-turn: 150s;
	}
	.hero-art :global(.mid) {
		color: var(--np-color-primary-fixed);
		--morph-turn: 110s;
	}
	.hero-art :global(.front) {
		color: var(--np-color-secondary-fixed);
		--morph-turn: 90s;
	}
	.art-logo {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: var(--np-color-on-primary-fixed);
	}
	.art-logo :global(svg) {
		width: 5rem;
		height: 5rem;
	}
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 2.5rem;
		margin: 0;
	}
	.stats dt {
		font-size: 2rem;
		font-weight: 500;
		line-height: 1.1;
	}
	.stats dd {
		margin: 0;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.lead {
		font-size: 1.25rem;
		margin-top: 3rem;
	}

	/* Features */
	.features {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		margin: 2rem 0;
	}
	.feature {
		box-sizing: border-box;
		padding: 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		background-color: var(--np-color-surface-container-low);
		border: 1px solid var(--np-color-outline-variant);
	}
	.feature h3 {
		margin: 1rem 0 0.5rem 0;
		font-size: 1.25rem;
	}
	.feature p {
		margin: 0;
		font-size: 1rem;
		color: var(--np-color-on-surface-variant);
	}
	.feature-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--np-shape-corner-large);
		color: var(--np-color-on-primary-container);
		background-color: var(--np-color-primary-container);
	}
	.feature-icon :global(svg) {
		width: 1.75rem;
		height: 1.75rem;
		fill: currentColor;
	}

	/* Theming */
	.swatches {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		margin: 2rem 0;
	}
	.swatch {
		display: grid;
		gap: 0.25rem;
		padding: 1rem;
		border-radius: var(--np-shape-corner-large);
		min-height: 4.5rem;
		align-content: end;
	}
	.swatch-name {
		font-size: 1rem;
		font-weight: 500;
	}
	.swatch-token {
		font-size: 0.75rem;
		opacity: 0.85;
	}

	/* Closing panel */
	.closing {
		position: relative;
		overflow: clip;
		margin-top: 4rem;
		padding: 3rem 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		color: var(--np-color-on-primary-container);
		background: linear-gradient(
			120deg,
			var(--np-color-tertiary-container),
			var(--np-color-primary-container) 70%
		);
	}
	.closing h2 {
		margin-top: 0;
	}
	.closing :global(.closing-art) {
		position: absolute;
		inset-inline-end: -6rem;
		inset-block-start: -6rem;
		width: 20rem;
		height: 20rem;
		color: var(--np-color-tertiary-fixed);
		opacity: 0.55;
	}
	.closing > div {
		position: relative;
	}

	@media (min-width: 768px) {
		.hero {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
			align-items: center;
			padding: 4rem 3rem;
			margin-bottom: 2rem;
		}
		.header {
			font-size: 6rem;
		}
		.sub-header {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
		.stats {
			grid-column: 1 / -1;
			padding-top: 1rem;
		}
		.closing {
			padding: 4rem 3rem;
		}
		.closing > div {
			max-width: 34rem;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-copy > *,
		.hero-art,
		.stats {
			animation: rise var(--np-motion-expressive-slow-spatial) backwards;
		}
		.hero-copy > :nth-child(2) {
			animation-delay: 60ms;
		}
		.hero-copy > :nth-child(3) {
			animation-delay: 120ms;
		}
		.hero-copy > :nth-child(4) {
			animation-delay: 180ms;
		}
		.hero-copy > :nth-child(5) {
			animation-delay: 240ms;
		}
		.hero-art {
			animation-delay: 120ms;
		}
		.stats {
			animation-delay: 300ms;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(1.5rem);
		}
	}
</style>
