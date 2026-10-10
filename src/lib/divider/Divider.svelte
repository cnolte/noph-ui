<script lang="ts">
	import type { DividerProps } from './types.js'

	let {
		variant = 'full',
		orientation = 'horizontal',
		element = $bindable(),
		...attributes
	}: DividerProps = $props()
</script>

<template
	{...attributes}
	bind:this={element}
	role="separator"
	aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
	class={[
		'np-divider',
		variant,
		orientation === 'vertical' && 'np-divider-vertical',
		attributes.class,
	]}
></template>

<style>
	.np-divider {
		display: flex;
		flex-shrink: 0;
		background-color: var(--np-divider-color, var(--np-color-outline-variant));
	}
	.np-divider:not(.np-divider-vertical) {
		height: 1px;
	}
	.np-divider:not(.np-divider-vertical).full {
		width: 100%;
	}
	.np-divider:not(.np-divider-vertical).inset {
		width: calc(100% - 1rem);
		margin-inline-start: 1rem;
	}
	.np-divider:not(.np-divider-vertical).inset-middle {
		width: calc(100% - 2rem);
		margin-inline: 1rem;
	}

	/* Takes the height of a flex or grid row. */
	.np-divider-vertical {
		width: 1px;
		align-self: stretch;
	}
	.np-divider-vertical.inset {
		margin-block-start: 1rem;
	}
	.np-divider-vertical.inset-middle {
		margin-block: 1rem;
	}
</style>
