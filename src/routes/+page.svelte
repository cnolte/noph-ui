<script lang="ts">
	import { resolve } from '$app/paths'
	import Button from '#lib/button/Button.svelte'
	import Card from '#lib/card/Card.svelte'
	import Icon from '#lib/icons/Icon.svelte'
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
		content="Material 3 Expressive components for Svelte. Dynamic theming from a single color, zero dependencies, 36 components."
	/>
	<meta name="twitter:card" content="summary" />
</svelte:head>

<section class="hero">
	<div class="glow" aria-hidden="true"></div>
	<div class="hero-copy">
		<h1 class="header">Noph UI</h1>
		<p class="sub-header">Material 3 Expressive components for Svelte</p>
		<p class="hero-text">
			Themed from a single color, shipped without a single runtime dependency, and built for
			SvelteKit's remote functions.
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
			<dt>36</dt>
			<dd>components</dd>
		</div>
		<div>
			<dt>0</dt>
			<dd>dependencies</dd>
		</div>
	</dl>
</section>

<h2>Real components, right here</h2>
<LandingShowcase />

<p class="lead">
	Noph UI is a UI library for Svelte that follows the Material 3 Expressive guidelines. It gives you
	the buttons, fields, navigation and feedback components a real app needs, with theming, dark mode
	and accessibility already handled.
</p>

<h2>Why Noph UI</h2>
<div class="features">
	<Card
		type="text"
		variant="elevated"
		class="feature"
		headline="Server side rendering"
		supportingText="Components render to HTML on the server, so the first paint does not wait for JavaScript. Good for load times, good for search engines."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>language</Icon></div>
	</Card>
	<Card
		type="link"
		href="/about/remote-functions"
		variant="elevated"
		class="feature"
		headline="Remote functions ready"
		supportingText="Text fields, selects, checkboxes, autocompletes and date pickers take an issues prop shaped exactly like a SvelteKit remote form's validation errors, so they wire straight in without an adapter."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
		--np-outlined-card-container-color="var(--np-color-surface-container-low)"
	>
		<div class="feature-icon"><Icon>webhook</Icon></div>
	</Card>
	<Card
		type="link"
		href="/about/theming#generate-your-own-theme"
		variant="elevated"
		class="feature"
		headline="Dynamic theming"
		supportingText="Material 3 color roles are plain CSS variables. Pick a source color and every component follows, at runtime if you want."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>palette</Icon></div>
	</Card>
	<Card
		type="text"
		variant="elevated"
		class="feature"
		headline="Zero dependencies"
		supportingText="One package, nothing else pulled in behind your back. Your users download components, not a framework on top of a framework."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>download</Icon></div>
	</Card>
	<Card
		type="text"
		variant="elevated"
		class="feature"
		headline="Expressive motion"
		supportingText="Springy shape morphs, ripples and wavy progress from the Material 3 Expressive spec. All of it steps aside when a visitor prefers reduced motion."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>animation</Icon></div>
	</Card>
	<Card
		type="text"
		variant="elevated"
		class="feature"
		headline="Accessible by default"
		supportingText="Components build on native elements, so roles, labels, keyboard navigation and focus rings come with them."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>accessibility_new</Icon></div>
	</Card>
	<Card
		type="link"
		href="/about/theming#light-and-dark-color-schemes"
		variant="elevated"
		class="feature"
		headline="Light and dark"
		supportingText="The default theme ships both color schemes and follows the system setting, or whatever setting you put in charge."
		--np-elevated-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="feature-icon"><Icon>brightness_medium</Icon></div>
	</Card>
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

	.features {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		margin: 2rem 0;
	}

	:global(.feature .np-card-content) {
		margin: 1.5rem;
		min-width: calc(100% - 3rem);
	}
	.feature-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		order: -1;
		border-radius: var(--np-shape-corner-large);
		color: var(--np-color-on-primary-container);
		background-color: var(--np-color-primary-container);
	}
	.feature-icon :global(.np-icon) {
		--np-icon-size: 1.75rem;
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
