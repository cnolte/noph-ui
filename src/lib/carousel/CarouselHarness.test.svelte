<script lang="ts">
	import Carousel from './Carousel.svelte'
	import CarouselItem from './CarouselItem.svelte'
	import type { CarouselItemProps, CarouselProps } from './types.ts'

	let {
		variant = 'multi-browse',
		alignment,
		orientation,
		snap,
		count = 5,
		type = 'button',
		disabledIndex = -1,
		image,
		itemLabel,
		label = 'Featured photos',
		role,
		onkeydown,
	}: {
		variant?: CarouselProps['variant']
		alignment?: CarouselProps['alignment']
		orientation?: CarouselProps['orientation']
		snap?: boolean
		count?: number
		type?: CarouselItemProps['type']
		disabledIndex?: number
		image?: string
		itemLabel?: CarouselProps['itemLabel']
		label?: string
		role?: CarouselProps['role']
		onkeydown?: CarouselProps['onkeydown']
	} = $props()

	const names = ['Sunset', 'Harbour', 'Market', 'Bridge', 'Garden', 'Rooftop']
	const indexes = $derived(Array.from({ length: count }, (_, index) => index))
</script>

<div class="frame">
	<Carousel {variant} {alignment} {orientation} {snap} {label} {itemLabel} {role} {onkeydown}>
		{#each indexes as index (index)}
			<CarouselItem
				{type}
				label={names[index % names.length]}
				{image}
				disabled={index === disabledIndex}
				href={type === 'link' ? '#target' : undefined}
			/>
		{/each}
	</Carousel>
</div>

<style>
	.frame {
		inline-size: 40rem;
		--np-carousel-item-height: 8rem;
		--np-carousel-length: 12rem;
	}
</style>
