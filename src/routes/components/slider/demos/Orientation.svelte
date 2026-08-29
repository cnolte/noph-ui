<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="row">
	<Slider orientation="vertical" value={60} aria-label="Brightness" />
	<Slider orientation="vertical" size="m" value={60} aria-label="Brightness" />
	<Slider
		orientation="vertical"
		size="l"
		--np-slider-length="9rem"
		value={60}
		aria-label="Brightness"
	/>
</div>

<style>
	.row {
		display: flex;
		align-items: flex-end;
		gap: 2.5rem;
	}
</style>
