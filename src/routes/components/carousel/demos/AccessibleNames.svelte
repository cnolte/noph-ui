<script lang="ts">
	import { Carousel, CarouselItem } from '#lib/index.js'

	const plates = ['Konvergenz', 'Blaue Pfähle', 'Herbstrhythmus']
	let name = $state<string>()
</script>

<div class="shelf">
	<Carousel
		label="Gemälde"
		itemLabel={(text, position, total) => `${text}, Bild ${position} von ${total}`}
	>
		{#each plates as plate, index (plate)}
			<CarouselItem
				type="button"
				label={plate}
				image={`/pollock${index === 0 ? '' : index + 1}.avif`}
				onfocus={(event) => (name = event.currentTarget.getAttribute('aria-label') ?? undefined)}
			/>
		{/each}
	</Carousel>
</div>

<p>Focused name: <code>{name ?? 'nothing focused'}</code></p>

<style>
	.shelf {
		inline-size: 36rem;
		max-inline-size: 100%;
		--np-carousel-item-height: 10rem;
	}
</style>
