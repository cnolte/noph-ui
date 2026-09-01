<script lang="ts">
	import Carousel from './Carousel.svelte'
	import CarouselItem from './CarouselItem.svelte'

	let { plain = false }: { plain?: boolean } = $props()
</script>

<div class="frame">
	<Carousel label="Places">
		<CarouselItem type={plain ? 'text' : 'button'} label="Sunset" />
		<CarouselItem type="button" label="Harbour" aria-label="A harbour at dawn" />
		<CarouselItem type="button" />
	</Carousel>
</div>

<style>
	.frame {
		inline-size: 40rem;
		--np-carousel-item-height: 8rem;
	}
</style>
