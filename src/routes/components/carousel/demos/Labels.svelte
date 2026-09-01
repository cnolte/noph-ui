<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'
</script>

<div class="shelf">
	<Carousel label="Label styles">
		<CarouselItem type="button" label="A plain label" image="/pollock.avif" />
		<CarouselItem type="button" label="With an overlay" image="/pollock2.avif">
			<span class="badge">New</span>
		</CarouselItem>
		<CarouselItem type="button" aria-label="No visible label" image="/pollock3.avif" />
	</Carousel>
</div>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 10rem;
	}
	.badge {
		position: absolute;
		inset-block-start: 0.75rem;
		inset-inline-start: 0.75rem;
		padding: 0.125rem 0.5rem;
		border-radius: var(--np-shape-corner-full);
		background-color: var(--np-color-primary);
		color: var(--np-color-on-primary);
		font-size: 0.75rem;
	}
</style>
