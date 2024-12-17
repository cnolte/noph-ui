<script lang="ts">
	import type { DividerProps } from './types.ts'

	let { variant = 'full', ...attributes }: DividerProps = $props()
</script>

<template
	class:full={variant === 'full'}
	class:inset={variant === 'inset'}
	class:inset-middle={variant === 'inset-middle'}
	role="separator"
	{...attributes}
	class="divider {attributes.class}"
></template>

<style>
	.inset {
		width: calc(100% - 1rem);
		margin-left: 1rem;
	}
	.inset-middle {
		width: calc(100% - 2rem);
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.full {
		width: 100%;
	}
	.divider {
		height: 1px;
		display: flex;
		background-color: var(--np-divider-color, var(--np-color-outline-variant));
	}
</style>
