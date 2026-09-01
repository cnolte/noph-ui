<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'

	const photos = [
		{ title: 'Convergence', image: '/pollock.avif' },
		{ title: 'Blue Poles', image: '/pollock2.avif' },
		{ title: 'Autumn Rhythm', image: '/pollock3.avif' },
		{ title: 'Number 1A', image: '/pollock.avif' },
		{ title: 'Eyes in the Heat', image: '/pollock2.avif' },
	]

	let opened = $state<string>()
</script>

<div class="shelf">
	<Carousel label="Paintings">
		{#each photos as photo (photo.title)}
			<CarouselItem
				type="button"
				label={photo.title}
				image={photo.image}
				onclick={() => (opened = photo.title)}
			/>
		{/each}
	</Carousel>
	<p>Opened: <code>{opened ?? 'nothing yet'}</code></p>
</div>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 12rem;
	}
</style>
