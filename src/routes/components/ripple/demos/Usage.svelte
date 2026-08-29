<script lang="ts">
	import { Ripple } from '#lib/index.js'
</script>

<div class="ripple-container">
	<Ripple />
</div>

<style>
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
