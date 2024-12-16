<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	interface DemoContainerProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
	}
	let { children, ...attributes }: DemoContainerProps = $props()
</script>

<div {...attributes} class="demo-container">
	<figure>
		{@render children()}
	</figure>
</div>

<style>
	.demo-container {
		margin-left: auto;
		margin-right: auto;
		padding: 1.75rem 0;
		width: fit-content;
		align-items: center;
	}
	figure {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		border-radius: var(--np-shape-corner-large);
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-color-outline);
		padding: 1rem;
	}
</style>
