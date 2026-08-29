<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack">
	<Slider
		--np-slider-active-track-color="var(--np-color-error)"
		--np-slider-inactive-track-color="var(--np-color-error-container)"
		--np-slider-handle-color="var(--np-color-error)"
		--np-slider-track-shape="0.25rem"
		value={40}
		aria-label="Slider custom"
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
