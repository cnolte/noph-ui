<script lang="ts">
	import { CircularProgress } from '#lib/index.js'
</script>

<CircularProgress
	--np-circular-progress-color="var(--np-color-error)"
	--np-circular-progress-track-color="var(--np-color-error-container)"
	--np-circular-progress-active-indicator-width="20"
	--np-circular-progress-size="5rem"
	aria-label="Circular progress custom"
	indeterminate
/>
