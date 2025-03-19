<script lang="ts">
	import type { ListProps } from './types.ts'

	let { element = $bindable(), children, ...attributes }: ListProps = $props()
</script>

<ul bind:this={element} {...attributes}>
	{#if children}
		{@render children()}
	{/if}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>
