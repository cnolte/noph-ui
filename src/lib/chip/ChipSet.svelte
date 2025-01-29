<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children?: Snippet } = $props()
</script>

{#if children}
	<div class="np-chip-set" role="toolbar">
		{@render children()}
	</div>
{/if}

<style>
	.np-chip-set {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
