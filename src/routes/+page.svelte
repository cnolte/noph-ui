<script lang="ts">
	import { resolve } from '$app/paths'
	import Button from '$lib/button/Button.svelte'
</script>

<svelte:head>
	<title>Noph UI - The Ultimate Material 3 UI Library for Svelte 5</title>
</svelte:head>

<div class="hero">
	<h1 class="header">Noph UI</h1>
	<div class="sub-header">The Ultimate Material 3 UI Library for Svelte 5</div>
	<Button variant="elevated" size="m" href={resolve('/about/quick-start')}>Get started</Button>
</div>

<p>
	Noph UI is a modern, powerful UI library for Svelte 5, fully aligned with the Material 3
	guidelines. Build stunning, consistent user interfaces with the efficiency and flexibility of
	Svelte and Google’s Material Design framework.
</p>

<h2>Why Noph UI?</h2>
<p>Noph UI provides everything you need for your Svelte projects:</p>
<ul>
	<li>
		Server-Side Rendering (SSR): Optimize your Svelte applications' performance for fast load times
		and SEO benefits.
	</li>
	<li>
		Dynamic Theming: Seamlessly customize your applications with flexible and user-defined themes.
		Noph UI supports dynamic color schemes based on the Material 3 guidelines.
	</li>
	<li>Zero Dependencies: No unnecessary dependencies – lightweight and fast.</li>
</ul>

<h2>Benefits of Noph UI for Svelte Developers:</h2>
<ul>
	<li>
		Optimized for Svelte 5: Develop with the latest version of Svelte and leverage all the
		advantages of this reactive framework.
	</li>
	<li>
		Material 3 Design: Create modern, intuitive interfaces based on Google’s latest Material 3
		specifications.
	</li>
	<li>No Dependencies: Keep your code lean and avoid unnecessary libraries or plugins.</li>
	<li>
		Powerful Theming: Noph UI offers extensive customization options for unique visual designs.
	</li>
</ul>

<h2>Who is Noph UI for?</h2>
<p>
	Noph UI is perfect for developers working with Svelte who want to use a proven and modern design
	system like Material 3. Whether you're building a simple web app or a complex application, Noph UI
	gives you the tools you need.
</p>

<p>
	<a class="link" href={resolve('/about/quick-start')}>Get Started Now!</a> Build lightning-fast, customizable,
	and visually appealing Svelte applications with Noph UI and take advantage of modern Material Design.
</p>

<style>
	.header {
		margin: 0;
	}
	.sub-header {
		margin-top: 3rem;
		margin-bottom: 3rem;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 300;
	}
	@media (min-width: 768px) {
		.header {
			font-size: 6rem;
			line-height: 1;
		}
		.sub-header {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
	}

	.hero {
		display: grid;
		border-radius: var(--np-shape-corner-extra-large);
		padding-inline: 1.5rem;
		padding-top: 4rem;
		margin-top: 1rem;
		padding-bottom: 4rem;
		margin-bottom: 4rem;
		text-align: center;
		place-items: center;
		color: var(--np-color-on-primary-container);
		background: linear-gradient(
			to bottom,
			var(--np-color-primary-container),
			var(--np-color-tertiary-container)
		);
	}
	@media (min-width: 768px) {
		.hero {
			margin-top: 2rem;
			padding-inline: 6rem;
		}
	}
</style>
