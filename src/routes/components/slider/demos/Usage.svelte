<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack">
	<Slider value={40} aria-label="Volume" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
</style>
