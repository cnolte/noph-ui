<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack with-label">
	<Slider labeled step={1} value={40} aria-label="Volume" />
	<Slider labeled size="m" value={60} format={(v) => `${Math.round(v)}%`} aria-label="Brightness" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
	.with-label {
		gap: 3rem;
	}
</style>
