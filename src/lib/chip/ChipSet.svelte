<script lang="ts">
	import type { ChipSetProps } from './types.ts'

	let { children, ...attributes }: ChipSetProps = $props()
</script>

{#if children}
	<div class={['np-chip-set', attributes.class]} role="toolbar">
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
