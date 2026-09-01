<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'

	let clicked = $state<string>()
</script>

<div class="shelf">
	<Carousel label="Item types">
		<CarouselItem
			type="button"
			label="Button"
			image="/pollock.avif"
			onclick={() => (clicked = 'Button')}
		/>
		<CarouselItem type="link" label="Link" image="/pollock2.avif" href="#interactive-items" />
		<CarouselItem type="text" label="Not interactive" image="/pollock3.avif" />
		<CarouselItem type="button" label="Disabled" image="/pollock.avif" disabled />
	</Carousel>
</div>

<p>Clicked: <code>{clicked ?? 'nothing yet'}</code></p>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 10rem;
	}
</style>
