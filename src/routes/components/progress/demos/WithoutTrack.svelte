<script lang="ts">
	import { CircularProgress, LinearProgress } from '#lib/index.js'
</script>

<CircularProgress aria-label="Loading, no track" indeterminate track={false} />
<div class="stack">
	<LinearProgress aria-label="Loading, no track" indeterminate track={false} />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
</style>
