<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack">
	<Slider step={25} ticks value={50} min={0} max={100} aria-label="Rating" />
	<Slider step={10} ticks size="m" value={40} aria-label="Volume in tens" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
</style>
