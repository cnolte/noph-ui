<script>
	import Button from '$lib/button/Button.svelte'
</script>

<svelte:head>
	<title>Noph UI - Material 3 for Svelte 5</title>
</svelte:head>

<div class="hero">
	<h1 class="header">Noph UI</h1>
	<p class="sub-header">Material 3 for Svelte 5</p>
	<Button variant="elevated" size="large" href="/about/quick-start" style="width:fit-content"
		>Get started</Button
	>
</div>

<style>
	.header {
		font-size: 3rem;
		line-height: 1;
		font-weight: 500;
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
		border-radius: 1.5rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 4rem;
		padding-bottom: 4rem;
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
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
