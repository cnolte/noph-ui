<script lang="ts">
	import { setContext } from 'svelte'
	import type { ChipSetContext, ChipSetProps } from './types.ts'

	let { children, ...attributes }: ChipSetProps = $props()
	let chipSet: ChipSetContext = $state({
		chips: [],
	})
	setContext('chipSet', chipSet)
</script>

{#if children}
	<div
		class={['np-chip-set', chipSet.chips.length > 0 && 'np-chip-set-has-chips', attributes.class]}
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
