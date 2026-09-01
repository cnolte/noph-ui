<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'

	const images = ['/pollock.avif', '/pollock2.avif', '/pollock3.avif', '/pollock.avif']
</script>

<div class="shelf">
	<Carousel label="Themed paintings" --np-carousel-padding="1.5rem">
		{#each images as image, index (image + index)}
			<CarouselItem
				type="button"
				label={`Plate ${index + 1}`}
				{image}
				--np-carousel-item-container-shape="var(--np-shape-corner-medium)"
				--np-carousel-item-outline-width="1px"
				--np-carousel-item-outline-color="var(--np-color-outline-variant)"
				--np-carousel-item-label-scrim-color="color-mix(in srgb, var(--np-color-primary) 70%, transparent)"
			/>
		{/each}
	</Carousel>
</div>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 10rem;
	}
</style>
