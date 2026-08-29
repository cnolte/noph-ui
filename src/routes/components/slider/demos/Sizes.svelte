<script lang="ts">
	import { Slider } from '#lib/index.js'

	const sizes: ('xs' | 's' | 'm' | 'l' | 'xl')[] = ['xs', 's', 'm', 'l', 'xl']
</script>

<div class="stack wide">
	{#each sizes as size (size)}
		<Slider {size} value={50} aria-label="Size {size}" />
	{/each}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
	.wide {
		gap: 2.5rem;
	}
</style>
