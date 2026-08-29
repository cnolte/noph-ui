<script lang="ts">
	import { Slider } from '#lib/index.js'
</script>

<div class="stack" dir="rtl">
	<Slider value={60} aria-label="Volume, right to left" />
	<Slider range value={30} endValue={70} aria-label="Price, right to left" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
</style>
