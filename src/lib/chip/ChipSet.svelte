<script lang="ts">
	import type { ChipSetProps } from './types.ts'

	let { children, chipsCount, ...attributes }: ChipSetProps = $props()
</script>

<div
	class={[
		'np-chip-set-wrapper',
		(chipsCount ?? 0) > 0 && 'np-chip-set-has-chips',
		attributes.class,
	]}
	style={attributes.style}
>
	{#if children}
		<div class={['np-chip-set']} role="toolbar">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.np-chip-set-wrapper {
		overflow: auto;
		padding: 0.5rem;
		margin: -0.5rem;
	}
	.np-chip-set-has-chips {
		margin-right: 0;
	}
	.np-chip-set {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		min-width: 0;
	}
</style>
