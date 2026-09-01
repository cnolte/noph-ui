<script lang="ts">
	import { Button, Carousel, CarouselItem, IconButton } from '#lib/index.js'
	import { ChevronRightIcon } from '#lib/icons/index.js'

	const images = ['/pollock.avif', '/pollock2.avif', '/pollock3.avif']
	const plates = Array.from({ length: 6 }, (_, index) => index)
</script>

<section class="shelf">
	<div class="header">
		<h3 id="show-all-demo-heading">Recent paintings</h3>
		<IconButton aria-label="Show all recent paintings" href="#show-all">
			<ChevronRightIcon />
		</IconButton>
	</div>

	<Carousel aria-labelledby="show-all-demo-heading">
		{#each plates as index (index)}
			<CarouselItem
				type="button"
				label={`Plate ${index + 1}`}
				image={images[index % images.length]}
			/>
		{/each}
	</Carousel>

	<div class="below">
		<Button variant="text" href="#show-all">Show all</Button>
	</div>
</section>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 10rem;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 1rem;
	}
	.header h3 {
		margin: 0;
	}
	.below {
		/* The spec puts 4dp of padding around the Show all button. */
		padding: 0.25rem;
	}
</style>
