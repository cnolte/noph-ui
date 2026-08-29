<script lang="ts">
	import { LinearProgress } from '#lib/index.js'
</script>

<div class="stack">
	<LinearProgress
		--np-linear-progress-active-indicator-color="var(--np-color-error)"
		--np-linear-progress-track-color="var(--np-color-error-container)"
		--np-linear-progress-track-shape="0.5rem"
		--np-linear-progress-track-height="0.5rem"
		--np-linear-progress-active-indicator-height="0.5rem"
		aria-label="Linear progress custom"
		indeterminate
	/>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
</style>
