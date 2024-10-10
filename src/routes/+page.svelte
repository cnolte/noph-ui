<script>
	import Button from '$lib/button/Button.svelte'
</script>

<svelte:head>
	<title>Noph UI - Material 3 for Svelte 5</title>
</svelte:head>

<div class="hero grid rounded-3xl px-6 py-16 text-center md:px-24">
	<h1 class="text-5xl md:text-8xl">Noph UI</h1>
	<p class="my-12 text-2xl font-light md:text-4xl">Material 3 for Svelte 5</p>
	<Button variant="elevated" size="large" href="/about/quick-start" style="width:fit-content"
		>Get started</Button
	>
</div>

<style>
	.hero {
		place-items: center;
		color: var(--np-color-on-primary-container);
		background: linear-gradient(
			to bottom,
			var(--np-color-primary-container),
			var(--np-color-tertiary-container)
		);
	}
</style>
