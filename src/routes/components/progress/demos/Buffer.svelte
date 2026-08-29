<script lang="ts">
	import { LinearProgress, Slider } from '#lib/index.js'

	let buffered = $state(0.85)
</script>

<div class="controls">
	<Slider
		labeled
		min={0}
		max={1}
		step={0.01}
		format={(v) => `${Math.round(v * 100)}%`}
		bind:value={buffered}
		aria-label="Buffer amount"
	/>
	<div class="stack">
		<LinearProgress aria-label="Playback progress" value={0.4} buffer={buffered} />
	</div>
</div>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		min-width: min(22rem, 70vw);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
</style>
