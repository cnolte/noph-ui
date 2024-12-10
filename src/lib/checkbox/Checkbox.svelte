<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'

	let { ...attributes } = $props()
</script>

<div class="container {attributes.class}">
	<input class="input" type="checkbox" />

	<div class="outline"></div>
	<div class="background"></div>
	{#if !attributes.disabled}
		<Ripple />
	{/if}
	<svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
		<rect class="mark short" />
		<rect class="mark long" />
	</svg>
</div>

<style>
	.container {
		position: relative;
	}
	.input {
		padding: 20px;
	}
</style>
