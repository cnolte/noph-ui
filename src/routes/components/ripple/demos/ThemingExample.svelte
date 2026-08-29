<script lang="ts">
	import { Ripple } from '#lib/index.js'
</script>

<div class="ripple-container theming-example">
	<Ripple />
</div>

<style>
	.theming-example {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
	}
	.ripple-container {
		position: relative;
		overflow: hidden;
		height: 2.5rem;
		width: 7rem;
		border-width: 1px;
		border-radius: 0.25rem;
		border-style: solid;
		border-color: currentColor;
	}
</style>
