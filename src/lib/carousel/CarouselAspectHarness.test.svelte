<script lang="ts">
	import Carousel from './Carousel.svelte'
	import CarouselItem from './CarouselItem.svelte'

	const ratios = [16 / 9, 1, 9 / 16]
</script>

<div class="frame">
	<Carousel variant="uncontained" label="Clips">
		{#each ratios as ratio, index (index)}
			<CarouselItem type="button" label={`Clip ${index + 1}`} aspectRatio={ratio} />
		{/each}
	</Carousel>
</div>

<style>
	.frame {
		inline-size: 40rem;
		--np-carousel-item-height: 8rem;
	}
</style>
