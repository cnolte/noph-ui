<script lang="ts">
	import { LinearProgress } from '#lib/index.js'
</script>

<div class="controls" dir="rtl">
	<div class="stack">
		<LinearProgress aria-label="Download progress, right to left" value={0.6} />
		<LinearProgress aria-label="Loading, right to left" wavy indeterminate />
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
