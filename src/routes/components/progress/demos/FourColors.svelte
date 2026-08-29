<script lang="ts">
	import { CircularProgress, LinearProgress } from '#lib/index.js'
</script>

<CircularProgress aria-label="Loading, four colors" fourColor indeterminate />
<CircularProgress aria-label="Loading, four colors, wavy" fourColor wavy indeterminate />
<div class="stack">
	<LinearProgress aria-label="Loading, four colors" fourColor indeterminate />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
</style>
