<script lang="ts">
	import type { DividerProps } from './types.ts'

	let { variant = 'full', ...attributes }: DividerProps = $props()
</script>

<template {...attributes} role="separator" class={['np-divider', variant, attributes.class]}
></template>

<style>
	.inset {
		width: calc(100% - 1rem);
		margin-inline-start: 1rem;
	}
	.inset-middle {
		width: calc(100% - 2rem);
		margin-inline: 1rem;
	}
	.full {
		width: 100%;
	}
	.np-divider {
		height: 1px;
		display: flex;
		background-color: var(--np-divider-color, var(--np-color-outline-variant));
	}
</style>
