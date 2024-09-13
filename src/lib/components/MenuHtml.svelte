<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface MenuProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
		element?: HTMLElement
	}

	let { children, element = $bindable(), ...attributes }: MenuProps = $props()
</script>

<div {...attributes} popover="auto" bind:this={element}>
	<ul>
		{@render children()}
	</ul>
</div>

<style>
	div {
		display: flex;
	}
	ul {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	[popover] {
		inset: auto;
		border-radius: 1rem;
		inset-area: bottom;
		padding: 3px;
		justify-self: anchor-center;
		margin-top: 3px;
		margin-bottom: 3px;
		position-try-options: --menu-pos;
		background-color: var(--np-paper-background-color);
		box-shadow:
			0 0px 10px -3px rgb(0 0 0 / 0.2),
			0 4px 6px -4px rgb(0 0 0 / 0.3);
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: scaleY(0%);
		transform-origin: 0% 0%;
	}
	:popover-open {
		transform: scaleY(100%);
	}
	@position-try --menu-pos {
		inset-area: top;
		transform-origin: 0% 100%;
	}
</style>
