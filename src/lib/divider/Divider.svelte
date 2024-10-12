<script lang="ts">
	let { ...attributes } = $props()
</script>

<template class="divider {attributes.class}"></template>

<style>
	.divider {
		height: 1px;
		width: 100%;
		display: flex;
		background-color: var(--np-color-outline-variant);
	}
</style>
