<script lang="ts">
	import Carousel from './Carousel.svelte'
	import CarouselItem from './CarouselItem.svelte'
</script>

<div class="frame">
	<Carousel label="Themed">
		<CarouselItem type="button" label="Bare" data-testid="bare" />
		<CarouselItem
			type="button"
			label="Themed"
			data-testid="themed"
			--np-carousel-item-container-shape="0.25rem"
			--np-carousel-item-container-color="rgb(1, 2, 3)"
			--np-carousel-item-outline-width="1px"
			--np-carousel-item-label-text-color="rgb(4, 5, 6)"
		/>
	</Carousel>
</div>

<style>
	.frame {
		inline-size: 40rem;
		--np-carousel-item-height: 8rem;
	}
</style>
