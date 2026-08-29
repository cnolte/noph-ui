<script lang="ts">
	import { CircularProgress, LinearProgress, Slider } from '#lib/index.js'

	let value = $state(0.6)
</script>

<div class="controls">
	<Slider
		min={0}
		max={1}
		labeled
		step={0.01}
		bind:value
		aria-label="Progress value"
		format={(v) => `${Math.round(v * 100)}%`}
	/>
	<div class="stack">
		<LinearProgress aria-label="Download progress" {value} />
		<LinearProgress aria-label="Download progress, wavy" wavy {value} />
	</div>
	<div class="row">
		<CircularProgress aria-label="Download progress" {value} />
		<CircularProgress aria-label="Download progress, wavy" wavy {value} />
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
	.row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
</style>
