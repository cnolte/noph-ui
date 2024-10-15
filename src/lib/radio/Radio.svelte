<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	let { ...attributes }: HTMLInputAttributes = $props()

	const maskId = '1'
</script>

<div class="host">
	<div class="container" aria-hidden="true">
		{#if !attributes.disabled}
			<Ripple />
		{/if}
		<svg class="icon" viewBox="0 0 20 20">
			<mask id={maskId}>
				<rect width="100%" height="100%" fill="white" />
				<circle cx="10" cy="10" r="8" fill="black" />
			</mask>
			<circle class="outer circle" cx="10" cy="10" r="10" mask="url(#{maskId})" />
			<circle class="inner circle" cx="10" cy="10" r="5" />
		</svg>
		<div class="touch-target"></div>
	</div>
</div>

<style>
</style>
