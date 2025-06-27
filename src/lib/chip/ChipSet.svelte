<script lang="ts">
	import type { ChipSetProps } from './types.ts'

	let { children, chipsCount, ...attributes }: ChipSetProps = $props()
</script>

{#if children}
	<div
		class={['np-chip-set', (chipsCount ?? 0) > 0 && 'np-chip-set-has-chips', attributes.class]}
		style={attributes.style}
		role="toolbar"
	>
		{@render children()}
	</div>
{/if}

<style>
	.np-chip-set-has-chips {
		margin-right: 0.5rem;
		padding-block: 2px;
		padding-right: 2px;
	}
	.np-chip-set {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		overflow: auto;
		align-items: center;
		min-width: 0;
	}
</style>
