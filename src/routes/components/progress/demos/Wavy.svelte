<script lang="ts">
	import { CircularProgress, LinearProgress } from '#lib/index.js'
</script>

<div class="controls">
	<div class="stack">
		<LinearProgress aria-label="Uploading, wavy" wavy value={0.6} />
		<LinearProgress aria-label="Loading, wavy" wavy indeterminate />
	</div>
	<div class="row">
		<CircularProgress aria-label="Uploading, wavy" wavy value={0.6} />
		<CircularProgress aria-label="Loading, wavy" wavy indeterminate />
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
