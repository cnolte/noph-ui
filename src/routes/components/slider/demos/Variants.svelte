<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack">
	<Slider value={40} aria-label="Standard" />
	<Slider centered value={20} aria-label="Centered" />
	<Slider
		range
		value={30}
		endValue={70}
		aria-label="Minimum price"
		endInputAttributes={{ 'aria-label': 'Maximum price' }}
	/>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
</style>
