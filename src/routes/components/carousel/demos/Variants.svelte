<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'

	const images = ['/pollock.avif', '/pollock2.avif', '/pollock3.avif']
	const plates = Array.from({ length: 7 }, (_, index) => index)

	const clips = [
		{ title: 'Convergence', image: '/pollock.avif', ratio: 16 / 9 },
		{ title: 'Blue Poles', image: '/pollock2.avif', ratio: 1 },
		{ title: 'Autumn Rhythm', image: '/pollock3.avif', ratio: 9 / 16 },
		{ title: 'Number 1A', image: '/pollock.avif', ratio: 4 / 3 },
		{ title: 'Eyes in the Heat', image: '/pollock2.avif', ratio: 1 },
	]
</script>

{#snippet run()}
	{#each plates as index (index)}
		<CarouselItem
			type="button"
			label={`Plate ${index + 1}`}
			image={images[index % images.length]}
		/>
	{/each}
{/snippet}

<figure class="shelf">
	<figcaption><code>multi-browse</code></figcaption>
	<Carousel label="Paintings, multi-browse">{@render run()}</Carousel>
</figure>

<figure class="shelf">
	<figcaption><code>uncontained</code></figcaption>
	<Carousel variant="uncontained" label="Paintings, uncontained">{@render run()}</Carousel>
</figure>

<figure class="shelf aspect">
	<figcaption><code>uncontained</code> with a per-item <code>aspectRatio</code></figcaption>
	<Carousel variant="uncontained" label="Clips">
		{#each clips as clip (clip.title)}
			<CarouselItem type="button" label={clip.title} image={clip.image} aspectRatio={clip.ratio} />
		{/each}
	</Carousel>
</figure>

<figure class="shelf">
	<figcaption><code>hero</code></figcaption>
	<Carousel variant="hero" label="Paintings, hero">{@render run()}</Carousel>
</figure>

<figure class="viewport">
	<figcaption><code>full-screen</code></figcaption>
	<Carousel variant="full-screen" label="Paintings, full screen">
		{#each images as image, index (image + index)}
			<CarouselItem type="button" label={`Plate ${index + 1}`} {image} />
		{/each}
	</Carousel>
</figure>

<style>
	.shelf,
	.viewport {
		inline-size: 36rem;
		max-inline-size: 100%;
		margin: 0 0 1.5rem;
		--np-carousel-item-height: 10rem;
	}

	.aspect {
		--np-carousel-item-height: 12rem;
	}

	.viewport {
		inline-size: 18rem;
		--np-carousel-length: 24rem;
	}

	figcaption {
		margin-block-end: 0.5rem;
	}
</style>
