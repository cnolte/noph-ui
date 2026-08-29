<script lang="ts">
	import { CircularProgress, LinearProgress } from '#lib/index.js'
</script>

<div class="controls">
	<div class="stack">
		<LinearProgress aria-label="Loading" indeterminate />
	</div>
	<CircularProgress aria-label="Loading" indeterminate />
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
