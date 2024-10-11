<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	interface DemoContainerProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
	}
	let { children, ...attributes }: DemoContainerProps = $props()
</script>

<div {...attributes} class="demo-container">
	{@render children()}
</div>

<style>
	.demo-container {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 2rem;
		display: flex;
		width: fit-content;
		flex-wrap: wrap;
		gap: 1rem;
		border-radius: var(--np-shape-corner-large);
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-color-outline);
		padding: 1rem;
		align-items: center;
	}
</style>
